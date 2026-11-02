import dns from 'node:dns'
import mongoose from 'mongoose'

// Shared by the app (via ./mongoose.ts, which adds the server-only guard) and Node scripts such as the seed.

type SrvRecord = { name: string; port: number }

// Some local DNS services (VPNs, ad blockers) refuse the SRV lookup that mongodb+srv:// needs.
// MONGODB_DNS_SERVERS (local .env only) names public resolvers to do that lookup instead. It uses a private resolver
// rather than dns.setServers(), which changes process-wide state and proved unreliable under `next dev`.
function dnsOverride(): string[] | undefined {
  const servers = process.env.MONGODB_DNS_SERVERS?.split(',').map((s) => s.trim()).filter(Boolean)
  return servers?.length ? servers : undefined
}

/** Turns a mongodb+srv:// URI plus its SRV and TXT records into the equivalent standard mongodb:// URI. */
export function toSeedlistUri(srvUri: string, records: SrvRecord[], txt: string[][]): string {
  const url = new URL(srvUri)
  if (url.protocol !== 'mongodb+srv:') throw new Error('Expected a mongodb+srv:// URI')

  // Same safety rule as the driver: every host must sit under the SRV name's parent domain.
  const parent = url.hostname.split('.').slice(1).join('.')
  if (!records.length) throw new Error('No SRV records found for the database host')
  if (records.some((r) => !r.name.endsWith(`.${parent}`))) throw new Error('SRV record outside the database domain')

  // TXT records hold defaults (authSource, replicaSet); options written in the URI win. SRV implies TLS.
  const params = new URLSearchParams(txt.map((chunks) => chunks.join('')).join('&'))
  for (const [key, value] of url.searchParams) params.set(key, value)
  if (!params.has('tls') && !params.has('ssl')) params.set('tls', 'true')

  const auth = url.username ? `${url.username}${url.password ? `:${url.password}` : ''}@` : ''
  const hosts = records.map((r) => `${r.name}:${r.port}`).join(',')
  return `mongodb://${auth}${hosts}${url.pathname}?${params}`
}

async function resolveSrvUri(uri: string, servers: string[]): Promise<string> {
  const resolver = new dns.promises.Resolver()
  resolver.setServers(servers)
  const host = new URL(uri).hostname
  const [records, txt] = await Promise.all([
    resolver.resolveSrv(`_mongodb._tcp.${host}`),
    resolver.resolveTxt(host).catch(() => [] as string[][]),
  ])
  return toSeedlistUri(uri, records, txt)
}

export async function openConnection(uri: string): Promise<typeof mongoose> {
  const servers = dnsOverride()
  const target = servers && uri.startsWith('mongodb+srv://') ? await resolveSrvUri(uri, servers) : uri
  return mongoose.connect(target, { serverSelectionTimeoutMS: 8000 })
}

import dns from 'node:dns'
import mongoose from 'mongoose'

// Shared by the app (via ./mongoose.ts, which adds the server-only guard) and Node scripts such as the seed.

// Some local DNS services (VPNs, ad blockers) refuse the SRV lookup that mongodb+srv:// needs.
// MONGODB_DNS_SERVERS (local .env only) points the driver's lookups at public resolvers instead.
function applyDnsOverride() {
  const servers = process.env.MONGODB_DNS_SERVERS?.split(',').map((s) => s.trim()).filter(Boolean)
  if (servers?.length) dns.setServers(servers)
}

export function openConnection(uri: string): Promise<typeof mongoose> {
  applyDnsOverride()
  return mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
}

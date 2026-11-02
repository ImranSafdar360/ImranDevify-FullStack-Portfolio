import { describe, expect, it } from 'vitest'
import { toSeedlistUri } from '@/lib/db/connect'

const records = [
  { name: 'ac-1-shard-00-00.abc12.mongodb.net', port: 27017 },
  { name: 'ac-1-shard-00-01.abc12.mongodb.net', port: 27017 },
]
const txt = [['authSource=admin&replicaSet=atlas-xyz-shard-0']]

describe('toSeedlistUri', () => {
  it('expands an SRV URI into hosts, keeps credentials and database, and adds TXT options plus TLS', () => {
    const uri = toSeedlistUri('mongodb+srv://user:p%40ss@cluster0.abc12.mongodb.net/portfolio?retryWrites=true', records, txt)
    expect(uri).toBe(
      'mongodb://user:p%40ss@ac-1-shard-00-00.abc12.mongodb.net:27017,ac-1-shard-00-01.abc12.mongodb.net:27017/portfolio' +
        '?authSource=admin&replicaSet=atlas-xyz-shard-0&retryWrites=true&tls=true',
    )
  })

  it('lets options in the URI override the TXT defaults', () => {
    const uri = toSeedlistUri('mongodb+srv://cluster0.abc12.mongodb.net/?authSource=other&tls=false', records, txt)
    // Multi-host URIs are not WHATWG URLs, so read the query string directly.
    const params = new URLSearchParams(uri.split('?')[1])
    expect(params.get('authSource')).toBe('other')
    expect(params.get('tls')).toBe('false')
  })

  it('rejects SRV records that point outside the database domain', () => {
    expect(() =>
      toSeedlistUri('mongodb+srv://cluster0.abc12.mongodb.net/', [{ name: 'evil.example.com', port: 27017 }], []),
    ).toThrow('outside the database domain')
  })

  it('rejects an empty SRV answer and non-SRV URIs', () => {
    expect(() => toSeedlistUri('mongodb+srv://cluster0.abc12.mongodb.net/', [], [])).toThrow('No SRV records')
    expect(() => toSeedlistUri('mongodb://localhost:27017/x', records, [])).toThrow('mongodb+srv')
  })
})

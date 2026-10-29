// Usage: npm run seed   (reads MONGODB_URI from .env.local)
import mongoose from 'mongoose'
import { openConnection } from '@/lib/db/connect'
import { seedContent } from './seed-content'

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set. Add it to .env.local.')

  await openConnection(uri)
  const result = await seedContent()
  console.log(`Seeded ${result.settings} settings document and ${result.projects} projects into "${mongoose.connection.name}".`)
}

main()
  .catch((error: unknown) => {
    // Print the message only: connection errors can include the URI.
    console.error('Seed failed:', error instanceof Error ? error.name : 'Error', error instanceof Error && 'issues' in error ? error.message : '')
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())

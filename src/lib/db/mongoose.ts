import 'server-only'
import type mongoose from 'mongoose'
import { openConnection } from './connect'

// One connection per server instance, reused across requests and hot reloads.
const globalForMongoose = globalThis as unknown as { mongooseConnection?: Promise<typeof mongoose> }

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI)
}

export function connectDb(uri = process.env.MONGODB_URI): Promise<typeof mongoose> {
  if (!uri) throw new Error('MONGODB_URI is not set. Add it to .env.local (never commit it).')
  globalForMongoose.mongooseConnection ??= openConnection(uri).catch((error) => {
    globalForMongoose.mongooseConnection = undefined // allow a retry on the next call
    throw error
  })
  return globalForMongoose.mongooseConnection
}

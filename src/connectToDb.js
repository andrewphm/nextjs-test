import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export default async function connectToDB() {
  if (mongoose.connection.readyState === 1) {
    console.log('Already connected')
    console.log('Connection: ', mongoose.connection.readyState)
  } else {
    try {
      console.log('Not connected to db.. attempting to connect to db')
      let db = await mongoose.connect(MONGODB_URI)
      console.log('Successfully connect to db!')
      console.log('Caching connection')
      cached.conn = db
    } catch (error) {
      console.log('Failed to connect to db.. trying again')
      let db = await mongoose.connect(MONGODB_URI)

      console.log(error)
    }
  }
}

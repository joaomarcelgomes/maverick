import 'dotenv/config'

import { MongoClient } from 'mongodb'

import crypto from 'crypto'

const client = new MongoClient(process.env.MONGO_URL)

const database = 'database'

export async function connection() {
  await client.connect()
  const con = client.db(database)

  return con
}

export function close() {
  return client.close()
}

export async function autoMapping() {
  const context = await connection()

  const hash = crypto.createHash('sha256')
  hash.update('12345678')
  const password = hash.digest('hex')

  const admin = {
    email: 'admin@domain.com',
    password,
    role: 'admin',
  }

  const user = await context.collection('user').findOne(admin)

  if (user == null) {
    await context.collection('user').insertOne(admin)
  }
}

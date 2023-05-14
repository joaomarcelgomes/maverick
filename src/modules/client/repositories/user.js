import { connection } from '../../../core/database/context'

export async function checkUser(email, password, role) {
  const context = await connection()

  const query = { email, password, role }

  const exists = await context.collection('user').countDocuments(query)

  return exists > 0
}

export async function create(name, date, genrer, phone, email, password, role) {
  const context = await connection()

  const query = { name, date, genrer, phone, email, password, role }

  await context.collection('user').insertOne(query)
}

export async function findUserByEmail(email) {
  const context = await connection()

  const query = { email }

  const user = await context.collection('user').findOne(query)

  return user
}

export async function changePassword(email, newPassword) {
  const context = await connection()

  const query = { email }

  const obj = { $set: { password: newPassword } }

  await context.collection('user').updateOne(query, obj)
}

export async function editAccount(name, date, genrer, phone, email) {
  const context = await connection()

  const query = { email }

  const obj = { $set: { name, date, genrer, phone } }

  await context.collection('user').updateOne(query, obj)
}

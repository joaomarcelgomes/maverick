import { connection } from '../../../core/database/context'

export async function checkUser(email, password, role) {
  const context = await connection()

  const query = { email, password, role }

  const exists = await context.collection('user').countDocuments(query)

  return exists > 0
}

export async function register(
  name,
  date,
  genrer,
  phone,
  email,
  password,
  role
) {
  const context = await connection()

  const query = { name, date, genrer, phone, email, password, role }

  const exists = await context.collection('user').countDocuments(query)
}

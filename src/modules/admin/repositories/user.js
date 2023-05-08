import { connection } from '../../../core/database/context'

export default async function checkUser(email, password, role) {
  const context = await connection()

  const query = { email, password, role }

  const exists = await context.collection('user').countDocuments(query)

  return exists > 0
}

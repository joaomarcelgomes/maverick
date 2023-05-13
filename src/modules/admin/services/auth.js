import crypto from 'crypto'

import { checkUser, register } from '../repositories/user'

export default async function auth(email, password, role) {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  const passwordHash = hash.digest('hex')

  return checkUser(email, passwordHash, role)
}

export async function createUser(
  name,
  date,
  genrer,
  phone,
  email,
  password,
  role
) {
  await register(name, date, genrer, phone, email, password, role)
}

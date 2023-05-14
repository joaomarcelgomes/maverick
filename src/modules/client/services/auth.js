import crypto from 'crypto'

import {
  checkUser,
  create,
  findUserByEmail,
  changePassword,
  editAccount,
} from '../repositories/user'

export async function auth(email, password, role) {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  const passwordHash = hash.digest('hex')

  return checkUser(email, passwordHash, role)
}

export async function createUser(name, date, genrer, phone, email, password) {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  const passwordHash = hash.digest('hex')

  await create(name, date, genrer, phone, email, passwordHash, 'client')
}

function formatDate(date) {
  const parts = date.split('-')
  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

function formatDatabaseDate(date) {
  const parts = date.split('/')
  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

export async function findUser(email) {
  const user = await findUserByEmail(email)

  user.date = formatDate(user.date)

  return user
}

export async function updatePassword(email, newPassword) {
  const hash = crypto.createHash('sha256')
  hash.update(newPassword)
  const passwordHash = hash.digest('hex')

  await changePassword(email, passwordHash)
}

export async function updateUser(name, date, genrer, phone, email) {
  await editAccount(name, formatDatabaseDate(date), genrer, phone, email)
}

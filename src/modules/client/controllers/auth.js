import genericResult from '../../../shared/results/generic'
import {
  auth,
  createUser,
  findUser,
  updatePassword,
  updateUser,
} from '../services/auth'

export async function login(email, password, role) {
  try {
    const exists = await auth(email, password, role)

    if (exists) {
      return genericResult(true, 'User auth', 200)
    }

    return genericResult(false, 'User not found', 404)
  } catch (error) {
    return genericResult(false, 'Bad request', 500)
  }
}

export async function register(name, date, genrer, phone, email, password) {
  try {
    await createUser(name, date, genrer, phone, email, password)

    return genericResult(true, 'User created', 201)
  } catch (error) {
    return genericResult(false, 'Bad request', 500)
  }
}

export async function getUser(email) {
  try {
    const user = await findUser(email)

    return genericResult(true, 'User found', user)
  } catch (error) {
    return genericResult(false, 'Bad request', null)
  }
}

export async function changePassword(email, newPassword) {
  try {
    await updatePassword(email, newPassword)

    return genericResult(true, 'Password changed', 200)
  } catch (error) {
    return genericResult(false, 'Bad request', 500)
  }
}

export async function editAccount(name, date, genrer, phone, email) {
  try {
    await updateUser(name, date, genrer, phone, email)

    return genericResult(true, 'Account edited', 200)
  } catch (error) {
    return genericResult(false, 'Bad request', 500)
  }
}

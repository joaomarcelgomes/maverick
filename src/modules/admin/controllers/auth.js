import genericResult from '../../../shared/results/generic'
import auth from '../services/auth'

export default async function login(email, password, role) {
  try {
    const exists = await auth(email, password, role)

    if (exists !== '') {
      return genericResult(true, 'User auth', 200)
    }

    return genericResult(false, 'User not found', 404)
  } catch (error) {
    return genericResult(false, 'Bad request', 500)
  }
}

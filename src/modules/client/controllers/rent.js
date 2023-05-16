import genericResult from '../../../shared/results/generic'
import { rent, search } from '../services/rent'

export async function findAllCarsWithRent(email) {
  try {
    const cars = await search(email)

    return genericResult(true, 'Cars found successfully', cars)
  } catch (error) {
    return genericResult(false, error.message, [])
  }
}

export async function reserve(
  email,
  id,
  value,
  initialDate,
  finalDate,
  payment
) {
  try {
    await rent(email, id, value, initialDate, finalDate, payment)

    return genericResult(true, 'Reservation made successfully!', 200)
  } catch (error) {
    return genericResult(false, 'Error making reservation!', 500)
  }
}

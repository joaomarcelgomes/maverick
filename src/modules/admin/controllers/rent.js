import genericResult from '../../../shared/results/generic'
import { findAll, changeStatus } from '../services/rent'

export async function findAllCarsWithRent(email) {
  try {
    const cars = await findAll(email)

    return genericResult(true, 'Cars found successfully', cars)
  } catch (error) {
    return genericResult(false, error.message, [])
  }
}

export async function reserve(rentId, status) {
  try {
    await changeStatus(rentId, status)

    return genericResult(true, 'Reservation made successfully!', 200)
  } catch (err) {
    return genericResult(false, 'Error making reservation!', 500)
  }
}

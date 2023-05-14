import genericResult from '../../../shared/results/generic'
import search from '../services/store'

export default async function findAllCars() {
  try {
    const cars = await search()

    return genericResult(true, 'Cars found successfully', cars)
  } catch (error) {
    return genericResult(false, error.message, [])
  }
}

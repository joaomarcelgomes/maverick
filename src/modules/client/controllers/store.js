import genericResult from '../../../shared/results/generic'
import { search, searchCar } from '../services/store'

export async function findAllCars() {
  try {
    const cars = await search()

    return genericResult(true, 'Cars found successfully', cars)
  } catch (error) {
    return genericResult(false, error.message, [])
  }
}

export async function findCarById(id) {
  try {
    const car = await searchCar(id)

    return genericResult(true, 'Car found successfully', car)
  } catch (error) {
    return genericResult(false, error.message, [])
  }
}

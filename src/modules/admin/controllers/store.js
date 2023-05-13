import genericResult from '../../../shared/results/generic'
import {
  addCar,
  search,
  removeCar,
  findCarById,
  updateCar,
} from '../services/store'

export function createCar(imageUrl, name, value, date, dailyPrice, color) {
  try {
    addCar(imageUrl, name, value, date, dailyPrice, color)

    return genericResult(true, 'Car added successfully', 200)
  } catch (error) {
    return genericResult(false, error.message, 500)
  }
}

export async function findAllCars() {
  try {
    const cars = await search()

    return genericResult(true, 'Cars found successfully', cars)
  } catch (error) {
    return genericResult(false, error.message, [])
  }
}

export async function deleteCar(id) {
  try {
    await removeCar(id)

    return genericResult(true, 'Car removed successfully', 200)
  } catch (error) {
    return genericResult(false, error.message, 500)
  }
}

export async function findCarToEdit(id) {
  try {
    const car = await findCarById(id)

    return genericResult(true, 'Car removed successfully', car)
  } catch (error) {
    return genericResult(false, error.message, null)
  }
}

export async function putCar(
  id,
  imageUrl,
  name,
  value,
  date,
  dailyPrice,
  color
) {
  try {
    await updateCar(id, imageUrl, name, value, date, dailyPrice, color)

    return genericResult(true, 'Car edited successfully', 200)
  } catch (error) {
    return genericResult(false, error.message, 500)
  }
}

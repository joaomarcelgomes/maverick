/* eslint-disable no-param-reassign */
import { add, findAll, remove, findById, update } from '../repositories/store'

export function addCar(imageUrl, name, value, date, dailyPrice, color) {
  add(imageUrl, name, value, date, dailyPrice, color)
}

export async function removeCar(id) {
  await remove(id)
}

export async function findCarById(id) {
  const car = await findById(id)

  return car
}

export async function updateCar(
  id,
  imageUrl,
  name,
  value,
  date,
  dailyPrice,
  color
) {
  await update(id, imageUrl, name, value, date, dailyPrice, color)
}

function getDate() {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

function formatDate(date) {
  const parts = date.split('-')
  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

export async function search() {
  const cars = await findAll()

  const date = getDate()

  cars.forEach((car) => {
    if (car.date === date) {
      car.date = 'Available'
    } else if (new Date(date) < new Date(car.date)) {
      car.date = `Unavailable | Available on: ${formatDate(car.date)}`
    } else {
      car.date = `Unavailable`
    }
  })

  return cars
}

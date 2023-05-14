/* eslint-disable no-param-reassign */
import findAll from '../repositories/store'

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

export default async function search() {
  const cars = await findAll()

  const date = getDate()

  cars.forEach((car) => {
    if (car.date === date) {
      car.date = 'Available'
    } else {
      car.date = `Unavailable | Available on: ${formatDate(car.date)}`
    }
  })

  return cars
}

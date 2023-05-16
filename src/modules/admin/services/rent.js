/* eslint-disable no-underscore-dangle */
import { findAllCars, findAllRent, update } from '../repositories/rent'

function formatDate(date) {
  const parts = date.split('-')
  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

export async function findAll() {
  const rents = await findAllRent()
  const cars = await findAllCars()

  const elements = rents.map((rent) => {
    const result = cars.find(
      (car) => car._id.toString() === rent.carId.toString()
    )

    return {
      id: result._id,
      imageUrl: result.imageUrl,
      name: result.name,
      value: result.value,
      dailyPrice: result.dailyPrice,
      color: result.color,
      rent: {
        id: rent._id,
        value: rent.value,
        initialDate: formatDate(rent.initialDate),
        finalDate: formatDate(rent.finalDate),
        payment: rent.payment,
        status: rent.status,
      },
    }
  })

  return elements
}

export async function changeStatus(rentId, status) {
  console.log(rentId)

  await update(rentId, status)
}

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { ObjectId } from 'mongodb'
import { findUserByEmail } from '../repositories/user'

import { create, findAll, findAllCars } from '../repositories/rent'

export async function rent(email, id, value, initialDate, finalDate, payment) {
  const user = await findUserByEmail(email)

  const userId = user._id
  const carId = new ObjectId(id)

  await create(userId, carId, value, initialDate, finalDate, payment)
}

function formatDate(date) {
  const parts = date.split('-')
  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

export async function search(email) {
  const user = await findUserByEmail(email)

  const rents = await findAll(user._id)
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

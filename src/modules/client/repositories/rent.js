/* eslint-disable no-underscore-dangle */
import { connection } from '../../../core/database/context'

export async function findAll(userId) {
  const context = await connection()

  const query = { userId }

  const cars = await context.collection('rent').find(query).toArray()

  return cars
}

export async function create(
  userId,
  carId,
  value,
  initialDate,
  finalDate,
  payment
) {
  const context = await connection()

  const query = {
    userId,
    carId,
    value,
    initialDate,
    finalDate,
    payment,
    status: 'waiting',
  }

  await context.collection('rent').insertOne(query)
}

export async function findAllCars() {
  const context = await connection()

  const query = {}

  return context.collection('car').find(query).toArray()
}

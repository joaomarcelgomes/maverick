import { ObjectId } from 'mongodb'
import { connection } from '../../../core/database/context'

export async function findAll() {
  const context = await connection()

  const query = {}

  const cars = await context.collection('car').find(query).toArray()

  return cars
}

export async function findById(id) {
  const context = await connection()

  const query = { _id: new ObjectId(id) }

  const car = await context.collection('car').findOne(query)

  return car
}

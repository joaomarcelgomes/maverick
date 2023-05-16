/* eslint-disable no-underscore-dangle */
import { ObjectId } from 'mongodb'
import { connection } from '../../../core/database/context'

export async function findAllRent() {
  const context = await connection()

  const query = {}

  const cars = await context.collection('rent').find(query).toArray()

  return cars
}

export async function findAllCars() {
  const context = await connection()

  const query = {}

  return context.collection('car').find(query).toArray()
}

export async function update(rentId, status) {
  const context = await connection()

  const query = { _id: new ObjectId(rentId) }

  const obj = { $set: { status } }

  await context.collection('rent').updateOne(query, obj)
}

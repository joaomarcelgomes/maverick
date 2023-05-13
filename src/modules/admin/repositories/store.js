import { ObjectId } from 'mongodb'
import { connection } from '../../../core/database/context'

export async function add(imageUrl, name, value, date, dailyPrice, color) {
  const context = await connection()

  const query = { imageUrl, name, value, date, dailyPrice, color }

  await context.collection('car').insertOne(query)
}

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

export async function remove(id) {
  const context = await connection()

  const query = { _id: new ObjectId(id) }

  await context.collection('car').deleteOne(query)
}

export async function update(
  id,
  imageUrl,
  name,
  value,
  date,
  dailyPrice,
  color
) {
  const context = await connection()

  const query = { _id: new ObjectId(id) }

  const obj = {
    $set: {
      imageUrl,
      name,
      value,
      date,
      dailyPrice,
      color,
    },
  }

  await context.collection('car').updateOne(query, obj)
}

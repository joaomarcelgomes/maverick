import { connection } from '../../../core/database/context'

export default async function findAll() {
  const context = await connection()

  const query = {}

  const cars = await context.collection('car').find(query).toArray()

  return cars
}

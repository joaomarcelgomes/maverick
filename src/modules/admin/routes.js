import express from 'express'

import login from './controllers/auth'
import {
  createCar,
  findAllCars,
  deleteCar,
  findCarToEdit,
  putCar,
} from './controllers/store'

const route = express.Router()

route.get('/', (req, res) => {
  res.render('admin/signin')
})

route.post('/auth', async (req, res) => {
  const { email, password } = req.body

  const result = await login(email, password, 'admin')

  if (result.success) {
    req.session.user = email
  }

  res.status(result.data).send(result.message)
})

route.get('/store', async (req, res) => {
  const result = await findAllCars()

  res.render('admin/store', { cars: result.data })
})

route.get('/store/add-car', (req, res) => {
  res.render('admin/add-car')
})

route.get('/store/edit-car', async (req, res) => {
  const result = await findCarToEdit(req.query.id)

  console.log(req.query.id)

  res.render('admin/edit-car', { car: result.data })
})

route.post('/store/add-car', async (req, res) => {
  const { imageUrl, name, value, date, dailyPrice, color } = req.body

  const result = createCar(imageUrl, name, value, date, dailyPrice, color)

  res.status(result.data).send(result.message)
})

route.delete('/store/remove-car/:id', (req, res) => {
  deleteCar(req.params.id)

  res.status(200).send('Car removed successfully')
})

route.put('/store/edit-car', async (req, res) => {
  const { id, imageUrl, name, value, date, dailyPrice, color } = req.body

  const result = await putCar(
    id,
    imageUrl,
    name,
    value,
    date,
    dailyPrice,
    color
  )

  res.status(result.data).send(result.message)
})

export default route

import express from 'express'

import { findAllCars } from '../modules/client/controllers/store'

const route = express.Router()

route.get('/', async (req, res) => {
  const result = await findAllCars()

  res.render('index', { cars: result.data })
})

export default route

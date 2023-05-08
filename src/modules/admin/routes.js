import express from 'express'

import login from './controllers/auth'

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

route.get('/loja', (req, res) => {
  res.render('admin/store')
})

export default route

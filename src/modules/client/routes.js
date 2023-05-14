import express from 'express'

import {
  login,
  register,
  getUser,
  changePassword,
  editAccount,
} from './controllers/auth'

import findAllCars from './controllers/store'

const route = express.Router()

route.get('/signin', (req, res) => {
  res.render('client/signin')
})

route.get('/signup', (req, res) => {
  res.render('client/signup')
})

route.get('/store', async (req, res) => {
  const result = await findAllCars()

  res.render('client/store', { cars: result.data })
})

route.get('/store/my-account', async (req, res) => {
  const result = await getUser(req.session.user)

  res.render('client/my-account', { user: result.data })
})

route.get('/store/pass', (req, res) => {
  res.render('client/new-pass')
})

route.get('/store/edit-account', async (req, res) => {
  const email = req.session.user

  const user = await getUser(email)

  res.render('client/edit-account', { user: user.data })
})

route.post('/auth', async (req, res) => {
  const { email, password } = req.body

  const result = await login(email, password, 'client')

  if (result.success) {
    req.session.user = email
  }

  res.status(result.data).send(result.message)
})

route.post('/register', async (req, res) => {
  const { name, date, genrer, phone, email, password } = req.body

  console.log(req.body)

  const result = await register(name, date, genrer, phone, email, password)

  res.status(result.data).send(result.message)
})

route.put('/my-account/edit-account', async (req, res) => {
  const { name, date, genrer, phone } = req.body

  const email = req.session.user

  const result = await editAccount(name, date, genrer, phone, email)

  res.status(result.data).send(result.message)
})

route.patch('/my-account/change-password', async (req, res) => {
  const { newPassword } = req.body

  const email = req.session.user

  const result = await changePassword(email, newPassword)

  res.status(result.data).send(result.message)
})

export default route

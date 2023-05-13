import 'dotenv/config'
import express from 'express'

// eslint-disable-next-line import/no-extraneous-dependencies
import cookieSession from 'cookie-session'

import routes from './routes'
import admin from './modules/admin/routes'
import client from './modules/client/routes'
import { autoMapping } from './core/database/context'

const app = express()

app.use(
  cookieSession({
    name: 'session',
    secret: 'c293x8b6234z82n938246bc2938x4zb234',
    maxAge: 60 * 60 * 1000,
  })
)

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/public/pages`)

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.use('/admin/*', (req, res, next) => {
  if (req.session.user || req.baseUrl === '/admin/auth') {
    next()
  } else {
    res.redirect('/admin')
  }
})

app.use('/client/*', (req, res, next) => {
  if (
    req.session.user ||
    req.baseUrl === '/client/signin' ||
    req.baseUrl === '/client/signup' ||
    req.baseUrl === '/client/auth' ||
    req.baseUrl === '/client/register'
  ) {
    next()
  } else {
    res.redirect('/')
  }
})

app.use('/admin', admin)
app.use('/client', client)

autoMapping()

app.listen(process.env.PORT || 3000, () =>
  console.log(`http://localhost:${process.env.PORT}/`)
)

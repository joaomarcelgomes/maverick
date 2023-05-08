import 'dotenv/config'
import express from 'express'

import routes from './routes'

const app = express()

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/public/pages`)

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(process.env.PORT || 3000, () =>
  console.log(`http://localhost:${process.env.PORT}/`)
)

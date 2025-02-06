import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/db.js'
import { bouquetRouter, customerRouter, userRoutes } from './routes/index.js'

const app = express()
dotenv.config()
connectDB()

// app.use(
//   cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] })
// )
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => res.send('Hello World'))

app.use('/api', userRoutes)
app.use('/api/customers', customerRouter)
app.use('/api/bouquets', bouquetRouter)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server ishga tushdi, Port ${port}`.yellow.bold))

export default app

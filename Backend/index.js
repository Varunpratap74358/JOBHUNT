import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import companyRoute from './routes/companyRoute.js'
import jobRoute from './routes/jobRoute.js'
import applicationRoute from './routes/applicationRoute.js'

const app = express()
dotenv.config()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin:true,
    method: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  }),
)

//env files
const port = process.env.PORT


//routes
app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/job',jobRoute)
app.use('/api/v1/application',applicationRoute)



//db connnection
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log('DB is connected')
  })
  .catch((err) => {
    console.log(err)
  })


app.listen(port, () => {
  console.log(`port is runing on ${port}`)
})

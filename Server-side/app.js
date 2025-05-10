import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import categoryRouter from './api/routers/category.js'
import apartmentRouter from './api/routers/apartment.js'
import cityRouter from './api/routers/city.js'
import advertiserRouter from './api/routers/advertiser.js'
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())
dotenv.config()
mongoose.connect(process.env.LOCALURI)
    .then(() => {
        console.log('connect to mongoDB');
    })
    .catch(err => {
        console.error({ error: err.message })
    })

app.use(bodyParser.json())
app.use('/category', categoryRouter)
app.use('/apartment', apartmentRouter)
app.use('/city', cityRouter)
app.use('/advertiser', advertiserRouter)

app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)

})

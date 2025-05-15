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
mongoose.connect(process.env.URI)
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
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// הגדרת תיקיית build כסטטית
app.use(express.static(path.join(__dirname, 'Client-side', 'build')));

// כל בקשה אחרת מחזירה את index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client-side', 'build', 'index.html'));
});

app.listen(port, '0.0.0.0',() => {
    console.log(`my application is running on http://localhost:${port}`)

})

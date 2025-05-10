import express from 'express'

import {
    getAll,
    addCategory
} from '../controllers/category.js'

const router = express.Router()

router.get('/', getAll)

router.post('/', addCategory)

export default router

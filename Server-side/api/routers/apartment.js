import express from 'express'

import {
    getAll,
    getById,
    update,
    addApartment,
    remove,
    getByPrice,
    getAepartmentsByCity,
    getAepartmentsByCategory,
    getByBed,
    getAepartmentsByAdvertiser,
    getByConditions
} from '../controllers/apartment.js'
import { chackAuth } from '../../midelwhers.js'
import { saveImages, upload } from '../../images.js'

const router = express.Router()
router.get('/', getAll)
router.post('/ByConditions',getByConditions )

router.get('/ByBed/:condition/:beds', getByBed)

router.get('/ByAdvertiser/:id',chackAuth,getAepartmentsByAdvertiser )

router.get('/ByCity/:id',getAepartmentsByCity )

router.get('/ByCategory/:id',getAepartmentsByCategory )

router.get('/ByPrice/:thePrice/:cond', getByPrice)

router.get('/:id', getById)

router.put('/:id',upload,chackAuth, update)

router.post('/',upload,addApartment)

router.delete('/:id', chackAuth,remove)

export default router

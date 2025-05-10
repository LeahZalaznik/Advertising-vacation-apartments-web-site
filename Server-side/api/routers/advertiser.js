import express from 'express'
import {
    getById,
    Login,
    Register
    
} from '../controllers/advertiser1.js'

const router = express.Router();
router.get('/:id', getById);
router.get('/Login/:email', Login);
router.post('/', Register);
export default router;
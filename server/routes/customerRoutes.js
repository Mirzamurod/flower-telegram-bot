import express from 'express'
import { client, protect } from '../middleware/authMiddleware.js'
import customer from './../controllers/customerController.js'

const router = express.Router()

router.route('/').get(protect, client, customer.getCustomers)

export default router

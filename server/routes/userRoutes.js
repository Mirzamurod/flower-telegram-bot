import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import user from './../controllers/userController.js'

const router = express.Router()

router.delete('/users', protect, user.delete)
router.route('/client').get(protect, admin, user.getClientsByAdmin)

export default router

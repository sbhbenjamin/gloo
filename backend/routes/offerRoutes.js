import express from 'express'
const router = express.Router()
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOfferPrice,
  updateOfferStatus,
  getOffersByUserId,
} from '../controllers/offerController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getOffers).post(protect, createOffer)
router.route('/:userid').get(protect, getOffersByUserId)
router.route('/:id').get(protect, getOfferById)
router.route('/:id/price').put(protect, updateOfferPrice)
router.route('/:id/status').put(protect, updateOfferStatus)

export default router

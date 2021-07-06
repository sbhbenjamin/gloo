import express from 'express'
import {
  getMessagesByConversationId,
  createMessage,
  deleteMessage,
} from '../controllers/messageController.js'

const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(createMessage)
router.route('/:convoid').get(getMessagesByConversationId)
router.route('/:id').delete(deleteMessage)

export default router

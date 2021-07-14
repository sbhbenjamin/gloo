import express from 'express'
import {
  getConversations,
  createConversation,
  deleteConversation,
  getConversationsByUserId,
} from '../controllers/conversationController.js'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getConversations).post(createConversation)
router.route('/:id').delete(deleteConversation)
router.route('/:userid').get(getConversationsByUserId)

export default router

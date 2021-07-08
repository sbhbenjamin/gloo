import asyncHandler from 'express-async-handler'
import Conversation from '../models/conversationModel.js'

// @desc        Fetch all conversations
// @route       GET /api/conversations
// @access      Private
const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find()
    .populate('buyer', 'name')
    .populate('seller', 'name')
    .populate('product', 'name image numReviews rating')

  res.json(conversations)
})

// @desc        Create a conversation
// @route       POST /api/conversations
// @access      Private
const createConversation = asyncHandler(async (req, res) => {
  const { buyer, seller, product } = req.body

  try {
    const conversation = new Conversation({
      buyer,
      seller,
      product,
    })

    const createdConversation = await conversation.save()
    res.status(201).json(createdConversation)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// @desc        Delete a conversation
// @route       DELETE /api/conversations/:id
// @access      Private
const deleteConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id)

  if (conversation) {
    // if you want only the creator to delete, you should check
    // req.user._id == conversation.user._id
    await conversation.remove()
    res.json({ message: 'Conversation removed' })
  } else {
    res.status(404)
    throw new Error('Conversation not found')
  }
})

export { getConversations, createConversation, deleteConversation }

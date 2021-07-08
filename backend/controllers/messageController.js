import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'
import Conversation from '../models/conversationModel.js'

// @desc        Fetch all messages
// @route       GET /api/messages/:convoid
// @access      Private
const getMessagesByConversationId = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    conversation: req.params.convoid,
  })

  res.json(messages)
})

// @desc        Create a message
// @route       POST /api/messages
// @access      Private
const createMessage = asyncHandler(async (req, res) => {
  const { conversation, sender, text } = req.body

  const conversationExists = await Conversation.find({
    _id: conversation,
  })

  if (conversationExists) {
    const message = new Message({
      conversation,
      sender,
      text,
    })

    const createdMessage = await message.save()
    res.status(201).json(createdMessage)
  } else {
    res.status(400)
    throw new Error('Conversation does not exist')
  }
})

// @desc        Delete a message
// @route       DELETE /api/messages/:id
// @access      Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (message) {
    // if you want only the creator to delete, you should check
    // req.user._id == message.user._id
    await message.remove()
    res.json({ message: 'Message removed' })
  } else {
    res.status(404)
    throw new Error('Message not found')
  }
})

export { getMessagesByConversationId, createMessage, deleteMessage }

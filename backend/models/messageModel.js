import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Conversation',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

export default Message

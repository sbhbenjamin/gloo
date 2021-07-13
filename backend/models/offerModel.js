import mongoose from 'mongoose'

const offerSchema = mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Conversation',
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItem: {
      name: { type: String, required: true },
      image: { type: String, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    offerStatus: {
      type: String, // pending | accepted | rejected
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Offer = mongoose.model('Offer', offerSchema)

export default Offer

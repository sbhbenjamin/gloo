import asyncHandler from 'express-async-handler'
import Offer from '../models/offerModel.js'

// @desc        Create new offer
// @route       POST /api/offers
// @access      Private
const createOffer = asyncHandler(async (req, res) => {
  const {
    conversation,
    sender,
    buyer,
    seller,
    orderItem,
    offerPrice,
    offerStatus,
  } = req.body

  const offer = new Offer({
    conversation,
    sender,
    buyer,
    seller,
    orderItem,
    offerPrice,
    offerStatus,
  })

  const createdOffer = await offer.save()

  res.status(201).json(createdOffer)
})

// @desc        Fetch all offers
// @route       GET /api/offers/
// @access      Private/Admin
const getOffers = asyncHandler(async (req, res) => {
  const offer = await Offer.find()

  if (offer) {
    res.json(offer)
  } else {
    res.status(404)
    throw new Error('Offer not found')
  }
})

// @desc        Fetch offers by user id
// @route       GET /api/offers/:userid
// @access      Private
const getOffersByUserId = asyncHandler(async (req, res) => {
  const offers = await Offer.find({
    $or: [
      {
        buyer: {
          _id: req.params.userid,
        },
      },
      {
        seller: {
          _id: req.params.userid,
        },
      },
    ],
  })

  res.json(offers)
})

// @desc        Fetch single offer
// @route       GET /api/offers/:id
// @access      Private
const getOfferById = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id)

  if (offer) {
    res.json(offer)
  } else {
    res.status(404)
    throw new Error('Offer not found')
  }
})

// @desc        Update offer status
// @route       PUT /api/offers/:id/status
// @access      Private
const updateOfferStatus = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id)
  const { offerStatus } = req.body

  if (offer) {
    offer.offerStatus = offerStatus

    const updatedOffer = await offer.save()
    res.json(updatedOffer)
  } else {
    res.status(404)
    throw new Error('Offer not found')
  }
})

// @desc        Update offer price
// @route       PUT /api/offers/:id/price
// @access      Private
const updateOfferPrice = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id)
  const { offerPrice } = req.body

  if (offer) {
    offer.offerPrice = offerPrice

    const updatedOffer = await offer.save()
    res.json(updatedOffer)
  } else {
    res.status(404)
    throw new Error('Offer not found')
  }
})

export {
  createOffer,
  getOffers,
  getOfferById,
  getOffersByUserId,
  updateOfferStatus,
  updateOfferPrice,
}

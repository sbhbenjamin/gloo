export const currentChat = {
  _id: '60f653a608c5080004c4eaac',
  buyer: {
    _id: '60d55c4cd97a74d6bd80cb20',
    name: 'John Doe',
  },
  seller: {
    _id: '60d55c4cd97a74d6bd80cb1f',
    name: 'Admin user',
  },
  product: {
    rating: 4.5,
    numReviews: 12,
    _id: '60e5370183206d62e2a6e6d0',
    name: '1st Solution Electrical',
    image: '/images/electrical.jpg',
  },
}

export const offers = [
  {
    // pending offer (sent by admin)
    orderItem: {
      name: '1st Solution Electrical',
      image: '/images/electrical.jpg',
      product: '60e5370183206d62e2a6e6d0',
    },
    _id: '60f653ac08c5080004c4eaad',
    conversation: '60f653a608c5080004c4eaac',
    sender: '60d55c4cd97a74d6bd80cb1f',
    buyer: '60d55c4cd97a74d6bd80cb20',
    seller: '60d55c4cd97a74d6bd80cb1f',
    offerPrice: 200,
    offerStatus: 'pending',
    createdAt: '2021-07-20T04:40:12.838Z',
    updatedAt: '2021-07-20T04:40:30.798Z',
    __v: 0,
  },
]

export const acceptedOffer = [
  {
    // pending offer
    orderItem: {
      name: '1st Solution Electrical',
      image: '/images/electrical.jpg',
      product: '60e5370183206d62e2a6e6d0',
    },
    _id: '60f653ac08c5080004c4eaad',
    conversation: '60f653a608c5080004c4eaac',
    sender: '60e5370183206d62e2a6e6ce',
    buyer: '60d55c4cd97a74d6bd80cb20',
    seller: '60d55c4cd97a74d6bd80cb1f',
    offerPrice: 200,
    offerStatus: 'accepted',
    createdAt: '2021-07-20T04:40:12.838Z',
    updatedAt: '2021-07-20T04:40:30.798Z',
    __v: 0,
  },
]

// order related to offer
export const orderMatch = {
  orderItem: {
    name: '1st Solution Electrical',
    image: '/images/electrical.jpg',
    product: '60e5370183206d62e2a6e6d0',
  },
  shippingAddress: {
    address: '11 Main St',
    city: 'Oregon',
    postalCode: '544342',
    country: 'USA',
  },
  itemPrice: 200,
  taxPrice: 14,
  shippingPrice: 15,
  totalPrice: 229,
  isPaid: false,
  isDelivered: false,
  _id: '60f653d808c5080004c4eaae',
  buyer: {
    _id: '60d55c4cd97a74d6bd80cb20',
    name: 'John Doe',
  },
  seller: {
    _id: '60d55c4cd97a74d6bd80cb1f',
    name: 'Admin user',
  },
  paymentMethod: 'PayPal',
  offer: '60f653ac08c5080004c4eaad',
  createdAt: '2021-07-20T04:40:56.881Z',
  updatedAt: '2021-07-20T04:40:56.881Z',
  __v: 0,
}

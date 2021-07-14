import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const addToCart = (offer) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      buyer: offer.buyer,
      seller: offer.seller,
      orderItem: {
        name: offer.orderItem.name,
        image: offer.orderItem.image,
        product: offer.orderItem.product,
      },
    },
  })

  localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItem))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItem))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

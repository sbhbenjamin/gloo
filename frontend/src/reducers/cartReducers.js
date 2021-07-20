import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (state = { shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {
        ...state,
        offer: action.payload,
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        offer: null,
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    default:
      return state
  }
}

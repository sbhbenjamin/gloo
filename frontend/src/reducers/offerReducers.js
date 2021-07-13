import {
  OFFER_CREATE_FAIL,
  OFFER_CREATE_REQUEST,
  OFFER_CREATE_RESET,
  OFFER_CREATE_SUCCESS,
} from '../constants/offerConstants'

export const offerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case OFFER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        offer: action.payload,
      }
    case OFFER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case OFFER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

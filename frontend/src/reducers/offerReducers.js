import {
  OFFER_ACCEPT_FAIL,
  OFFER_ACCEPT_REQUEST,
  OFFER_ACCEPT_RESET,
  OFFER_ACCEPT_SUCCESS,
  OFFER_CREATE_FAIL,
  OFFER_CREATE_REQUEST,
  OFFER_CREATE_RESET,
  OFFER_CREATE_SUCCESS,
  OFFER_LIST_FAIL,
  OFFER_LIST_REQUEST,
  OFFER_LIST_RESET,
  OFFER_LIST_SUCCESS,
  OFFER_REJECT_FAIL,
  OFFER_REJECT_REQUEST,
  OFFER_REJECT_RESET,
  OFFER_REJECT_SUCCESS,
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

export const offerListReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_LIST_REQUEST:
      return {
        loading: true,
      }
    case OFFER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        offers: action.payload,
      }
    case OFFER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case OFFER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const offerAcceptReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_ACCEPT_REQUEST:
      return {
        loading: true,
      }
    case OFFER_ACCEPT_SUCCESS:
      return {
        loading: false,
        offer: action.payload,
      }
    case OFFER_ACCEPT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case OFFER_ACCEPT_RESET:
      return {}
    default:
      return state
  }
}

export const offerRejectReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_REJECT_REQUEST:
      return {
        loading: true,
      }
    case OFFER_REJECT_SUCCESS:
      return {
        loading: false,
        offer: action.payload,
      }
    case OFFER_REJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case OFFER_REJECT_RESET:
      return {}
    default:
      return state
  }
}

import {
  CERT_LIST_REQUEST,
  CERT_LIST_SUCCESS,
  CERT_LIST_FAIL,
  CERT_DETAILS_REQUEST,
  CERT_DETAILS_SUCCESS,
  CERT_DETAILS_FAIL,
  CERT_DELETE_REQUEST,
  CERT_DELETE_SUCCESS,
  CERT_DELETE_FAIL,
  CERT_DELETE_RESET,
  CERT_CREATE_REQUEST,
  CERT_CREATE_SUCCESS,
  CERT_CREATE_FAIL,
  CERT_CREATE_RESET,
  CERT_UPDATE_REQUEST,
  CERT_UPDATE_SUCCESS,
  CERT_UPDATE_FAIL,
  CERT_UPDATE_RESET,
  CERT_LIST_USER_REQUEST,
  CERT_LIST_USER_SUCCESS,
  CERT_LIST_USER_FAIL,
  CERT_DETAILS_RESET,
} from "../constants/certConstants"

// reducer(initial state, action)
export const certListReducer = (state = { certs: [] }, action) => {
  switch (action.type) {
    case CERT_LIST_REQUEST:
      return { loading: true, certs: [] }
    case CERT_LIST_SUCCESS:
      return {
        loading: false,
        certs: action.payload.certs,
      }
    case CERT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const certDetailsReducer = (state = { cert: {} }, action) => {
  switch (action.type) {
    case CERT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case CERT_DETAILS_SUCCESS:
      return { loading: false, cert: action.payload }
    case CERT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case CERT_DETAILS_RESET:
      return { cert: {} }
    default:
      return state
  }
}

export const certDeleteReducer = (state = { cert: [] }, action) => {
  switch (action.type) {
    case CERT_DELETE_REQUEST:
      return { loading: true }
    case CERT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CERT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case CERT_DELETE_RESET:
      return { cert: [] }
    default:
      return state
  }
}

export const certCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CERT_CREATE_REQUEST:
      return { loading: true }
    case CERT_CREATE_SUCCESS:
      return { loading: false, success: true, cert: action.payload }
    case CERT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CERT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const certUpdateReducer = (state = { cert: {} }, action) => {
  switch (action.type) {
    case CERT_UPDATE_REQUEST:
      return { loading: true }
    case CERT_UPDATE_SUCCESS:
      return { loading: false, success: true, cert: action.payload }
    case CERT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CERT_UPDATE_RESET:
      return { cert: {} }
    default:
      return state
  }
}

export const certListUserReducer = (state = { certs: [] }, action) => {
  switch (action.type) {
    case CERT_LIST_USER_REQUEST:
      return { loading: true }
    case CERT_LIST_USER_SUCCESS:
      return {
        loading: false,
        certs: action.payload,
      }
    case CERT_LIST_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

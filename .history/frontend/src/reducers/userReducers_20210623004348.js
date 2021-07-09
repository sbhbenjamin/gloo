import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_DETAILS_PUBLIC_REQUEST,
  USER_DETAILS_PUBLIC_SUCCESS,
  USER_DETAILS_PUBLIC_FAIL,
  USER_DETAILS_PUBLIC_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_LIST_FAVOURITES_REQUEST,
  USER_LIST_FAVOURITES_SUCCESS,
  USER_LIST_FAVOURITES_FAIL,
  USER_ADD_FAVOURITE_REQUEST,
  USER_ADD_FAVOURITE_SUCCESS,
  USER_ADD_FAVOURITE_FAIL,
  USER_REMOVE_FAVOURITE_REQUEST,
  USER_REMOVE_FAVOURITE_SUCCESS,
  USER_REMOVE_FAVOURITE_FAIL,
  USER_ADD_FAVOURITE_RESET,
  USER_REMOVE_FAVOURITE_RESET,
  USER_GET_FAVOURITE_REQUEST,
  USER_GET_FAVOURITE_SUCCESS,
  USER_GET_FAVOURITE_FAIL,
  USER_GET_FAVOURITE_RESET,
  USER_LIST_FAVOURITES_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsPublicReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_PUBLIC_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_PUBLIC_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_PUBLIC_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_PUBLIC_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userFavouritesReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case USER_LIST_FAVOURITES_REQUEST:
      return { loading: true, products: [] }
    case USER_LIST_FAVOURITES_SUCCESS:
      return { loading: false, products: action.payload, success: true }
    case USER_LIST_FAVOURITES_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_FAVOURITES_RESET:
      return { products: [] }
    default:
      return state
  }
}

export const getFavouriteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_FAVOURITE_REQUEST:
      return { loading: true }
    case USER_GET_FAVOURITE_SUCCESS:
      return { loading: false, product: action.payload }
    case USER_GET_FAVOURITE_FAIL:
      return { loading: false, error: action.payload }
    case USER_GET_FAVOURITE_RESET:
      return {}
    default:
      return state
  }
}

export const favouriteAddReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_FAVOURITE_REQUEST:
      return { loading: true }
    case USER_ADD_FAVOURITE_SUCCESS:
      return { loading: false, success: true }
    case USER_ADD_FAVOURITE_FAIL:
      return { loading: false, error: action.payload }
    case USER_ADD_FAVOURITE_RESET:
      return {}
    default:
      return state
  }
}

export const favouriteRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REMOVE_FAVOURITE_REQUEST:
      return { loading: true }
    case USER_REMOVE_FAVOURITE_SUCCESS:
      return { loading: false, success: true }
    case USER_REMOVE_FAVOURITE_FAIL:
      return { loading: false, error: action.payload }
    case USER_REMOVE_FAVOURITE_RESET:
      return {}
    default:
      return state
  }
}

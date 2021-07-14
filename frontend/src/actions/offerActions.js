import axios from 'axios'
import {
  OFFER_ACCEPT_FAIL,
  OFFER_ACCEPT_REQUEST,
  OFFER_ACCEPT_SUCCESS,
  OFFER_CREATE_FAIL,
  OFFER_CREATE_REQUEST,
  OFFER_CREATE_SUCCESS,
  OFFER_LIST_FAIL,
  OFFER_LIST_REQUEST,
  OFFER_LIST_SUCCESS,
  OFFER_REJECT_FAIL,
  OFFER_REJECT_REQUEST,
  OFFER_REJECT_SUCCESS,
} from '../constants/offerConstants'
import { logout } from './userActions'

export const createOffer = (offer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OFFER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/offers`, offer, config)

    dispatch({
      type: OFFER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: OFFER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getOffers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: OFFER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/offers/${userInfo._id}`, config)

    dispatch({
      type: OFFER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: OFFER_LIST_FAIL,
      payload: message,
    })
  }
}

export const acceptOffer = (offer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OFFER_ACCEPT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const accept = {
      offerStatus: 'accepted',
    }

    const { data } = await axios.put(
      `/api/offers/${offer._id}/status`,
      accept,
      config
    )

    dispatch({
      type: OFFER_ACCEPT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: OFFER_ACCEPT_FAIL,
      payload: message,
    })
  }
}

export const rejectOffer = (offer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OFFER_REJECT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const reject = {
      offerStatus: 'rejected',
    }

    const { data } = await axios.put(
      `/api/offers/${offer._id}/status`,
      reject,
      config
    )

    dispatch({
      type: OFFER_REJECT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: OFFER_REJECT_FAIL,
      payload: message,
    })
  }
}

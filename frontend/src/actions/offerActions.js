import axios from 'axios'
import {
  OFFER_CREATE_FAIL,
  OFFER_CREATE_REQUEST,
  OFFER_CREATE_SUCCESS,
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

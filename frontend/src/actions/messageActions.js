import axios from 'axios'
import {
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_FAIL,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_CREATE_FAIL,
} from '../constants/messageConstants'

export const listMessages = (conversationId) => async (dispatch, getState) => {
  try {
    dispatch({ type: MESSAGE_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/messages/${conversationId}`, config)

    dispatch({
      type: MESSAGE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MESSAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMessage = (message) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/messages`, message, config)

    dispatch({
      type: MESSAGE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MESSAGE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

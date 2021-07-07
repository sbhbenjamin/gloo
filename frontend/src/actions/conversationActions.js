import axios from 'axios'
import {
  CONVERSATION_CREATE_FAIL,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_RESET,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_LIST_FAIL,
  CONVERSATION_LIST_REQUEST,
  CONVERSATION_LIST_SUCCESS,
} from '../constants/conversationConstants'

export const listConversations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONVERSATION_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/conversations`, config)

    dispatch({
      type: CONVERSATION_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONVERSATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createConversation = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONVERSATION_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const conversation = {
      sender: userInfo._id,
      receiver: product.user._id,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/conversations`,
      conversation,
      config
    )

    dispatch({
      type: CONVERSATION_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONVERSATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

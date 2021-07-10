import {
  CONVERSATION_CREATE_FAIL,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_RESET,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_LIST_FAIL,
  CONVERSATION_LIST_REQUEST,
  CONVERSATION_LIST_RESET,
  CONVERSATION_LIST_SUCCESS,
  CONVERSATION_RESET,
  CONVERSATION_SET,
} from '../constants/conversationConstants'

export const conversationListReducer = (
  state = { conversations: [] },
  action
) => {
  switch (action.type) {
    case CONVERSATION_LIST_REQUEST:
      return { loading: true, conversations: [] }
    case CONVERSATION_LIST_SUCCESS:
      return {
        loading: false,
        conversations: action.payload,
      }
    case CONVERSATION_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CONVERSATION_LIST_RESET:
      return { conversations: [] }
    default:
      return state
  }
}

export const conversationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONVERSATION_CREATE_REQUEST:
      return { loading: true, conversations: [] }
    case CONVERSATION_CREATE_SUCCESS:
      return {
        loading: false,
        conversation: action.payload,
      }
    case CONVERSATION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CONVERSATION_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const conversationSetReducer = (state = {}, action) => {
  switch (action.type) {
    case CONVERSATION_SET:
      return { product: action.payload }
    case CONVERSATION_RESET:
      return {}
    default:
      return state
  }
}

import './conversationscreen.css'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Button } from 'react-bootstrap'
import {
  createConversation,
  listConversations,
} from '../actions/conversationActions'
import { createMessage, listMessages } from '../actions/messageActions'
import Message from '../components/Message'
import MessageTimeout from '../components/MessageTimeout'
import Loader from '../components/Loader'
import ChatProduct from '../components/chatProduct/ChatProduct'
import ChatUser from '../components/chatUser/ChatUser'
import ChatMessage from '../components/chatMessage/ChatMessage'
import { MESSAGE_CREATE_RESET } from '../constants/messageConstants'
import { CONVERSATION_CREATE_RESET } from '../constants/conversationConstants'

const ConversationsScreen = ({ history }) => {
  const [currentChat, setCurrentChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [childError, setChildError] = useState(null)
  const [childInfo, setChildInfo] = useState(null)
  const dispatch = useDispatch()
  const scrollRef = useRef()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const conversationList = useSelector((state) => state.conversationList)
  const {
    loading: loadingConversations,
    error: errorConversations,
    conversations,
  } = conversationList

  const conversationCreate = useSelector((state) => state.conversationCreate)
  const {
    // loading: loadingConversationCreate,
    // error: errorConversationCreate,
    conversation: createdConversation,
  } = conversationCreate

  const messageList = useSelector((state) => state.messageList)
  const {
    loading: loadingMessages,
    error: errorMessages,
    messages,
  } = messageList

  const messageCreate = useSelector((state) => state.messageCreate)
  const {
    // loading: loadingCreate,
    // error: errorCreate,
    success: successCreate,
  } = messageCreate

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }

    // list all conversations
    dispatch(listConversations())

    // check if user came from product screen
    if (
      history.location.state &&
      history.location.state.product &&
      conversations
    ) {
      const chatExists = conversations?.filter(
        (c) =>
          c.buyer._id === userInfo._id &&
          c.product._id === history.location.state.product._id
      )

      if (chatExists.length > 0) {
        // if current chat exists, set current chat
        setCurrentChat(chatExists[0])
        history.replace({
          pathname: '/conversations',
          state: {},
        })
      } else {
        // create new conversation if chat does not exist
        dispatch(createConversation(history.location.state.product))
      }
    }
  }, [dispatch, history, userInfo])

  useEffect(() => {
    // when conversation is created, reset state and list products
    if (createdConversation) {
      setCurrentChat(createdConversation)
      dispatch({ type: CONVERSATION_CREATE_RESET })
      dispatch(listConversations())
      history.replace({
        pathname: '/conversations',
        state: {},
      })
    }
  }, [dispatch, history, createdConversation])

  // list all messages
  useEffect(() => {
    dispatch({ type: MESSAGE_CREATE_RESET })
    if (currentChat) {
      dispatch(listMessages(currentChat._id))
    }
  }, [dispatch, currentChat, successCreate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = {
      conversation: currentChat._id,
      sender: userInfo._id,
      text: newMessage,
    }
    dispatch(createMessage(message))
    setNewMessage('')
  }

  return (
    <>
      {userInfo && (
        <>
          {childError && !childInfo && (
            <MessageTimeout variant='danger'>{childError}</MessageTimeout>
          )}
          {childInfo && (
            <MessageTimeout variant='success'>{childInfo}</MessageTimeout>
          )}
          <Button
            data-testid='navigate-back-btn'
            onClick={history.goBack}
            variant='outline-secondary'
          >
            Go Back
          </Button>
          <div className='messenger'>
            <div className='chatMenu'>
              <div className='chatMenuWrapper'>
                {loadingConversations ? (
                  <Loader />
                ) : errorConversations ? (
                  <Message variant='danger'>{errorConversations}</Message>
                ) : (
                  <Nav variant='pills' className='flex-column ms-0'>
                    {conversations.map((c) => (
                      <div key={c._id} onClick={() => setCurrentChat(c)}>
                        <ChatUser
                          setChildError={setChildError}
                          conversation={c}
                          currentChat={currentChat}
                          data-testid='chat-user'
                        />
                      </div>
                    ))}
                  </Nav>
                )}
              </div>
            </div>
            <div className='chatBox' data-testid='chatbox'>
              <div className='chatBoxWrapper'>
                {loadingMessages ? (
                  <Loader />
                ) : errorMessages ? (
                  <Message variant='danger' variants='danger' timeout={true}>
                    {errorMessages}
                  </Message>
                ) : currentChat ? (
                  messages && (
                    <>
                      <ChatProduct
                        history={history}
                        currentChat={currentChat}
                        setChildError={setChildError}
                        setChildInfo={setChildInfo}
                        data-testid='chat-product'
                      />
                      <div className='chatBoxTop'>
                        {messages?.map((m) => (
                          <div key={m._id} ref={scrollRef}>
                            <ChatMessage
                              message={m}
                              own={m.sender === userInfo._id}
                            />
                          </div>
                        ))}
                      </div>
                      <div className='chatBoxBottom'>
                        <textarea
                          className='chatMessageInput'
                          placeholder='write something...'
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={newMessage}
                          data-testid='chat-input'
                        ></textarea>
                        <button
                          type='submit'
                          className='chatSubmitButton'
                          onClick={handleSubmit}
                          data-testid='chat-send'
                        >
                          Send
                        </button>
                      </div>
                    </>
                  )
                ) : (
                  <span
                    className='noConversationText'
                    data-testid='chat-nulltext'
                  >
                    Open a conversation to start a chat.
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}{' '}
    </>
  )
}

export default ConversationsScreen

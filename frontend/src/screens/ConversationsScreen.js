import './conversationscreen.css'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Nav,
  FormControl,
  Button,
  Card,
  InputGroup,
} from 'react-bootstrap'
import {
  createConversation,
  listConversations,
} from '../actions/conversationActions'
import { createMessage, listMessages } from '../actions/messageActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Rating from '../components/Rating'
import { io } from 'socket.io-client'
import ChatUser from '../components/chatUser/ChatUser'
import ChatMessage from '../components/chatMessage/ChatMessage'
import { MESSAGE_CREATE_RESET } from '../constants/messageConstants'
import {
  CONVERSATION_CREATE_RESET,
  CONVERSATION_RESET,
} from '../constants/conversationConstants'

const ConversationsScreen = ({ history, match }) => {
  const [currentChat, setCurrentChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [offerActive, setOfferActive] = useState(false)
  const [offerPrice, setOfferPrice] = useState(null)
  const dispatch = useDispatch()
  const scrollRef = useRef()

  // const socket = io()
  // const socket = useRef()

  // useEffect(() => {
  //   socket.current = io('ws://localhost:5000')
  //   socket.current.on('message', (message) => {
  //     console.log(message)
  //   })
  // }, [])

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

  // const conversationSet = useSelector((state) => state.conversationSet)
  // const { product: productSet } = conversationSet

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

  // list all conversations
  useEffect(() => {
    if (!userInfo) {
      dispatch({ type: CONVERSATION_RESET })
      history.push('/')
    }

    dispatch(listConversations())
    // set current chat to product that user came from
    if (history.location.state?.product && conversations) {
      const chatExists = conversations?.filter(
        (c) =>
          c.buyer._id === userInfo._id &&
          c.product._id === history.location.state.product._id
      )

      if (chatExists.length > 0) {
        setCurrentChat(chatExists[0])
      } else {
        dispatch(createConversation(history.location.state.product))
      }
    }
  }, [dispatch, history, userInfo])

  useEffect(() => {
    if (createdConversation) {
      setCurrentChat(createdConversation)
      dispatch({ type: CONVERSATION_CREATE_RESET })
      dispatch(listConversations())
    }
  }, [createdConversation])

  // list all messages
  useEffect(() => {
    dispatch({ type: MESSAGE_CREATE_RESET })
    if (currentChat) {
      dispatch(listMessages(currentChat._id))
    }
  }, [dispatch, currentChat, successCreate])

  const handleOfferBtn = () => {
    setOfferActive(true)
  }

  const handleOfferCancel = () => {
    setOfferActive(false)
  }

  const handleOfferSubmit = () => {
    // dispatch offer
    console.log(offerPrice)
  }

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
                      <div onClick={() => setCurrentChat(c)}>
                        <ChatUser
                          key={c._id}
                          conversation={c}
                          currentChat={currentChat}
                        />
                      </div>
                    ))}
                  </Nav>
                )}
              </div>
            </div>
            <div className='chatBox'>
              <div className='chatBoxWrapper'>
                {loadingMessages ? (
                  <Loader />
                ) : errorMessages ? (
                  <Message variant='danger'>{errorMessages}</Message>
                ) : currentChat ? (
                  messages && (
                    <>
                      <Card className='chatBoxProduct'>
                        <Card.Body>
                          <Row>
                            <Col xs={1}>
                              <img
                                className='chatBoxProductImage'
                                src={currentChat.product.image}
                                alt={currentChat.product.name}
                              />
                            </Col>
                            <Col className='flex-grow-1'>
                              <p className='chatBoxProductName'>
                                {currentChat.product.name}
                              </p>
                              <Rating
                                data-testid='product-rating'
                                value={currentChat.product.rating}
                                text={`${currentChat.product.numReviews} reviews`}
                              />
                            </Col>
                            <Col
                              xs={5}
                              className='d-flex chatBoxProductBtnWrapper'
                            >
                              {!offerActive ? (
                                <Button
                                  className='chatBoxProductBtn'
                                  onClick={handleOfferBtn}
                                >
                                  Make offer
                                </Button>
                              ) : (
                                <div className='chatBoxProductBtnExpand'>
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                      type='number'
                                      placeholder='0.00'
                                      onChange={(e) =>
                                        setOfferPrice(e.target.value)
                                      }
                                    />
                                    <InputGroup.Append>
                                      <Button
                                        variant='outline-success'
                                        onClick={handleOfferSubmit}
                                      >
                                        Offer
                                      </Button>
                                    </InputGroup.Append>
                                  </InputGroup>
                                  <a
                                    href='#'
                                    className='chatBoxProductCancel'
                                    onClick={handleOfferCancel}
                                  >
                                    cancel
                                  </a>
                                </div>
                              )}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                      <div className='chatBoxTop'>
                        {messages?.map((m) => (
                          <div ref={scrollRef}>
                            <ChatMessage
                              key={m._id}
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
                        ></textarea>
                        <button
                          type='submit'
                          className='chatSubmitButton'
                          onClick={handleSubmit}
                        >
                          Send
                        </button>
                      </div>
                    </>
                  )
                ) : (
                  <span className='noConversationText'>
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

import './conversationscreen.css'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Nav, Form, Button, Container } from 'react-bootstrap'
import { listConversations } from '../actions/conversationActions'
import { listMessages } from '../actions/messageActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { io } from 'socket.io-client'
import ChatUser from '../components/ChatUser'
import ChatMessage from '../components/ChatMessage'

const ConversationsScreen = () => {
  const [currentChat, setCurrentChat] = useState(null)
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

  const messageList = useSelector((state) => state.messageList)
  const {
    loading: loadingMessages,
    error: errorMessages,
    messages,
  } = messageList

  useEffect(() => {
    dispatch(listConversations())
  }, [dispatch])

  useEffect(() => {
    if (currentChat) {
      dispatch(listMessages(currentChat._id))
    }
  }, [dispatch, currentChat])

  const handleChatSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input placeholder='Search for friends' className='chatMenuInput' />

            {loadingConversations ? (
              <Loader />
            ) : errorConversations ? (
              <Message variant='danger'>{errorConversations}</Message>
            ) : (
              <Nav variant='pills' className='flex-column'>
                {conversations.map((c) => (
                  <div onClick={() => setCurrentChat(c)}>
                    <Nav.Link>{c.receiver.name}</Nav.Link>
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
                  <div className='chatBoxTop'>
                    {messages?.map((m) => (
                      <div ref={scrollRef}>
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
                      // onChange={(e) => setNewMessage(e.target.value)}
                      // value={newMessage}
                    ></textarea>
                    <button
                      className='chatSubmitButton'
                      // onClick={handleSubmit}
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
  )
}

//   return (
//     <div className='messenger'>
//       <div className='chatMenu'>
//         {loadingConversations ? (
//           <Loader />
//         ) : errorConversations ? (
//           <Message variant='danger'>{errorConversations}</Message>
//         ) : (
//           <Nav variant='pills' className='flex-column'>
//             {conversations.map((c) => (
//               <Nav.Link>{c.receiver.name}</Nav.Link>
//             ))}
//           </Nav>
//         )}
//       </div>
//       <div className='chatBox' xs={9}>
//         <Row className='chatBoxWrapper'>
//           <div className='chatBoxTop'>
//             <ChatMessage />
//             <ChatMessage own={true} />
//             <ChatMessage />
//             <ChatMessage own={true} />
//             <ChatMessage />
//             <ChatMessage own={true} />
//             <ChatMessage />
//             <ChatMessage own={true} />
//           </div>
//         </Row>
//         <Row>
//           <Form>
//             <div className='d-flex'>
//               <Col xs='11' className='w-96'>
//                 <Form.Group inline>
//                   <Form.Control placeholder='Say Hello!' />
//                 </Form.Group>
//               </Col>
//               <Col className='flex-shrink-1'>
//                 <Button onSubmit={handleChatSubmit} type='submit'>
//                   Send
//                 </Button>
//               </Col>
//             </div>
//           </Form>
//         </Row>
//       </div>
//     </div>
//   )
// }

export default ConversationsScreen

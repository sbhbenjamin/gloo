import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listConversations } from '../actions/conversationActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { io } from 'socket.io-client'
import ChatUser from '../components/ChatUser'

const ConversationsScreen = () => {
  const dispatch = useDispatch()
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

  useEffect(() => {
    dispatch(listConversations())
  }, [dispatch])

  return (
    <>
      {loadingConversations ? (
        <Loader />
      ) : errorConversations ? (
        <Message variant='danger'>{errorConversations}</Message>
      ) : (
        <div>
          <h1 className='text-4xl font-bold font'>Conversations</h1>
          <div className='flex'>
            <div className='flex-col w-3/12'>
              <ul>
                {conversations.map((c) => (
                  <li>
                    <ChatUser key={c._id} name={c.receiver.name} />
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-9/12'>hello</div>
          </div>
        </div>
      )}
    </>
  )
}

export default ConversationsScreen

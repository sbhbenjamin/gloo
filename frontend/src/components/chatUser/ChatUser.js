import './chatuser.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

const ChatUser = ({ conversation, currentChat }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div
      className={`${
        currentChat?._id === conversation?._id && 'conversationSelect'
      } conversation`}
    >
      <img
        data-testid='chat-user-img'
        className='conversationImg'
        src={conversation.product.image}
        alt=''
      />
      <span className='conversationName' data-testid='chat-user-name'>
        {userInfo?._id === conversation.seller._id
          ? conversation.buyer.name
          : conversation.seller.name}
      </span>
    </div>
  )
}

export default ChatUser

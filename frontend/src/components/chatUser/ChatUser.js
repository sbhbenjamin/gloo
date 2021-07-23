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
        currentChat?._id === conversation?._id && 'conversation-active'
      } conversation`}
    >
      <Row>
        <Col xs='auto' className='conversation-image-wrapper'>
          <img
            data-testid='chat-user-img'
            className='conversation-image'
            src={conversation.product.image}
            alt=''
          />
        </Col>
        <Col>
          <Col className='conversation-name-product'>
            <Row data-testid='chat-user-name'>
              <span className='conversation-name'>
                {userInfo?._id === conversation.seller._id
                  ? conversation.buyer.name
                  : conversation.seller.name}
              </span>
            </Row>
            <Row>
              <span className='conversation-product-name'>
                {conversation.product.name}
              </span>
            </Row>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ChatUser

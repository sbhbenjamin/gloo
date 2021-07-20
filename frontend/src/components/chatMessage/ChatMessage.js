import './chatmessage.css'
import React from 'react'
import { Row } from 'react-bootstrap'
import { format } from 'timeago.js'

const ChatMessage = ({ own, message }) => {
  return (
    <Row>
      <div className={own ? 'message own' : 'message'}>
        <div className='messageTop'>
          {message && (
            <p className='messageText' data-testid='chat-message-text'>
              {message.text}
            </p>
          )}
        </div>
        <div className='messageBottom' data-testid='chat-message-createdat'>
          {format(message.createdAt)}
        </div>
      </div>
    </Row>
  )
}

export default ChatMessage

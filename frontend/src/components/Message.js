import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return (
    <div data-testid='message'>
      {alert && <Alert variant={variant}>{children}</Alert>}
    </div>
  )
}

Message.defaultProps = {
  variant: 'info',
  timeout: false,
}

export default Message

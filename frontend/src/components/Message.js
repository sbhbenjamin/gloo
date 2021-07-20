import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return <>{alert && <Alert variant={variant}>{children}</Alert>}</>
}

Message.defaultProps = {
  variant: 'info',
  timeout: false,
}

export default Message

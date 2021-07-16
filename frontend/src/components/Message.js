import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  // const [alert, setAlert] = useState(true)

  // useEffect(() => {
  //   if (timeout) {
  //     setTimeout(() => {
  //       setAlert(false)
  //     }, 3000)
  //   }
  // })

  return <>{alert && <Alert variant={variant}>{children}</Alert>}</>
}

Message.defaultProps = {
  variant: 'info',
  timeout: false,
}

export default Message

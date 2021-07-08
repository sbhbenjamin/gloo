import React from 'react'

const ChatUser = ({ name }) => {
  return (
    <div className='text-gray-900' className='px-1 py-2 border-2'>
      <h4>{name}</h4>
    </div>
  )
}

export default ChatUser

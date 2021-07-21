import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import ChatMessage from '../../components/chatMessage/ChatMessage'

it('chat message renders with message text and timestamp', () => {
  const message = {
    text: 'Test message from jest',
    createdAt: '2021-07-16T13:26:55.745+00:00',
  }
  const component = render(<ChatMessage own={true} message={message} />)
  expect(component.getByTestId('chat-message-text')).toHaveTextContent(
    'Test message from jest'
  )
  expect(component.getByTestId('chat-message-createdat')).toHaveTextContent(
    '5 days ago'
  )
})

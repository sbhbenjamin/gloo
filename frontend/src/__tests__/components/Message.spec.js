import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import Message from '../../components/Message'

afterEach(cleanup)

describe('Message loads correctly', () => {
  it('should render danger message', () => {
    const component = render(
      <Message variant='danger'>Sample Error Message</Message>
    )
    const message = component.getByRole('alert')
    expect(message).toHaveClass('alert-danger')
    expect(message).toHaveTextContent('Sample Error Message')
  })

  it('should render success variant', () => {
    const component = render(
      <Message variant='success'>Sample Success Message</Message>
    )
    const message = component.getByRole('alert')
    expect(message).toHaveClass('alert-success')
    expect(message).toHaveTextContent('Sample Success Message')
  })
})

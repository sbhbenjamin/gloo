import React from 'react'
import { render, renderWithLogin, screen } from '../test-utils'
import Header from '../../Header'
import '@testing-library/jest-dom/extend-expect'

it('should render navbar links', () => {
  render(<Header />)
  expect(screen.getByTestId('navbar-brand')).toHaveTextContent('Gloo')
  expect(screen.getByTestId('search-input')).toBeInTheDocument()
  expect(screen.getByTestId('search-submit')).toHaveTextContent('Search')
  expect(screen.getByPlaceholderText('Search Products...')).toBeInTheDocument()
})

it('should render login button if not logged in', async () => {
  render(<Header />)
  expect(screen.queryByText('John Doe')).toBe(null)
  expect(screen.getByTestId('navbar-signin')).toBeInTheDocument()
})

it('should render name and chats if logged in', async () => {
  renderWithLogin(<Header />)
  expect(screen.getByTestId('navbar-chat')).toHaveTextContent('Chats')
  expect(screen.getByText('John Doe')).toBeInTheDocument()
  expect(screen.queryByTestId('navbar-signin')).not.toBeInTheDocument()
})

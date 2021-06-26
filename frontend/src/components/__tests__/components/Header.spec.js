import React from 'react'
import { render, renderWithLogin, screen } from '../test-utils'
import Header from '../../Header'
import '@testing-library/jest-dom/extend-expect'

it('should render login button if not logged in', async () => {
  render(<Header />)
  expect(screen.queryByText('Admin user')).not.toBeInTheDocument()
  expect(screen.queryByTestId('navbar-signin')).toBeInTheDocument()
})

it('should render name if logged in', async () => {
  renderWithLogin(<Header />)

  expect(screen.queryByText('Admin user')).toBeInTheDocument()
  expect(screen.queryByTestId('navbar-signin')).not.toBeInTheDocument()
})

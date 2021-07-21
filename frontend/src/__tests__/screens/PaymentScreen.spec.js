import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, renderWithLogin, renderWithCart } from '../test-utils'
import PaymentScreen from '../../screens/PaymentScreen'
import { cleanup, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

let history

beforeEach(() => {
  history = createMemoryHistory()
})

afterEach(() => {
  cleanup()
})

it('should redirect user to home screen if not logged in', async () => {
  render(<PaymentScreen history={history} />)
  expect(history.location.pathname).toBe('/login')
})

describe('should restrict access if logged in without items in cart', () => {
  it('should display error message', async () => {
    renderWithLogin(<PaymentScreen history={history} />)

    await waitFor(() => {
      expect(screen.getByText('Order does not exist.')).toBeInTheDocument()
      expect(screen.queryByTestId('payment-radio')).not.toBeInTheDocument()
    })
  })
})

describe('should render payment form', () => {
  it('renders default selection if local storage is empty', async () => {
    renderWithCart(<PaymentScreen history={history} />)

    await waitFor(() => {
      expect(screen.queryByText('Order does not exist.')).toBeNull()
      expect(screen.getByTestId('payment-radio').value).toBe('PayPal')
    })
  })
  // it('renders payment method from local storage', async () => {
  //   renderWithCart(<PaymentScreen history={history} />)

  //   await waitFor(() => {
  //     expect(screen.queryByText('Order does not exist.')).toBeNull()
  //     expect(screen.getByTestId('payment-radio').value).toBe('PayPal')
  //   })
  // })
})

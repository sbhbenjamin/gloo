import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import {
  render,
  screen,
  renderWithLogin,
  renderWithCart,
  renderWithCartFull,
} from '../test-utils'
import ShippingScreen from '../../screens/shippingScreen/ShippingScreen'
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
  render(<ShippingScreen history={history} />)
  expect(history.location.pathname).toBe('/login')
})

describe('should restrict access if logged in without items in cart', () => {
  it('should display error message', async () => {
    renderWithLogin(<ShippingScreen history={history} />)

    await waitFor(() => {
      expect(screen.getByText('Order does not exist.')).toBeInTheDocument()
      expect(screen.queryByTestId('shipping-address')).toBeNull()
      expect(screen.queryByTestId('shipping-city')).toBeNull()
      expect(screen.queryByTestId('shipping-country')).toBeNull()
      expect(screen.queryByTestId('shipping-postalcode')).toBeNull()
    })
  })
})

describe('should render shipping form with address information', () => {
  it('renders empty form if local storage is empty', async () => {
    renderWithCart(<ShippingScreen history={history} />)

    await waitFor(() => {
      expect(screen.queryByText('Order does not exist.')).toBeNull()
      expect(screen.getByTestId('shipping-address').value).toBe('')
      expect(screen.getByTestId('shipping-city').value).toBe('')
      expect(screen.getByTestId('shipping-country').value).toBe('')
      expect(screen.getByTestId('shipping-postalcode').value).toBe('')
    })
  })
  it('renders form with address information from local storage', async () => {
    renderWithCartFull(<ShippingScreen history={history} />)

    await waitFor(() => {
      expect(screen.queryByText('Order does not exist.')).toBeNull()
      expect(screen.getByTestId('shipping-address').value).toBe('11 Main St')
      expect(screen.getByTestId('shipping-city').value).toBe('Oregon')
      expect(screen.getByTestId('shipping-country').value).toBe('USA')
      expect(screen.getByTestId('shipping-postalcode').value).toBe('110534')
    })
  })
})

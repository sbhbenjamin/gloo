import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import { cleanup, waitFor } from '@testing-library/react'
import {
  screen,
  render,
  renderWithLogin,
  renderWithOwnership,
} from '../test-utils'
import OrderScreen from '../../../screens/OrderScreen'
import { sampleOrderArray } from '../stubs/orderStub'

export const handlers = [
  rest.get('/api/config/paypal', (req, res, ctx) => {
    return res(ctx.json(process.env.PAYPAL_CLIENT_ID))
  }),
  rest.get('/api/orders/60f2e375909eb2810c4f6e88', (req, res, ctx) => {
    return res(ctx.json(sampleOrderArray[1]))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

let history

beforeEach(() => {
  history = createMemoryHistory()
})

afterEach(cleanup)

const match = {
  params: {
    id: '60f2e375909eb2810c4f6e88',
  },
}

it('should be blank if not logged in', async () => {
  render(<OrderScreen match={match} history={history} />)
  expect(history.location.pathname).toBe('/login')
})

it('should display error message if logged in user is not owner', async () => {
  renderWithLogin(<OrderScreen match={match} history={history} />)

  await waitFor(() => {
    expect(
      screen.getByText('You are unauthorised to access this page.')
    ).toBeInTheDocument()
  })
})

it('should display order if logged in user is owner', async () => {
  renderWithOwnership(<OrderScreen match={match} history={history} />)

  await waitFor(() => {
    expect(
      screen.queryByText('You are unauthorised to access this page.')
    ).toBeNull()
    expect(screen.getByTestId('order-id')).toHaveTextContent(
      '60f2e375909eb2810c4f6e88'
    )
    expect(screen.getByTestId('order-email')).toHaveTextContent(
      'john@example.com'
    )
    expect(screen.getByTestId('order-address')).toHaveTextContent(
      '26 College East Ave, Singapore, 123456, Singapore'
    )
    expect(screen.getByTestId('order-paymentmethod')).toHaveTextContent(
      'PayPal'
    )
    expect(screen.getByTestId('order-product-name')).toHaveTextContent(
      '24hrs Shadin Air-conditioning'
    )
    expect(screen.getByTestId('order-product-price')).toHaveTextContent('100')
    expect(screen.getByTestId('order-summary-price')).toHaveTextContent('100')
    expect(screen.getByTestId('order-summary-shipping')).toHaveTextContent('0')
    expect(screen.getByTestId('order-summary-tax')).toHaveTextContent('7')
    expect(screen.getByTestId('order-summary-total')).toHaveTextContent('122')
  })
})

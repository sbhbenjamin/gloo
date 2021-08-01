import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  render,
  screen,
  renderWithLogin,
  renderWithOwnership,
} from '../test-utils'
import UserOrdersScreen from '../../screens/userOrdersScreen/UserOrdersScreen'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, waitFor } from '@testing-library/react'
import { sampleOrderArray, sampleOrderSellerArray } from '../stubs/orderStub'
import { createMemoryHistory } from 'history'

export const handlers = [
  rest.get('/api/orders/myorders', (req, res, ctx) => {
    return res(ctx.json(sampleOrderArray))
  }),

  rest.get('/api/orders/mysellerorders', (req, res, ctx) => {
    return res(ctx.json(sampleOrderSellerArray))
  }),
]

const server = setupServer(...handlers)
let history
beforeAll(() => server.listen())
beforeEach(() => {
  history = createMemoryHistory()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

test('should redirect if not logged in', async () => {
  render(<UserOrdersScreen history={history} />)

  expect(history.location.pathname).toBe('/login')
})

test('should render correct details if logged in as regular user', async () => {
  renderWithLogin(<UserOrdersScreen history={history} />)
  await waitFor(() => {
    expect(screen.getByText('60f2cbdc65269381686fe9d3')).toBeInTheDocument()
    expect(screen.getByText('60f2e375909eb2810c4f6e88')).toBeInTheDocument()
    expect(screen.getAllByText('2021-07-17').length).toBe(4)
    expect(screen.getByText('60f653d808c5080004c4eaae')).toBeInTheDocument()
    expect(screen.getByText('2019-06-16')).toBeInTheDocument()
  })
  fireEvent.click(screen.getByTestId('sales-btn'))
  await waitFor(() => {
    expect(screen.getByText('BUYER NAME')).toBeInTheDocument()
  })
  expect(screen.getByText('60aae864ee22a3fe12345678')).toBeInTheDocument()
  expect(screen.getByText('Steve Smith')).toBeInTheDocument()
  expect(screen.getAllByText('2021-09-31').length).toBe(3)

  expect(screen.queryByText('60f2cbdc65269381686fe9d3')).toBeNull()
  expect(screen.queryByText('60f2e375909eb2810c4f6e88')).toBeNull()
  expect(screen.queryByText('2021-07-17')).toBeNull()
  expect(screen.queryByText('60f653d808c5080004c4eaae')).toBeNull()
  expect(screen.queryByText('2019-06-16')).toBeNull()

  fireEvent.click(screen.getByTestId('purchases-btn'))
  await waitFor(() => {
    expect(screen.getByText('LISTING')).toBeInTheDocument()
  })

  expect(screen.getByText('60f2cbdc65269381686fe9d3')).toBeInTheDocument()
  expect(screen.getByText('60f2e375909eb2810c4f6e88')).toBeInTheDocument()
  expect(screen.getAllByText('2021-07-17').length).toBe(4)
  expect(screen.getByText('60f653d808c5080004c4eaae')).toBeInTheDocument()
  expect(screen.getByText('2019-06-16')).toBeInTheDocument()

  expect(screen.queryByText('60aae864ee22a3fe12345678')).toBeNull()
  expect(screen.queryByText('Steve Smith')).toBeNull()
  expect(screen.queryByText('2021-09-31')).toBeNull()
})

test('should display relevant details if logged in as admin', async () => {
  renderWithOwnership(<UserOrdersScreen history={history} />)
  await waitFor(() => {
    expect(screen.getByText('60f2cbdc65269381686fe9d3')).toBeInTheDocument()
    expect(screen.getByText('60f2e375909eb2810c4f6e88')).toBeInTheDocument()
    expect(screen.getAllByText('2021-07-17').length).toBe(4)
    expect(screen.getByText('60f653d808c5080004c4eaae')).toBeInTheDocument()
    expect(screen.getByText('2019-06-16')).toBeInTheDocument()
  })

  fireEvent.click(screen.getByTestId('sales-btn'))
  await waitFor(() => {
    expect(screen.getByText('BUYER NAME')).toBeInTheDocument()
  })
  expect(screen.getByText('60aae864ee22a3fe12345678')).toBeInTheDocument()
  expect(screen.getByText('Steve Smith')).toBeInTheDocument()
  expect(screen.getAllByText('2021-09-31').length).toBe(3)

  expect(screen.queryByText('60f2cbdc65269381686fe9d3')).toBeNull()
  expect(screen.queryByText('60f2e375909eb2810c4f6e88')).toBeNull()
  expect(screen.queryByText('2021-07-17')).toBeNull()
  expect(screen.queryByText('60f653d808c5080004c4eaae')).toBeNull()
  expect(screen.queryByText('2019-06-16')).toBeNull()

  fireEvent.click(screen.getByTestId('purchases-btn'))
  await waitFor(() => {
    expect(screen.getByText('LISTING')).toBeInTheDocument()
  })

  expect(screen.getByText('60f2cbdc65269381686fe9d3')).toBeInTheDocument()
  expect(screen.getByText('60f2e375909eb2810c4f6e88')).toBeInTheDocument()
  expect(screen.getAllByText('2021-07-17').length).toBe(4)
  expect(screen.getByText('60f653d808c5080004c4eaae')).toBeInTheDocument()
  expect(screen.getByText('2019-06-16')).toBeInTheDocument()

  expect(screen.queryByText('60aae864ee22a3fe12345678')).toBeNull()
  expect(screen.queryByText('Steve Smith')).toBeNull()
  expect(screen.queryByText('2021-09-31')).toBeNull()
})

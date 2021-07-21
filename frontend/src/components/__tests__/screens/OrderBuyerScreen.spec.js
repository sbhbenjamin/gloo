import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  render,
  screen,
  renderWithLogin,
  renderWithOwnership,
} from '../test-utils'
import OrderBuyerScreen from '../../../screens/OrderBuyerScreen'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, waitFor } from '@testing-library/react'
import { sampleOrderArray } from '../stubs/orderStub'
import { createMemoryHistory } from 'history'

export const handlers = [
  rest.get('/api/orders/myorders', (req, res, ctx) => {
    return res(ctx.json(sampleOrderArray))
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
  render(<OrderBuyerScreen history={history} />)
  expect(screen.queryByText('60f2cbdc65269381686fe9d3')).toBeNull()
  expect(screen.queryByText('2021-07-17')).toBeNull()

  expect(screen.queryByText('60f2e375909eb2810c4f6e88')).toBeNull()
  expect(screen.queryByText('2021-07-17')).toBeNull()

  expect(screen.queryByText('60f653d808c5080004c4eaae')).toBeNull()
  expect(screen.queryByText('2019-06-16')).toBeNull()

  expect(history.location.pathname).toBe('/login')
})

test('should render correct details if logged in as regular user', async () => {
  renderWithLogin(<OrderBuyerScreen history={history} />)
  await waitFor(() => {
    expect(screen.getByText('60f2cbdc65269381686fe9d3')).toBeInTheDocument()
    expect(screen.getByText('60f2e375909eb2810c4f6e88')).toBeInTheDocument()
    expect(screen.getAllByText('2021-07-17').length).toBe(4)
    expect(screen.getByText('60f653d808c5080004c4eaae')).toBeInTheDocument()
    expect(screen.getByText('2019-06-16')).toBeInTheDocument()
  })
})

test('should display relevant details if logged in as admin', async () => {
  renderWithOwnership(<OrderBuyerScreen history={history} />)
  await waitFor(() => {
    expect(screen.getByText('60f2cbdc65269381686fe9d3')).toBeInTheDocument()
    expect(screen.getByText('60f2e375909eb2810c4f6e88')).toBeInTheDocument()
    expect(screen.getAllByText('2021-07-17').length).toBe(4)
    expect(screen.getByText('60f653d808c5080004c4eaae')).toBeInTheDocument()
    expect(screen.getByText('2019-06-16')).toBeInTheDocument()
  })
})

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
import { waitForElementToBeRemoved, cleanup } from '@testing-library/react'
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
  expect(screen.queryByText('60d82fb65ab70e8b14f7fb79')).toBeNull()
  expect(screen.queryByText('2021-06-27')).toBeNull()

  expect(screen.queryByText('60d82fdf5ab70e8b14f7fb7c')).toBeNull()
  expect(screen.queryByText('2021-04-17')).toBeNull()

  expect(screen.queryByText('60d8303d5ab70e8b14f7fb7e')).toBeNull()
  expect(screen.queryByText('2021-04-30')).toBeNull()

  expect(screen.queryByText('60d8304d5ab70e8b14f7fb80')).toBeNull()
  expect(screen.queryByText('2021-05-15')).toBeNull()
  expect(history.location.pathname).toBe('/login')
})

test('should redirect if logged in as regular user', async () => {
  renderWithLogin(<OrderBuyerScreen history={history} />)
  expect(screen.queryByText('60d82fb65ab70e8b14f7fb79')).toBeNull()
  expect(screen.queryByText('2021-06-27')).toBeNull()

  expect(screen.queryByText('60d82fdf5ab70e8b14f7fb7c')).toBeNull()
  expect(screen.queryByText('2021-04-17')).toBeNull()

  expect(screen.queryByText('60d8303d5ab70e8b14f7fb7e')).toBeNull()
  expect(screen.queryByText('2021-04-30')).toBeNull()

  expect(screen.queryByText('60d8304d5ab70e8b14f7fb80')).toBeNull()
  expect(screen.queryByText('2021-05-15')).toBeNull()
})

test('should display relevant details if logged in as admin', async () => {
  renderWithOwnership(<OrderBuyerScreen history={history} />)
  expect(screen.getByRole('status')).toHaveTextContent('Loading...')
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))

  expect(screen.getByText('60d82fb65ab70e8b14f7fb79')).toBeInTheDocument()
  expect(screen.queryAllByText('2021-06-27').length).toEqual(3)

  expect(screen.getByText('60d82fdf5ab70e8b14f7fb7c')).toBeInTheDocument()
  expect(screen.getByText('2021-04-17')).toBeInTheDocument()

  expect(screen.getByText('60d8303d5ab70e8b14f7fb7e')).toBeInTheDocument()
  expect(screen.getByText('2021-04-30')).toBeInTheDocument()

  expect(screen.getByText('60d8304d5ab70e8b14f7fb80')).toBeInTheDocument()
  expect(screen.getByText('2021-05-15')).toBeInTheDocument()
})

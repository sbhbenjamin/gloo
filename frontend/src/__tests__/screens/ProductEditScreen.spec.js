import React from 'react'
import { rest } from 'msw'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import {
  render,
  renderWithLogin,
  renderWithOwnership,
  screen,
  fireEvent,
} from '../test-utils'
import ProductEditScreen from '../../screens/productEditScreen/ProductEditScreen'
import { waitFor, cleanup } from '@testing-library/react'
import { product } from '../stubs/productStub'
import { createMemoryHistory } from 'history'

export const handlers = [
  rest.get('/api/products/60d55c4cd97a74d6bd80cb22', (req, res, ctx) => {
    return res(ctx.json(product))
  }),

  rest.delete('/api/products/60d55c4cd97a74d6bd80cb22', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Product removed',
      })
    )
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

const match = {
  params: {
    keyword: '',
    pageNumber: 1,
    id: '60d55c4cd97a74d6bd80cb22',
  },
}

it('should redirect if not logged in', async () => {
  render(<ProductEditScreen match={match} history={history} />)

  expect(
    screen.queryByText('Unauthorised Access of Product Edit Page')
  ).toBeNull()
  expect(screen.queryByText('Name')).toBeNull()
  expect(screen.queryByText('Image')).toBeNull()
  expect(screen.queryByText('Update')).toBeNull()
  expect(screen.queryByText('Delete')).toBeNull()

  expect(history.location.pathname).toBe('/')
})

describe('should restrict access if logged in but not owner', () => {
  it('should display error message if logged in, but not owner', async () => {
    renderWithLogin(<ProductEditScreen match={match} history={history} />)

    await waitFor(() => {
      expect(
        screen.queryByText('Unauthorised Access of Product Edit Page')
      ).toBeInTheDocument()
    })
  })
})

describe('it should load, edit and delete successfully for owner', () => {
  it('should render product details from redux store', async () => {
    renderWithOwnership(<ProductEditScreen match={match} history={history} />)

    await waitFor(() => {
      expect(screen.getByTestId('edit-name').value).toBe(
        '1st Solution Electrical'
      )
      expect(screen.getByTestId('edit-image').value).toBe(
        '/images/electrical.jpg'
      )
      expect(screen.getByTestId('edit-description').value).toBe(
        'At 1st Solution, we specialize in electrical repair services and troubleshooting for power trips and power failures. Our professional 24/7 electrical contractors are always at your beck and call to maintain, repair & install your electrical appliances & fix all power issues.'
      )
      expect(screen.getByTestId('edit-category').value).toBe('Electrical')
    })
  })

  it('should delete product successfully', async () => {
    window.confirm = jest.fn(() => true)
    renderWithOwnership(<ProductEditScreen match={match} history={history} />)

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('edit-delete'))
    })

    expect(window.confirm).toBeCalled()

    expect(
      screen.queryByText('1st Solution Electrical')
    ).not.toBeInTheDocument()
  })
})

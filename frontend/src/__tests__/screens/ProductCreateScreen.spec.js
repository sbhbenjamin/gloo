import React from 'react'
import { rest } from 'msw'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { render, renderWithLogin, screen, fireEvent } from '../test-utils'
import ProductCreateScreen from '../../screens/productCreateScreen/ProductCreateScreen'
import { createProductStub } from '../stubs/productStub'
import { createMemoryHistory } from 'history'

export const handlers = [
  rest.post('/api/products/', (req, res, ctx) => {
    return res(ctx.json(createProductStub))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

let history

beforeEach(() => {
  history = createMemoryHistory()
})

it('should redirect user to login screen if not logged in', async () => {
  render(<ProductCreateScreen history={history} />)
  expect(history.location.pathname).toBe('/login')
})

it('form should render if logged in', async () => {
  renderWithLogin(<ProductCreateScreen history={history} />)

  expect(screen.getByText('Create Product')).toBeInTheDocument()
})

it('should create product successfully', async () => {
  const ProductCreate = render(<ProductCreateScreen history={history} />)

  expect(ProductCreate.getByText('Create Product')).toBeInTheDocument()
  fireEvent.change(ProductCreate.getByTestId('product-name'), {
    target: { value: '2nd Solution Electrical' },
  })
  fireEvent.change(ProductCreate.getByTestId('product-image'), {
    target: { value: '/images/electrical.jpg' },
  })
  fireEvent.change(ProductCreate.getByTestId('product-category'), {
    target: { value: 'Electrical' },
  })
  fireEvent.change(ProductCreate.getByTestId('product-description'), {
    target: {
      value:
        'At 1st Solution, we specialize in electrical repair services and troubleshooting for power trips and power failures. Our professional 24/7 electrical contractors are always at your beck and call to maintain, repair & install your electrical appliances & fix all power issues.',
    },
  })
  fireEvent.click(screen.getByTestId('product-submit'))
})

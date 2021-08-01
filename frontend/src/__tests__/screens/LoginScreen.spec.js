import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen } from '../test-utils'
import LoginScreen from '../../screens/loginScreen/LoginScreen'
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import { cleanup } from '@testing-library/react'

export const handlers = [
  rest.post('/api/users/login', (req, res, ctx) => {
    return res(
      ctx.json({
        _id: '60d55c4cd97a74d6bd80cb1f',
        name: 'Admin user',
        email: 'admin@example.com',
        isAdmin: true,
        token: process.env.USER_TOKEN,
      }),
      ctx.delay(150)
    )
  }),
]

let history

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

test('Login successfully redirects user to home page', async () => {
  history = createMemoryHistory()
  const location = {
    search: '',
  }

  render(<LoginScreen location={location} history={history} />)

  const username = screen.getByTestId('login-email')
  fireEvent.change(username, { target: { value: 'john@example.com' } })
  const password = screen.getByTestId('login-password')
  fireEvent.change(password, { target: { value: '123456.com' } })
  const loginBtn = screen.getByTestId('login-btn')
  fireEvent.click(loginBtn)

  expect(history.location.pathname).toBe('/')
})

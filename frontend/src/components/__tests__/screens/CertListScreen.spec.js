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
} from '../test-utils'
import CertListScreen from '../../../screens/CertListScreen'
import { cleanup, waitFor } from '@testing-library/react'
import { allCerts, noCerts } from '../stubs/certStub'
import { createMemoryHistory } from 'history'

// mock props
let history

let server
// mock server
afterEach(() => {
  cleanup()
  server.resetHandlers()
  server.close()
})

it('should not render cert details of user with correct id, title, issuer, date, and status without login', async () => {
  const handlers = [
    // list conversations
    rest.get(`/api/certs`, (req, res, ctx) => {
      return res(ctx.json(allCerts))
    }),
  ]

  server = setupServer(...handlers)
  history = createMemoryHistory()
  server.listen()
  render(<CertListScreen history={history} />)
  expect(screen.getByRole('alert')).toHaveTextContent(
    'You need to be logged in to view this page'
  )

  expect(screen.queryByText('60e3edbb93d34b6444bc9b00')).toBeNull()
  expect(screen.queryByText('Basic Electrical Wirings')).toBeNull()
  expect(screen.queryByText('ABC Org')).toBeNull()
  expect(screen.queryByText('21/03/2012')).toBeNull()
  expect(screen.queryByText('Approved')).toBeNull()

  expect(screen.queryByText('60e671c7c161a060d4e7d493')).toBeNull()
  expect(screen.queryByText('WSQ Commercial Plumbing Course')).toBeNull()
  expect(screen.queryByText('SkillsFuture')).toBeNull()
  expect(screen.queryByText('03/04/2006')).toBeNull()
  expect(screen.queryByText('Pending')).toBeNull()
  expect(history.location.pathname).toBe('/login')
})

it('should not render cert details of user with correct id, title, issuer, date, and status with user login', async () => {
  const handlers = [
    // list conversations
    rest.get(`/api/certs`, (req, res, ctx) => {
      return res(ctx.json(allCerts))
    }),
  ]

  server = setupServer(...handlers)
  history = createMemoryHistory()
  server.listen()
  renderWithLogin(<CertListScreen history={history} />)
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Unauthorised Access of Admin Certificate List Page'
  )

  expect(screen.queryByText('60e3edbb93d34b6444bc9b00')).toBeNull()
  expect(screen.queryByText('Basic Electrical Wirings')).toBeNull()
  expect(screen.queryByText('ABC Org')).toBeNull()
  expect(screen.queryByText('21/03/2012')).toBeNull()
  expect(screen.queryByText('Approved')).toBeNull()

  expect(screen.queryByText('60e671c7c161a060d4e7d493')).toBeNull()
  expect(screen.queryByText('WSQ Commercial Plumbing Course')).toBeNull()
  expect(screen.queryByText('SkillsFuture')).toBeNull()
  expect(screen.queryByText('03/04/2006')).toBeNull()
  expect(screen.queryByText('Pending')).toBeNull()
  expect(history.location.pathname).toBe('/login')
})

it('should render cert screen without any cert details with admin login', async () => {
  const handlers = [
    // list conversations
    rest.get(`/api/certs`, (req, res, ctx) => {
      return res(ctx.json(noCerts))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  history = createMemoryHistory()
  renderWithOwnership(<CertListScreen history={history} />)
  await waitFor(() => {
    expect(screen.getByText('Certificates')).toBeInTheDocument()
    expect(screen.getByText('CERT ID')).toBeInTheDocument()
    expect(screen.getByText('NAME')).toBeInTheDocument()
    expect(screen.getByText('ISSUER')).toBeInTheDocument()
    expect(screen.getByText('DATE OF ATTAINMENT')).toBeInTheDocument()
    expect(screen.getByText('USER')).toBeInTheDocument()
    expect(screen.getByText('STATUS')).toBeInTheDocument()
    expect(screen.getByText('REMOVE')).toBeInTheDocument()

    expect(screen.queryByText('60e3edbb93d34b6444bc9b00')).toBeNull()
    expect(screen.queryByText('Basic Electrical Wirings')).toBeNull()
    expect(screen.queryByText('ABC Org')).toBeNull()
    expect(screen.queryByText('21/03/2012')).toBeNull()
    expect(screen.queryByText('Approved')).toBeNull()

    expect(screen.queryByText('60e671c7c161a060d4e7d493')).toBeNull()
    expect(screen.queryByText('WSQ Commercial Plumbing Course')).toBeNull()
    expect(screen.queryByText('SkillsFuture')).toBeNull()
    expect(screen.queryByText('03/04/2006')).toBeNull()
    expect(screen.queryByText('Pending')).toBeNull()

    expect(
      screen.queryByText('You need to be logged in to view this page')
    ).toBeNull()
  })
})

it('should render cert details of admin with correct id, title, issuer, date, and status with admin login', async () => {
  const handlers = [
    // list conversations
    rest.get(`/api/certs`, (req, res, ctx) => {
      return res(ctx.json(allCerts))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  history = createMemoryHistory()
  renderWithOwnership(<CertListScreen history={history} />)
  await waitFor(() => {
    expect(screen.getByText('Certificates')).toBeInTheDocument()
    expect(screen.getByText('CERT ID')).toBeInTheDocument()
    expect(screen.getByText('NAME')).toBeInTheDocument()
    expect(screen.getByText('ISSUER')).toBeInTheDocument()
    expect(screen.getByText('DATE OF ATTAINMENT')).toBeInTheDocument()
    expect(screen.getByText('USER')).toBeInTheDocument()
    expect(screen.getByText('STATUS')).toBeInTheDocument()
    expect(screen.getByText('REMOVE')).toBeInTheDocument()

    expect(screen.getByText('60e3edbb93d34b6444bc9b00')).toBeInTheDocument()
    expect(screen.getByText('Basic Electrical Wirings')).toBeInTheDocument()
    expect(screen.getByText('ABC Org')).toBeInTheDocument()
    expect(screen.getByText('21/03/2012')).toBeInTheDocument()
    expect(screen.getByText('Approved')).toBeInTheDocument()

    expect(screen.getByText('60e671c7c161a060d4e7d493')).toBeInTheDocument()
    expect(
      screen.getByText('WSQ Commercial Plumbing Course')
    ).toBeInTheDocument()
    expect(screen.getByText('SkillsFuture')).toBeInTheDocument()
    expect(screen.getByText('03/04/2006')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(
      screen.queryByText('You need to be logged in to view this page')
    ).toBeNull()
  })
})

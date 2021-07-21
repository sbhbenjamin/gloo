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
import CertScreen from '../../screens/CertScreen'
import {
  waitForElementToBeRemoved,
  cleanup,
  fireEvent,
} from '@testing-library/react'
import { exampleCert, approvedExampleCert } from '../stubs/certStub'

export const handlers = [
  rest.get('/api/certs/60e671c7c161a060d4e7d493', (req, res, ctx) => {
    return res(ctx.json(exampleCert))
  }),

  rest.put('/api/certs/60e671c7c161a060d4e7d493', (req, res, ctx) => {
    return res(ctx.json(approvedExampleCert))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

const match = {
  params: {
    id: '60e671c7c161a060d4e7d493',
  },
}

const mockPush = jest.fn()
const mockGoBack = jest.fn()

const history = {
  push: mockPush,
  goBack: mockGoBack,
}

it('should render Unauthorised Access message without login', async () => {
  render(<CertScreen match={match} history={history} />)
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Unauthorised Access of Certificate Page'
  )

  expect(screen.queryByTestId('back-btn')).toBeNull()
  expect(screen.queryByTestId('cert-image')).toBeNull()
  expect(screen.queryByTestId('cert-image')).toBeNull()
  expect(screen.queryByTestId('cert-issuer')).toBeNull()

  expect(screen.queryByTestId('cert-date')).toBeNull()
  expect(screen.queryByTestId('cert-status')).toBeNull()

  expect(screen.queryByTestId('cert-edit-btn')).toBeNull()
  expect(screen.queryByTestId('approve-cert')).toBeNull()
  expect(screen.queryByTestId('reject-cert')).toBeNull()
})

it('should render correct details logged in as cert owner', async () => {
  renderWithLogin(<CertScreen match={match} history={history} />)
  expect(screen.getByRole('status')).toHaveTextContent('Loading...')
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))

  expect(screen.getByTestId('back-btn')).toHaveTextContent('Go Back')
  expect(screen.getByTestId('cert-image')).toHaveAttribute(
    'src',
    '/frontend/certUploads/image-1625715141488.jpg'
  )
  expect(screen.getByTestId('cert-image')).toHaveAttribute(
    'alt',
    'WSQ Commercial Plumbing Course'
  )
  expect(screen.getByTestId('cert-issuer')).toHaveTextContent(
    'Issueing Organisation: SkillsFuture'
  )

  expect(screen.getByTestId('cert-date')).toHaveTextContent(
    'Date of Attainment: 03/04/2006'
  )
  expect(screen.getByTestId('cert-status')).toHaveTextContent('Status: Pending')

  expect(screen.getByTestId('cert-edit-btn')).toHaveTextContent(
    'Edit Certificate'
  )

  expect(screen.queryByTestId('approve-cert')).toBeNull()
  expect(screen.queryByTestId('reject-cert')).toBeNull()
})

it('should render correct details logged in as admin', async () => {
  renderWithOwnership(<CertScreen match={match} history={history} />)
  expect(screen.getByRole('status')).toHaveTextContent('Loading...')
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))

  expect(screen.getByTestId('back-btn')).toHaveTextContent('Go Back')
  expect(screen.getByTestId('cert-image')).toHaveAttribute(
    'src',
    '/frontend/certUploads/image-1625715141488.jpg'
  )
  expect(screen.getByTestId('cert-image')).toHaveAttribute(
    'alt',
    'WSQ Commercial Plumbing Course'
  )
  expect(screen.getByTestId('cert-issuer')).toHaveTextContent(
    'Issueing Organisation: SkillsFuture'
  )

  expect(screen.getByTestId('cert-date')).toHaveTextContent(
    'Date of Attainment: 03/04/2006'
  )
  expect(screen.getByTestId('cert-status')).toHaveTextContent('Status: Pending')

  expect(screen.queryByTestId('cert-edit-btn')).toBeNull()
  expect(screen.getByTestId('approve-cert')).toBeInTheDocument()
  expect(screen.getByTestId('reject-cert')).toBeInTheDocument()

  fireEvent.click(screen.getByTestId('approve-cert'))
})

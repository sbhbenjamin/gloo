import React from 'react'
import { rest } from 'msw'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import {
  render,
  renderWithLogin,
  screen,
  fireEvent,
  renderWithOwnership,
} from '../test-utils'
import CertCreateScreen from '../../../screens/CertCreateScreen'
import { createCertStub } from '../stubs/certStub'
import { createMemoryHistory } from 'history'

export const handlers = [
  rest.post('/api/certs', (req, res, ctx) => {
    return res(ctx.json(createCertStub))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
beforeEach(() => (history = createMemoryHistory()))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

let history

it('should redirect user to login screen if not logged in', async () => {
  render(<CertCreateScreen history={history} />)
  expect(screen.getByRole('alert')).toHaveTextContent(
    'You need to be logged in to view this page'
  )
  expect(screen.queryByText('Apply for Certificate')).toBeNull()
  expect(screen.queryByTestId('cert-name')).toBeNull()
  expect(screen.queryByTestId('cert-issuer')).toBeNull()
  expect(screen.queryByTestId('cert-date')).toBeNull()
  expect(screen.queryByTestId('cert-image')).toBeNull()
  expect(screen.queryByTestId('cert-submit')).toBeNull()
  expect(history.location.pathname).toBe('/login')
})

it('form should render if logged in as user', async () => {
  history = createMemoryHistory()
  renderWithLogin(<CertCreateScreen history={history} />)

  expect(screen.getByText('Apply for Certificate')).toBeInTheDocument()
  expect(screen.getByTestId('cert-name')).toBeInTheDocument()
  expect(screen.getByTestId('cert-issuer')).toBeInTheDocument()
  expect(screen.getByTestId('cert-date')).toBeInTheDocument()
  expect(screen.getByTestId('cert-image')).toBeInTheDocument()
  expect(screen.getByTestId('cert-submit')).toBeInTheDocument()
})

it('should create product successfully as user', async () => {
  const CertCreate = renderWithLogin(<CertCreateScreen history={history} />)

  expect(CertCreate.getByText('Apply for Certificate')).toBeInTheDocument()
  fireEvent.change(CertCreate.getByTestId('cert-name'), {
    target: { value: 'WSQ Commercial Plumbing Course' },
  })
  fireEvent.change(CertCreate.getByTestId('cert-issuer'), {
    target: { value: 'SkillsFuture' },
  })
  fireEvent.change(CertCreate.getByTestId('cert-date'), {
    target: { value: '03/04/2006' },
  })

  fireEvent.change(CertCreate.getByTestId('cert-image'), {
    target: { value: '/frontend/certUploads/image-1625715141488.jpg' },
  })

  fireEvent.click(CertCreate.getByTestId('cert-submit'))
})

it('form should render if logged in as admin', async () => {
  renderWithOwnership(<CertCreateScreen history={history} />)

  expect(screen.getByText('Apply for Certificate')).toBeInTheDocument()
  expect(screen.getByTestId('cert-name')).toBeInTheDocument()
  expect(screen.getByTestId('cert-issuer')).toBeInTheDocument()
  expect(screen.getByTestId('cert-date')).toBeInTheDocument()
  expect(screen.getByTestId('cert-image')).toBeInTheDocument()
  expect(screen.getByTestId('cert-submit')).toBeInTheDocument()
})

it('should create product successfully as admin', async () => {
  const CertCreate = renderWithOwnership(<CertCreateScreen history={history} />)

  expect(CertCreate.getByText('Apply for Certificate')).toBeInTheDocument()
  fireEvent.change(CertCreate.getByTestId('cert-name'), {
    target: { value: 'WSQ Commercial Plumbing Course' },
  })
  fireEvent.change(CertCreate.getByTestId('cert-issuer'), {
    target: { value: 'SkillsFuture' },
  })
  fireEvent.change(CertCreate.getByTestId('cert-date'), {
    target: { value: '03/04/2006' },
  })

  fireEvent.change(CertCreate.getByTestId('cert-image'), {
    target: { value: '/frontend/certUploads/image-1625715141488.jpg' },
  })

  fireEvent.click(CertCreate.getByTestId('cert-submit'))
})

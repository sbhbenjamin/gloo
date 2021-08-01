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
import CertEditScreen from '../../screens/certEditScreen/CertEditScreen'
import {
  waitFor,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { exampleCert, editedCert, janeCert } from '../stubs/certStub'
import { createMemoryHistory } from 'history'

export const handlers = [
  rest.get('/api/certs/60e671c7c161a060d4e7d493', (req, res, ctx) => {
    return res(ctx.json(exampleCert))
  }),

  rest.put('/api/certs/60e671c7c161a060d4e7d493', (req, res, ctx) => {
    return res(ctx.json(editedCert))
  }),

  rest.delete('/api/certs/60e671c7c161a060d4e7d493', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Certificate removed',
      })
    )
  }),

  rest.get('/api/certs/60e3edbb93d34b6444bc9b00', (req, res, ctx) => {
    return res(ctx.json(janeCert))
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

const johnMatch = {
  params: {
    id: '60e671c7c161a060d4e7d493',
  },
}

const janeMatch = {
  params: {
    id: '60e3edbb93d34b6444bc9b00',
  },
}

it('should redirect if not logged in', async () => {
  render(<CertEditScreen match={johnMatch} history={history} />)

  expect(screen.getByRole('alert')).toHaveTextContent(
    'Unauthorised Access of Certificate Edit Page'
  )
  expect(screen.queryByText('Apply for Certificate')).toBeNull()
  expect(screen.queryByTestId('cert-name')).toBeNull()
  expect(screen.queryByTestId('cert-issuer')).toBeNull()
  expect(screen.queryByTestId('cert-date')).toBeNull()
  expect(screen.queryByTestId('cert-image')).toBeNull()
  expect(screen.queryByTestId('cert-submit')).toBeNull()

  expect(history.location.pathname).toBe('/')
})

it('should redirect if logged in as user that is not the owner of cert', async () => {
  renderWithLogin(<CertEditScreen match={janeMatch} history={history} />)

  expect(screen.getByRole('status')).toHaveTextContent('Loading...')
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Unauthorised Access of Certificate Edit Page'
  )
  expect(screen.queryByText('Apply for Certificate')).toBeNull()
  expect(screen.queryByTestId('cert-name')).toBeNull()
  expect(screen.queryByTestId('cert-issuer')).toBeNull()
  expect(screen.queryByTestId('cert-date')).toBeNull()
  expect(screen.queryByTestId('cert-image')).toBeNull()
  expect(screen.queryByTestId('cert-submit')).toBeNull()

  expect(history.location.pathname).toBe('/')
})

it('CertEditScreen with details should render if logged in as owner of cert', async () => {
  renderWithLogin(<CertEditScreen match={johnMatch} history={history} />)

  await waitFor(() => {
    expect(screen.getByTestId('cert-name').value).toBe(
      'WSQ Commercial Plumbing Course'
    )
    expect(screen.getByTestId('cert-issuer').value).toBe('SkillsFuture')
    expect(screen.getByTestId('cert-date').value).toBe('03/04/2006')
    expect(screen.getByTestId('cert-image').value).toBe(
      '/frontend/certUploads/image-1625715141488.jpg'
    )
    expect(screen.queryByTestId('approve-cert')).toBeNull()
    expect(screen.queryByTestId('reject-cert')).toBeNull()

    expect(screen.getByText('Edit Certificate')).toBeInTheDocument()
    fireEvent.change(screen.getByTestId('cert-name'), {
      target: { value: 'Plumbing Course' },
    })
    fireEvent.change(screen.getByTestId('cert-issuer'), {
      target: { value: 'ABC Org' },
    })
    fireEvent.change(screen.getByTestId('cert-date'), {
      target: { value: '04/05/2016' },
    })

    fireEvent.change(screen.getByTestId('cert-image'), {
      target: { value: '/frontend/certUploads/image-1625715141488.jpg' },
    })

    fireEvent.click(screen.getByTestId('edit-submit'))
  })
})

it('CertEditScreen with details should not render even if logged in as admin', async () => {
  renderWithOwnership(<CertEditScreen match={johnMatch} history={history} />)

  expect(screen.getByRole('status')).toHaveTextContent('Loading...')
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Unauthorised Access of Certificate Edit Page'
  )
  expect(screen.queryByText('Apply for Certificate')).toBeNull()
  expect(screen.queryByTestId('cert-name')).toBeNull()
  expect(screen.queryByTestId('cert-issuer')).toBeNull()
  expect(screen.queryByTestId('cert-date')).toBeNull()
  expect(screen.queryByTestId('cert-image')).toBeNull()
  expect(screen.queryByTestId('cert-submit')).toBeNull()
})

it('should delete certificate successfully if logged in as owner of certificate', async () => {
  window.confirm = jest.fn(() => true)
  renderWithLogin(<CertEditScreen match={johnMatch} history={history} />)

  await waitFor(() => {
    fireEvent.click(screen.getByTestId('edit-delete'))
  })

  expect(window.confirm).toBeCalled()

  expect(screen.queryByText('60e671c7c161a060d4e7d493')).not.toBeInTheDocument()
})

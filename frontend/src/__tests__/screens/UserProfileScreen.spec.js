import React from 'react'
import { rest } from 'msw'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { render, renderWithLogin, screen } from '../test-utils'
import UserProfileScreen from '../../screens/userProfileScreen/UserProfileScreen'
import { userProducts } from '../stubs/productStub'
import {
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {
  approvedCertList,
  pendingCertList,
  rejectedCertList,
} from '../stubs/certStub'

// mock props
let history

let server
// mock server
afterEach(() => {
  cleanup()
  server.resetHandlers()
  server.close()
})

it('should render products created by created by Admin user when not logged in (admin has no certificates)', async () => {
  const handlers = [
    rest.get('/api/users/60d55c4cd97a74d6bd80cb1f/profile', (req, res, ctx) => {
      //get details from admin user
      return res(
        ctx.json({
          _id: '60d55c4cd97a74d6bd80cb1f',
          name: 'Admin user',
          email: 'admin@example.com',
          isAdmin: true,
          token: process.env.USER_TOKEN,
        })
      )
    }),

    rest.get(
      '/api/users/60d55c4cd97a74d6bd80cb1f/listings',
      (req, res, ctx) => {
        //get listings from admin user
        return res(ctx.json(userProducts))
      }
    ),

    rest.get(`/api/users/60d55c4cd97a74d6bd80cb1f/certs`, (req, res, ctx) => {
      //get certs from admin user
      return res(ctx.json([]))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()
  const match = {
    params: {
      keyword: '',
      pageNumber: 1,
      id: '60d55c4cd97a74d6bd80cb1f', //Admin user id
    },
  }

  render(<UserProfileScreen match={match} />)
  await waitFor(() => {
    expect(screen.queryByTestId('verified-icon')).toBeNull()

    expect(screen.getByText('1st Solution Electrical')).toBeInTheDocument()
    expect(screen.getByText('SIN JIT SENG BUILDING')).toBeInTheDocument()
    expect(
      screen.getByText('24hrs Shadin Air-conditioning')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Plumbing and Sanitary Installation')
    ).toBeInTheDocument()
    expect(screen.getByText('Techbro Computer Services')).toBeInTheDocument()
    expect(screen.getByText('Cardilac Plumbing Services')).toBeInTheDocument()
  })
})

it('should render products created by created by Admin user when logged in as John Doe(admin has no certificates)', async () => {
  const handlers = [
    rest.get('/api/users/60d55c4cd97a74d6bd80cb1f/profile', (req, res, ctx) => {
      //get details from admin user
      return res(
        ctx.json({
          _id: '60d55c4cd97a74d6bd80cb1f',
          name: 'Admin user',
          email: 'admin@example.com',
          isAdmin: true,
          token: process.env.USER_TOKEN,
        })
      )
    }),

    rest.get(
      '/api/users/60d55c4cd97a74d6bd80cb1f/listings',
      (req, res, ctx) => {
        //get listings from admin user
        return res(ctx.json(userProducts))
      }
    ),

    rest.get(`/api/users/60d55c4cd97a74d6bd80cb1f/certs`, (req, res, ctx) => {
      //get certs from admin user
      return res(ctx.json([]))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()
  const match = {
    params: {
      keyword: '',
      pageNumber: 1,
      id: '60d55c4cd97a74d6bd80cb1f', //Admin user id
    },
  }

  renderWithLogin(<UserProfileScreen match={match} />)
  await waitFor(() => {
    expect(screen.queryByTestId('verified-icon')).toBeNull()

    expect(screen.getByText('1st Solution Electrical')).toBeInTheDocument()
    expect(screen.getByText('SIN JIT SENG BUILDING')).toBeInTheDocument()
    expect(
      screen.getByText('24hrs Shadin Air-conditioning')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Plumbing and Sanitary Installation')
    ).toBeInTheDocument()
    expect(screen.getByText('Techbro Computer Services')).toBeInTheDocument()
    expect(screen.getByText('Cardilac Plumbing Services')).toBeInTheDocument()
  })
})

it('should render products created by created by Admin user when logged in as John Doe(admin has pending certificates)', async () => {
  const handlers = [
    rest.get('/api/users/60d55c4cd97a74d6bd80cb1f/profile', (req, res, ctx) => {
      //get details from admin user
      return res(
        ctx.json({
          _id: '60d55c4cd97a74d6bd80cb1f',
          name: 'Admin user',
          email: 'admin@example.com',
          isAdmin: true,
          token: process.env.USER_TOKEN,
        })
      )
    }),

    rest.get(
      '/api/users/60d55c4cd97a74d6bd80cb1f/listings',
      (req, res, ctx) => {
        //get listings from admin user
        return res(ctx.json(userProducts))
      }
    ),

    rest.get(`/api/users/60d55c4cd97a74d6bd80cb1f/certs`, (req, res, ctx) => {
      //get certs from admin user
      return res(ctx.json(pendingCertList))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()
  const match = {
    params: {
      keyword: '',
      pageNumber: 1,
      id: '60d55c4cd97a74d6bd80cb1f', //Admin user id
    },
  }

  renderWithLogin(<UserProfileScreen match={match} />)
  await waitFor(() => {
    expect(screen.queryByTestId('verified-icon')).toBeNull()
    expect(screen.queryByText('WSQ Commercial Plumbing Course')).toBeNull()

    expect(screen.getByText('1st Solution Electrical')).toBeInTheDocument()
    expect(screen.getByText('SIN JIT SENG BUILDING')).toBeInTheDocument()
    expect(
      screen.getByText('24hrs Shadin Air-conditioning')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Plumbing and Sanitary Installation')
    ).toBeInTheDocument()
    expect(screen.getByText('Techbro Computer Services')).toBeInTheDocument()
    expect(screen.getByText('Cardilac Plumbing Services')).toBeInTheDocument()
  })
})

it('should render products created by created by Admin user when logged in as John Doe(admin has rejected certificates)', async () => {
  const handlers = [
    rest.get('/api/users/60d55c4cd97a74d6bd80cb1f/profile', (req, res, ctx) => {
      //get details from admin user
      return res(
        ctx.json({
          _id: '60d55c4cd97a74d6bd80cb1f',
          name: 'Admin user',
          email: 'admin@example.com',
          isAdmin: true,
          token: process.env.USER_TOKEN,
        })
      )
    }),

    rest.get(
      '/api/users/60d55c4cd97a74d6bd80cb1f/listings',
      (req, res, ctx) => {
        //get listings from admin user
        return res(ctx.json(userProducts))
      }
    ),

    rest.get(`/api/users/60d55c4cd97a74d6bd80cb1f/certs`, (req, res, ctx) => {
      //get certs from admin user
      return res(ctx.json(rejectedCertList))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()
  const match = {
    params: {
      keyword: '',
      pageNumber: 1,
      id: '60d55c4cd97a74d6bd80cb1f', //Admin user id
    },
  }

  renderWithLogin(<UserProfileScreen match={match} />)
  await waitFor(() => {
    expect(screen.queryByTestId('verified-icon')).toBeNull()
    expect(screen.queryByText('Basic Plumbing Course')).toBeNull()

    expect(screen.getByText('1st Solution Electrical')).toBeInTheDocument()
    expect(screen.getByText('SIN JIT SENG BUILDING')).toBeInTheDocument()
    expect(
      screen.getByText('24hrs Shadin Air-conditioning')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Plumbing and Sanitary Installation')
    ).toBeInTheDocument()
    expect(screen.getByText('Techbro Computer Services')).toBeInTheDocument()
    expect(screen.getByText('Cardilac Plumbing Services')).toBeInTheDocument()
  })
})

it('should render products created by created by Admin user when logged in as John Doe(admin has approved certificates)', async () => {
  const handlers = [
    rest.get('/api/users/60d55c4cd97a74d6bd80cb1f/profile', (req, res, ctx) => {
      //get details from admin user
      return res(
        ctx.json({
          _id: '60d55c4cd97a74d6bd80cb1f',
          name: 'Admin user',
          email: 'admin@example.com',
          isAdmin: true,
          token: process.env.USER_TOKEN,
        })
      )
    }),

    rest.get(
      '/api/users/60d55c4cd97a74d6bd80cb1f/listings',
      (req, res, ctx) => {
        //get listings from admin user
        return res(ctx.json(userProducts))
      }
    ),

    rest.get(`/api/users/60d55c4cd97a74d6bd80cb1f/certs`, (req, res, ctx) => {
      //get certs from admin user
      return res(ctx.json(approvedCertList))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()
  const match = {
    params: {
      keyword: '',
      pageNumber: 1,
      id: '60d55c4cd97a74d6bd80cb1f', //Admin user id
    },
  }

  renderWithLogin(<UserProfileScreen match={match} />)
  await waitFor(() => {
    expect(screen.getByTestId('verified-icon')).toBeInTheDocument()
    expect(screen.getByText('Basic Plumbing Course')).toBeInTheDocument()
    expect(screen.getByText('Basic Electrical Wirings')).toBeInTheDocument()

    expect(screen.getByText('1st Solution Electrical')).toBeInTheDocument()
    expect(screen.getByText('SIN JIT SENG BUILDING')).toBeInTheDocument()
    expect(
      screen.getByText('24hrs Shadin Air-conditioning')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Plumbing and Sanitary Installation')
    ).toBeInTheDocument()
    expect(screen.getByText('Techbro Computer Services')).toBeInTheDocument()
    expect(screen.getByText('Cardilac Plumbing Services')).toBeInTheDocument()
  })
})

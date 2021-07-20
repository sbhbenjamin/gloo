import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import ChatProduct from '../../chatProduct/ChatProduct'
import { createMemoryHistory } from 'history'
import { cleanup, waitFor } from '@testing-library/react'
import { screen, renderWithLogin, renderWithOwnership } from '../test-utils'
import {
  acceptedOffer,
  currentChat,
  offers,
  orderMatch,
} from '../stubs/chatStub'

// mock props
let history
const setChildError = jest.fn
const setChildInfo = jest.fn

// mock server
let server
afterEach(() => {
  cleanup()
  server.resetHandlers()
  server.close()
})

beforeEach(() => {
  history = createMemoryHistory()
})

it('should render product name, reviews and image', async () => {
  renderWithLogin(
    <ChatProduct
      history={history}
      currentChat={currentChat}
      setChildError={setChildError}
      setChildInfo={setChildInfo}
    />
  )
  const handlers = [
    rest.get('/api/offers/60d55c4cd97a74d6bd80cb20', (_, res, ctx) => {
      return res(ctx.json())
    }),

    rest.get(`/api/orders/60f653ac08c5080004c4eaad`, (_, res, ctx) => {
      return res(ctx.json())
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  await waitFor(() => {
    expect(screen.getByTestId('chat-product-name')).toHaveTextContent(
      '1st Solution Electrical'
    )
    expect(screen.getByTestId('rating-text')).toHaveTextContent('12 reviews')
    expect(screen.getByTestId('chat-product-img')).toHaveAttribute(
      'src',
      '/images/electrical.jpg'
    )
  })
})

it('if no existing offer, should render make offer button', async () => {
  renderWithLogin(
    <ChatProduct
      history={history}
      currentChat={currentChat}
      setChildError={setChildError}
      setChildInfo={setChildInfo}
    />
  )
  const handlers = [
    rest.get('/api/offers/60d55c4cd97a74d6bd80cb20', (_, res, ctx) => {
      return res(ctx.json())
    }),

    rest.get(`/api/orders/60f653ac08c5080004c4eaad`, (_, res, ctx) => {
      return res(ctx.json())
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  await waitFor(() => {
    expect(screen.getByTestId('chat-product-offertoggle')).toBeInTheDocument()
  })
})

it('if offer is made, should render disabled offer made button for initiator', async () => {
  renderWithOwnership(
    <ChatProduct
      history={history}
      currentChat={currentChat}
      setChildError={setChildError}
      setChildInfo={setChildInfo}
    />
  )
  const handlers = [
    rest.get('/api/offers/60d55c4cd97a74d6bd80cb1f', (_, res, ctx) => {
      return res(ctx.json(offers))
    }),

    rest.get(`/api/orders/60f653ac08c5080004c4eaad`, (_, res, ctx) => {
      return res(ctx.json())
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  await waitFor(() => {
    expect(screen.getByTestId('chat-product-offeredbtn')).toBeInTheDocument()
  })
})

it('if offer is made, should render offer accept and reject button for recipient', async () => {
  renderWithLogin(
    <ChatProduct
      history={history}
      currentChat={currentChat}
      setChildError={setChildError}
      setChildInfo={setChildInfo}
    />
  )
  const handlers = [
    rest.get('/api/offers/60d55c4cd97a74d6bd80cb20', (_, res, ctx) => {
      return res(ctx.json(offers))
    }),

    rest.get(`/api/orders/60f653ac08c5080004c4eaad`, (_, res, ctx) => {
      return res(ctx.json())
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  await waitFor(() => {
    expect(screen.getByTestId('chat-product-offerbtn')).toBeInTheDocument()
    expect(screen.getByTestId('chat-product-offerdecline')).toBeInTheDocument()
  })
})

it('if offer is accepted, should render checkout button for buyer', async () => {
  renderWithLogin(
    <ChatProduct
      history={history}
      currentChat={currentChat}
      setChildError={setChildError}
      setChildInfo={setChildInfo}
    />
  )
  const handlers = [
    rest.get('/api/offers/60d55c4cd97a74d6bd80cb20', (_, res, ctx) => {
      return res(ctx.json(acceptedOffer))
    }),

    rest.get(`/api/orders/60f653ac08c5080004c4eaad`, (_, res, ctx) => {
      return res(ctx.json())
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  await waitFor(() => {
    expect(screen.getByTestId('chat-product-checkoutbtn')).toBeInTheDocument()
  })
})

it('if offer is accepted, should render disabled accepted button for seller', async () => {
  renderWithOwnership(
    <ChatProduct
      history={history}
      currentChat={currentChat}
      setChildError={setChildError}
      setChildInfo={setChildInfo}
    />
  )
  const handlers = [
    rest.get('/api/offers/60d55c4cd97a74d6bd80cb1f', (_, res, ctx) => {
      return res(ctx.json(acceptedOffer))
    }),

    rest.get(`/api/orders/60f653ac08c5080004c4eaad`, (_, res, ctx) => {
      return res(ctx.json())
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  await waitFor(() => {
    expect(screen.getByTestId('chat-product-acceptedbtn')).toBeInTheDocument()
  })
})

it('if order has been made, should render view order button for buyer', async () => {
  renderWithLogin(
    <ChatProduct
      history={history}
      currentChat={currentChat}
      setChildError={setChildError}
      setChildInfo={setChildInfo}
    />
  )
  const handlers = [
    rest.get('/api/offers/60d55c4cd97a74d6bd80cb20', (_, res, ctx) => {
      return res(ctx.json(offers))
    }),

    rest.get(`/api/orders/60f653ac08c5080004c4eaad`, (_, res, ctx) => {
      return res(ctx.json(orderMatch))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  await waitFor(() => {
    expect(screen.getByTestId('chat-product-vieworderbtn')).toHaveTextContent(
      'View Order'
    )
  })
})

it('if order has been made, should render view order button for seller', async () => {
  renderWithOwnership(
    <ChatProduct
      history={history}
      currentChat={currentChat}
      setChildError={setChildError}
      setChildInfo={setChildInfo}
    />
  )
  const handlers = [
    rest.get('/api/offers/60d55c4cd97a74d6bd80cb1f', (_, res, ctx) => {
      return res(ctx.json(offers))
    }),

    rest.get(`/api/orders/60f653ac08c5080004c4eaad`, (_, res, ctx) => {
      return res(ctx.json(orderMatch))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  await waitFor(() => {
    expect(screen.getByTestId('chat-product-vieworderbtn')).toHaveTextContent(
      'View Order'
    )
  })
})

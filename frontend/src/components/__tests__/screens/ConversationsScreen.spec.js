import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import ConversationsScreen from '../../../screens/ConversationsScreen'
import { createMemoryHistory } from 'history'
import { cleanup, waitFor } from '@testing-library/react'
import {
  screen,
  render,
  renderWithLogin,
  renderWithConversation,
} from '../test-utils'
import { format } from 'timeago.js'
import {
  currentChat,
  conversationsCreateStub,
  conversationsSelectStub,
} from '../stubs/chatStub'
import { john } from '../stubs/userStub'

// mock props
let history

let server
// mock server
afterEach(() => {
  cleanup()
  server.resetHandlers()
  server.close()
})

it('if not logged in, should redirect user to home screen', async () => {
  history = createMemoryHistory()
  server = setupServer()
  server.listen()

  render(<ConversationsScreen history={history} />)
  expect(history.location.pathname).toBe('/')
})

it('if logged in, should render all conversations that a user has', async () => {
  const handlers = [
    // list conversations
    rest.get(`/api/conversations/${john._id}`, (_, res, ctx) => {
      return res(ctx.json(conversationsSelectStub.initConversations))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  history = createMemoryHistory()

  renderWithLogin(<ConversationsScreen history={history} />)

  await waitFor(() => {
    expect(screen.getByTestId('chat-user-img')).toHaveAttribute(
      'src',
      '/images/electrical.jpg'
    )
    expect(screen.getByTestId('chat-user-name')).toHaveTextContent('Admin user')
  })
})

it('if visited from the navbar, should render without selected chat or messages', async () => {
  const handlers = [
    // list conversations
    rest.get(`/api/conversations/${john._id}`, (_, res, ctx) => {
      return res(ctx.json(conversationsSelectStub.initConversations))
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  history = createMemoryHistory()

  renderWithLogin(<ConversationsScreen history={history} />)

  await waitFor(() => {
    expect(screen.getByTestId('chat-nulltext')).toHaveTextContent(
      'Open a conversation to start a chat.'
    )
  })
})

it('if visited from product page with pre-existing chat, should select chat and show chat history', async () => {
  const { product, initConversations, messages } = conversationsSelectStub
  const handlers = [
    // list conversations
    rest.get(`/api/conversations/${john._id}`, (_, res, ctx) => {
      return res(ctx.json(initConversations))
    }),

    // list messages
    rest.get(`/api/messages/${currentChat._id}`, (_, res, ctx) => {
      return res(ctx.json(messages))
    }),

    // get offers
    rest.get(`/api/offers/${john._id}`, (_, res, ctx) => {
      return res(ctx.json())
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  const history = {
    location: {
      state: {
        product,
      },
    },
    replace: () => {
      history.location.state = {}
    },
  }

  renderWithConversation(<ConversationsScreen history={history} />)

  await waitFor(() => {
    // expect(screen.getByTestId('chat-product')).toBeInTheDocument()
    expect(screen.getByTestId('chat-user-img')).toHaveAttribute(
      'src',
      '/images/electrical.jpg'
    )
    expect(screen.getByTestId('chat-product-name')).toHaveTextContent(
      '1st Solution Electrical'
    )
    expect(screen.getByTestId('chat-product-img')).toHaveAttribute(
      'src',
      '/images/electrical.jpg'
    )
    expect(screen.getByTestId('chat-message-text')).toHaveTextContent(
      'hello from jest'
    )
    expect(screen.getByTestId('chat-message-createdat')).toHaveTextContent(
      `${format(messages[0].createdAt)}`
    )
  })
})

it('if visited from product page without pre-existing chat, should create chat and select it', async () => {
  const {
    product,
    initConversations,
    postCreateConversations,
    createdConversation,
  } = conversationsCreateStub

  const history = {
    location: {
      state: {
        product,
      },
    },
    replace: () => {
      history.location.state = {}
    },
  }

  renderWithLogin(<ConversationsScreen history={history} />)

  let created
  const handlers = [
    // list conversations
    rest.get(`/api/conversations/${john._id}`, (_, res, ctx) => {
      if (created) {
        return res(ctx.json(postCreateConversations))
      } else {
        return res(ctx.json(initConversations))
      }
    }),

    // create conversation
    rest.post('/api/conversations/', (_, res, ctx) => {
      created = true
      return res(ctx.json(createdConversation))
    }),

    // list messages
    rest.get(`/api/messages/${createdConversation._id}`, (_, res, ctx) => {
      return res(ctx.json([]))
    }),

    // get offers
    rest.get(`/api/offers/${john._id}`, (_, res, ctx) => {
      return res(ctx.json())
    }),
  ]

  server = setupServer(...handlers)
  server.listen()

  await waitFor(() => {
    // expect(screen.getByTestId('chat-product')).toBeInTheDocument()
    expect(screen.getByTestId('chat-user-img')).toHaveAttribute(
      'src',
      '/images/home-repair.jpg'
    )
    expect(screen.getByTestId('chat-product-name')).toHaveTextContent(
      'SIN JIT SENG BUILDING'
    )
    expect(screen.getByTestId('chat-product-img')).toHaveAttribute(
      'src',
      '/images/home-repair.jpg'
    )
  })
})

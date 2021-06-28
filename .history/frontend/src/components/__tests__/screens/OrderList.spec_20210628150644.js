import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import {
  render,
  fireEvent,
  screen,
  renderWithLogin,
  renderWithOwnership,
} from "../test-utils"
import OrderListScreen from "../../../screens/OrderListScreen"
import "@testing-library/jest-dom/extend-expect"
import { waitForElementToBeRemoved, cleanup } from "@testing-library/react"
import { sampleOrderArray } from "../stubs/orderStub"

export const handlers = [
  rest.get("/api/orders", (req, res, ctx) => {
    return res(ctx.json(sampleOrderArray))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())
const location = {
  search: "",
}

const pushMock = (arg) => arg

const history = {
  push: pushMock,
}

test("should redirect if not logged in", async () => {
  render(<OrderListScreen location={location} history={history} />)
  expect(screen.getByText("60d82fb65ab70e8b14f7fb79")).toBeInTheDocument()
  expect(screen.getByText("60d82fdf5ab70e8b14f7fb7c")).toBeInTheDocument()
  expect(screen.getByText("60d8303d5ab70e8b14f7fb7e")).toBeInTheDocument()
  expect(screen.getByText("60d8304d5ab70e8b14f7fb80")).toBeInTheDocument()
})

test("should display relevant details if logged in as admin", async () => {
  renderWithOwnership(<OrderListScreen location={location} history={history} />)
  expect(screen.getByText("60d82fb65ab70e8b14f7fb79")).toBeInTheDocument()
  expect(screen.getByText("60d82fdf5ab70e8b14f7fb7c")).toBeInTheDocument()
  expect(screen.getByText("60d8303d5ab70e8b14f7fb7e")).toBeInTheDocument()
  expect(screen.getByText("60d8304d5ab70e8b14f7fb80")).toBeInTheDocument()
})

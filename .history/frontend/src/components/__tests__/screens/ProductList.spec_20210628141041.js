import React from "react"
import { rest } from "msw"
import "@testing-library/jest-dom"
import "@testing-library/jest-dom/extend-expect"
import { setupServer } from "msw/node"
import {
  render,
  renderWithLogin,
  renderWithOwnership,
  screen,
} from "../test-utils"
import ProductListScreen from "../../../screens/ProductListScreen"
import { productList } from "../stubs/productStub"
import { cleanup, waitForElementToBeRemoved } from "@testing-library/react"
import { createMemoryHistory } from "history"

export const handlers = [
  rest.get("/api/products", (req, res, ctx) => {
    return res(ctx.json(productList))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

let history = createMemoryHistory()
const location = {
  search: "",
}

it("should render products when logged in as Admin User", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
    },
  }

  renderWithOwnership(<ProductListScreen history={history} match={match} />)
  expect(screen.getByRole("status")).toHaveTextContent("Loading...")
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))
  expect(screen.getByText("1st Solution Electrical")).toBeInTheDocument()
  expect(screen.getByText("SIN JIT SENG BUILDING")).toBeInTheDocument()
  expect(screen.getByText("24hrs Shadin Air-conditioning")).toBeInTheDocument()
  expect(
    screen.getByText("Plumbing and Sanitary Installation")
  ).toBeInTheDocument()
  expect(screen.getByText("Techbro Computer Services")).toBeInTheDocument()
  expect(screen.getByText("Cardilac Plumbing Services")).toBeInTheDocument()
})

it("should not render products when logged in as Admin User", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
    },
  }

  renderWithLogin(<ProductListScreen history={history} match={match} />)
  expect(screen.getByRole("status")).toHaveTextContent("Loading...")
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))
  expect(screen.getByText("1st Solution Electrical")).toBeInTheDocument()
  expect(screen.getByText("SIN JIT SENG BUILDING")).toBeInTheDocument()
  expect(screen.getByText("24hrs Shadin Air-conditioning")).toBeInTheDocument()
  expect(
    screen.getByText("Plumbing and Sanitary Installation")
  ).toBeInTheDocument()
  expect(screen.getByText("Techbro Computer Services")).toBeInTheDocument()
  expect(screen.getByText("Cardilac Plumbing Services")).toBeInTheDocument()
})

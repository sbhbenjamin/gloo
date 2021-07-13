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
  fireEvent,
} from "../test-utils"
import ProductScreen from "../../../screens/ProductScreen"
import {
  waitFor,
  waitForElementToBeRemoved,
  cleanup,
} from "@testing-library/react"
import { product } from "../stubs/productStub"

export const handlers = [
  rest.get("/api/products/60d55c4cd97a74d6bd80cb22", (req, res, ctx) => {
    return res(ctx.json(product))
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
    keyword: "",
    pageNumber: 1,
    id: "60d55c4cd97a74d6bd80cb22",
  },
}

const mockPush = jest.fn()
const mockGoBack = jest.fn()

const history = {
  push: mockPush,
  goBack: mockGoBack,
}

it("should render product details with correct rating, seller, and image without login", async () => {
  render(<ProductScreen match={match} history={history} />)
  expect(screen.getByRole("status")).toHaveTextContent("Loading...")
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))

  expect(screen.getByTestId("product-name")).toHaveTextContent(
    "1st Solution Electrical"
  )
  expect(screen.getByTestId("product-price")).toHaveTextContent("89.99")
  expect(screen.getByTestId("product-image")).toHaveAttribute(
    "src",
    "/images/electrical.jpg"
  )
  expect(screen.getByTestId("product-seller")).toHaveTextContent("Admin user")

  expect(screen.getByTestId("star-1")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-2")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-3")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-4")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-5")).toHaveClass("fas fa-star-half-alt")

  expect(screen.queryByText("Chat")).toBeNull()
  expect(screen.queryByText("Edit Listing")).toBeNull()
})

it("should render correct details, rating, image, and contain add to cart when logged in", async () => {
  renderWithLogin(<ProductScreen match={match} history={history} />)
  expect(screen.getByRole("status")).toHaveTextContent("Loading...")
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))

  expect(screen.getByTestId("product-name")).toHaveTextContent(
    "1st Solution Electrical"
  )
  expect(screen.getByTestId("product-price")).toHaveTextContent("89.99")
  expect(screen.getByTestId("product-image")).toHaveAttribute(
    "src",
    "/images/electrical.jpg"
  )
  expect(screen.getByTestId("product-seller")).toHaveTextContent("Admin user")

  expect(screen.getByTestId("star-1")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-2")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-3")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-4")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-5")).toHaveClass("fas fa-star-half-alt")

  expect(screen.getByTestId("chat-btn")).toHaveTextContent("Chat")
  expect(screen.queryByText("Edit Listing")).toBeNull()
})

it("should render correct details, rating, image, and contain edit listing when logged in as product owner", async () => {
  renderWithOwnership(<ProductScreen match={match} history={history} />)
  expect(screen.getByRole("status")).toHaveTextContent("Loading...")
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))

  expect(screen.getByTestId("product-name")).toHaveTextContent(
    "1st Solution Electrical"
  )
  expect(screen.getByTestId("product-price")).toHaveTextContent("89.99")
  expect(screen.getByTestId("product-image")).toHaveAttribute(
    "src",
    "/images/electrical.jpg"
  )
  expect(screen.getByTestId("product-seller")).toHaveTextContent("Admin user")

  expect(screen.getByTestId("star-1")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-2")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-3")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-4")).toHaveClass("fas fa-star")
  expect(screen.getByTestId("star-5")).toHaveClass("fas fa-star-half-alt")

  expect(screen.getByTestId("listing-edit-btn")).toHaveTextContent(
    "Edit Listing"
  )
  expect(screen.queryByText("Chat")).toBeNull()
})

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
import RegisterScreen from "../../../screens/RegisterScreen"
import "@testing-library/jest-dom/extend-expect"
import { cleanup } from "@testing-library/react"

export const handlers = [
  rest.post("/api/users", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "Steve Smith",
        email: "steve@example.com",
        password: "123456",
      })
    )
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

test("Register Screen functions as expected for non-logged in users", async () => {
  render(<RegisterScreen location={location} history={history} />)

  //Fill in details of register screen
  const name = screen.getByTestId("register-name")
  fireEvent.change(name, { target: { value: "Steve" } })
  const email = screen.getByTestId("register-email")
  fireEvent.change(email, { target: { value: "steve@example.com" } })
  const password = screen.getByTestId("register-password")
  fireEvent.change(password, { target: { value: "123456" } })
  const confirmPassword = screen.getByTestId("register-confirmpassword")
  fireEvent.change(confirmPassword, { target: { value: "123456" } })
  const registerBtn = screen.getByTestId("register-btn")
  fireEvent.click(registerBtn)
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Name has to be between 6-30 characters long"
  )

  //Change name to be longer than 30 characters
  fireEvent.change(name, {
    target: { value: "Steve Smith Of Heracles The Sixth Son Of Steven Smith" },
  })
  fireEvent.click(registerBtn)
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Name has to be between 6-30 characters long"
  )

  //Change name to be within 6-30 characters (Note that password is still too weak)
  fireEvent.change(name, {
    target: { value: "Steve Smith" },
  })
  fireEvent.click(registerBtn)
  expect(screen.getByRole("alert")).toHaveTextContent("Password is too weak")

  //Change password and confirmPassword to both be strong, but not match
  fireEvent.change(password, { target: { value: "1234567890ab" } })
  fireEvent.change(confirmPassword, { target: { value: "1234567890a" } })
  fireEvent.click(registerBtn)
  expect(screen.getByRole("alert")).toHaveTextContent("Passwords do not match")

  //Change password and confirmPassword to both be strong and match
  fireEvent.change(password, { target: { value: "1234567890a" } })
  fireEvent.change(confirmPassword, { target: { value: "1234567890a" } })
  fireEvent.click(registerBtn)

  expect(screen.getByRole("status")).toBeInTheDocument()
  expect(screen.queryByText("You are already logged in")).toBeNull()
})

test("Register Screen does not show for logged in users (Non-Admin)", async () => {
  renderWithLogin(<RegisterScreen location={location} history={history} />)
  expect(screen.getByRole("alert")).toHaveTextContent(
    "You are already logged in"
  )
})

test("Register Screen does not show for logged in users (Admin)", async () => {
  renderWithOwnership(<RegisterScreen location={location} history={history} />)
  expect(screen.getByRole("alert")).toHaveTextContent(
    "You are already logged in"
  )
})

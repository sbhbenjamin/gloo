import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "../test-utils";
import LoginScreen from "../../../screens/LoginScreen";
import "@testing-library/jest-dom/extend-expect";

export const handlers = [
  rest.post("/api/users/login", (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "60d55c4cd97a74d6bd80cb1f",
        name: "Admin user",
        email: "admin@example.com",
        isAdmin: true,
        token: process.env.USER_TOKEN,
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Loader is displayed after successful login", async () => {
  const location = {
    search: "",
  };

  const pushMock = (arg) => arg;

  const history = {
    push: pushMock,
  };

  render(<LoginScreen location={location} history={history} />);

  const username = screen.getByTestId("login-email");
  fireEvent.change(username, { target: { value: "john@example.com" } });
  const password = screen.getByTestId("login-password");
  fireEvent.change(password, { target: { value: "123456.com" } });
  const loginBtn = screen.getByTestId("login-btn");
  fireEvent.click(loginBtn);

  console.log(screen.getByRole("status"));
  expect(screen.getByRole("status")).toBeInTheDocument();
});

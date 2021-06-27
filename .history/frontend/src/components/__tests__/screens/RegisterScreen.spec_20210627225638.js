import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "../test-utils";
import RegisterScreen from "../../../screens/RegisterScreen";
import "@testing-library/jest-dom/extend-expect";

export const handlers = [
  rest.post("/api/users", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "Steve Smith",
        email: "steve@example.com",
        password: "123456",
      })
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

  render(<RegisterScreen location={location} history={history} />);

  expect(screen.queryByText("Sign Up")).toBeNull();

  //   const username = screen.getByTestId("register-email");
  //   fireEvent.change(username, { target: { value: "john@example.com" } });
  //   const password = screen.getByTestId("login-password");
  //   fireEvent.change(password, { target: { value: "123456.com" } });
  //   const loginBtn = screen.getByTestId("login-btn");
  //   fireEvent.click(loginBtn);

  expect(screen.getByRole("status")).toBeInTheDocument();
});

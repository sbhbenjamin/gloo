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

  const name = screen.getByTestId("register-name");
  fireEvent.change(name, { target: { value: "Steve Smith" } });
  const email = screen.getByTestId("register-email");
  fireEvent.change(email, { target: { value: "steve@example.com" } });
  const password = screen.getByTestId("register-password");
  fireEvent.change(password, { target: { value: "123456" } });
  const confirmPassword = screen.getByTestId("register-confirmpassword");
  fireEvent.change(confirmPassword, { target: { value: "12345" } });
  const registerBtn = screen.getByTestId("register-btn");
  fireEvent.click(registerBtn);

  expect(screen.getByRole("status")).toBeInTheDocument();
});

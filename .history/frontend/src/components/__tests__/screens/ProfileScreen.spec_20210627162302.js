import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, renderWithLogin } from "../test-utils";
import ProfileScreen from "../../../screens/ProfileScreen";
import "@testing-library/jest-dom/extend-expect";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { sampleOrder } from "../stubs/orderStub";

export const handlers = [
  rest.get("/api/users/profile", (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "60d55c4cd97a74d6bd80cb20",
        name: "John Doe",
        email: "john@example.com",
        isAdmin: false,
      })
    );
  }),

  rest.get("/api/orders/myorders", (req, res, ctx) => {
    return res(ctx.json(sampleOrder));
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

  render(<ProfileScreen location={location} history={history} />);
  expect(screen.getByText("Sign In")).toBeInTheDocument();
});

test("Profile page is displayed after successful login", async () => {
  const location = {
    search: "",
  };

  const pushMock = (arg) => arg;

  const history = {
    push: pushMock,
  };

  renderWithLogin(<ProfileScreen location={location} history={history} />);

  const username = screen.getByTestId("update-email");
  await waitForElementToBeRemoved(() => screen.getAllByText(/Loading/i));
  //   fireEvent.change(username, { target: { value: "john@example.com" } });
  //   const password = screen.getByTestId("login-password");
  //   fireEvent.change(password, { target: { value: "123456.com" } });
  //   const loginBtn = screen.getByTestId("login-btn");
  //   fireEvent.click(loginBtn);
  expect(screen.getByText("60d82fb65ab70e8b14f7fb79")).toBeInTheDocument();
  expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();

  //   expect(screen.getByRole("status")).toBeInTheDocument();
});

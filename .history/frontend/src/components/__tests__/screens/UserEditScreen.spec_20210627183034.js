import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  fireEvent,
  screen,
  renderWithLogin,
  renderWithOwnership,
} from "../test-utils";
import UserEditScreen from "../../../screens/UserEditScreen";
import "@testing-library/jest-dom/extend-expect";
import { waitForElementToBeRemoved } from "@testing-library/react";

export const handlers = [
  rest.get("/api/users/60bde864ee22a3fe9466639d", (req, res, ctx) => {
    return res(
      ctx.json({
        isAdmin: true,
        _id: "60bde864ee22a3fe9466639d",
        name: "John Doe",
        email: "john@example.com",
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const match = {
  params: {
    keyword: "",
    pageNumber: 1,
    id: "60bde864ee22a3fe9466639d",
  },
};

const mockPush = jest.fn();
const mockGoBack = jest.fn();

const history = {
  push: mockPush,
  goBack: mockGoBack,
};

it("User details shown if logged in as Admin User", async () => {
  renderWithOwnership(<UserEditScreen match={match} history={history} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
  expect(screen.getByRole("checkbox")).toBeChecked();
});

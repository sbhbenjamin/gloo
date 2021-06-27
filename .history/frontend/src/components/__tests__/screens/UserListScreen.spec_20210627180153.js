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
import UserListScreen from "../../../screens/UserListScreen";
import "@testing-library/jest-dom/extend-expect";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { arrayOfUsers } from "../stubs/userStub";

export const handlers = [
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.json(arrayOfUsers));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const pushMock = (arg) => arg;

const history = {
  push: pushMock,
};

test("should redirect if not logged in", async () => {
  renderWithOwnership(<UserListScreen history={history} />);

  expect(screen.getByText("60bde864ee22a3fe9466639d")).toBeInTheDocument(); //John Doe
  expect(screen.getByText("60bde864ee22a3fe9466639e")).toBeInTheDocument(); //Jane Doe
  expect(screen.getByText("60bde864ee22a3fe9466639c")).toBeInTheDocument(); //Admin
});

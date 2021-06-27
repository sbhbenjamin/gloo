import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
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
        isAdmin: false,
        _id: "60bde864ee22a3fe9466639d",
        name: "John Doe",
        email: "john@example.com",
      })
    );
  }),

  rest.get("/api/users/60bde864ee22a3fe9466639c", (req, res, ctx) => {
    return res(
      ctx.json({
        isAdmin: true,
        _id: "60bde864ee22a3fe9466639c",
        name: "Admin User",
        email: "admin@example.com",
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockPush = jest.fn();
const mockGoBack = jest.fn();

const history = {
  push: mockPush,
  goBack: mockGoBack,
};

// it("User details of John Doe not shown if not logged in as Admin User", async () => {
//   const match = {
//     params: {
//       keyword: "",
//       pageNumber: 1,
//       id: "60bde864ee22a3fe9466639d", //John ID
//     },
//   };
//   render(<UserEditScreen match={match} history={history} />);
//   expect(screen.getByRole("status")).toHaveTextContent("Loading...");
//   await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
//   expect(screen.queryByText("John Doe")).toBeNull();
//   //   expect(screen.queryByText("john@example.com")).toBeNull();
// });

it("User details of John Doe not shown if not logged in", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
      id: "60bde864ee22a3fe9466639d", //John ID
    },
  };
  renderWithLogin(<UserEditScreen match={match} history={history} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(screen.queryByText("John Doe")).toBeNull();
  expect(screen.queryByText("john@example.com")).toBeNull();
});

it("User details of John Doe shown if logged in as Admin User", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
      id: "60bde864ee22a3fe9466639d", //John ID
    },
  };
  renderWithOwnership(<UserEditScreen match={match} history={history} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
  expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
});

it("User details of Admin User shown if logged in as Admin User", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
      id: "60bde864ee22a3fe9466639c", //Admin ID
    },
  };
  renderWithOwnership(<UserEditScreen match={match} history={history} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(screen.getByDisplayValue("Admin User")).toBeInTheDocument();
  expect(screen.getByDisplayValue("admin@example.com")).toBeInTheDocument();
  expect(screen.getByRole("checkbox")).toBeChecked();
});

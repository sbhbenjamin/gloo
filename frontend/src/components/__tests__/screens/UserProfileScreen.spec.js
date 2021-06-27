import React from "react";
import { rest } from "msw";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import {
  render,
  renderWithLogin,
  renderWithOwnership,
  screen,
} from "../test-utils";
import UserProfileScreen from "../../../screens/UserProfileScreen";
import { userProducts } from "../stubs/productStub";
import { waitForElementToBeRemoved } from "@testing-library/react";

export const handlers = [
  rest.get("/api/users/60d55c4cd97a74d6bd80cb1f/profile", (req, res, ctx) => {
    //get details from admin user
    return res(
      ctx.json({
        _id: "60d55c4cd97a74d6bd80cb1f",
        name: "Admin user",
        email: "admin@example.com",
        isAdmin: true,
        token: process.env.USER_TOKEN,
      })
    );
  }),

  rest.get("/api/users/60d55c4cd97a74d6bd80cb1f/listings", (req, res, ctx) => {
    //get listings from admin user
    return res(ctx.json(userProducts));
  }),

  rest.get("/api/users/60d55c4cd97a74d6bd80cb21/profile", (req, res, ctx) => {
    //get details from Jane Doe
    return res(
      ctx.json({
        _id: "60d55c4cd97a74d6bd80cb21",
        name: "Jane Doe",
        email: "jane@example.com",
        isAdmin: false,
        //token: process.env.USER_TOKEN,
      })
    );
  }),

  rest.get("/api/users/60d55c4cd97a74d6bd80cb21/listings", (req, res, ctx) => {
    //get listings from Jane Doe
    return res(ctx.json([]));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should render products created by created by Admin user when not logged in", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
      id: "60d55c4cd97a74d6bd80cb1f", //Admin user id
    },
  };

  render(<UserProfileScreen match={match} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(screen.getByText("1st Solution Electrical")).toBeInTheDocument();
  expect(screen.getByText("SIN JIT SENG BUILDING")).toBeInTheDocument();
  expect(screen.getByText("24hrs Shadin Air-conditioning")).toBeInTheDocument();
  expect(
    screen.getByText("Plumbing and Sanitary Installation")
  ).toBeInTheDocument();
  expect(screen.getByText("Techbro Computer Services")).toBeInTheDocument();
  expect(screen.getByText("Cardilac Plumbing Services")).toBeInTheDocument();
});

it("should render products created by created by Admin user when logged in as John Doe", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
      id: "60d55c4cd97a74d6bd80cb1f", //Admin user id
    },
  };

  renderWithLogin(<UserProfileScreen match={match} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(screen.getByText("1st Solution Electrical")).toBeInTheDocument();
  expect(screen.getByText("SIN JIT SENG BUILDING")).toBeInTheDocument();
  expect(screen.getByText("24hrs Shadin Air-conditioning")).toBeInTheDocument();
  expect(
    screen.getByText("Plumbing and Sanitary Installation")
  ).toBeInTheDocument();
  expect(screen.getByText("Techbro Computer Services")).toBeInTheDocument();
  expect(screen.getByText("Cardilac Plumbing Services")).toBeInTheDocument();
});

it("should render products created by created by Admin user when logged in as Admin", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
      id: "60d55c4cd97a74d6bd80cb1f", //Admin user id
    },
  };

  renderWithOwnership(<UserProfileScreen match={match} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(screen.getByText("1st Solution Electrical")).toBeInTheDocument();
  expect(screen.getByText("SIN JIT SENG BUILDING")).toBeInTheDocument();
  expect(screen.getByText("24hrs Shadin Air-conditioning")).toBeInTheDocument();
  expect(
    screen.getByText("Plumbing and Sanitary Installation")
  ).toBeInTheDocument();
  expect(screen.getByText("Techbro Computer Services")).toBeInTheDocument();
  expect(screen.getByText("Cardilac Plumbing Services")).toBeInTheDocument();
});

it("should display correct message about Jane Doe's listings when viewed by logged in user", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
      id: "60d55c4cd97a74d6bd80cb21", //Jane Doe id
    },
  };

  renderWithLogin(<UserProfileScreen match={match} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(
    screen.getByText("This user does not currently have any listings")
  ).toBeInTheDocument();
});

it("should display correct message about Jane Doe's listings when not logged in", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
      id: "60d55c4cd97a74d6bd80cb21", //Jane Doe id
    },
  };

  render(<UserProfileScreen match={match} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(
    screen.getByText("This user does not currently have any listings")
  ).toBeInTheDocument();
});

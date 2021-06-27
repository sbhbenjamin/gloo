import React from "react";
import { rest } from "msw";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import { render, screen } from "../test-utils";
import UserProfileScreen from "../../../screens/UserProfileScreen";
import { productList } from "../stubs/productStub";
import { waitForElementToBeRemoved } from "@testing-library/react";

export const handlers = [
  rest.get("/api/users/60d55c4cd97a74d6bd80cb1f/listings", (req, res, ctx) => {
    return res(ctx.json(productList));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should render products created by user", async () => {
  const match = {
    params: {
      keyword: "",
      pageNumber: 1,
    },
  };

  render(<UserProfileScreen match={match} />);
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

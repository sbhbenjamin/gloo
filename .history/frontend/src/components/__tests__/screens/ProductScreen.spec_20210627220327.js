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
  fireEvent,
} from "../test-utils";
import ProductScreen from "../../../screens/ProductScreen";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { product } from "../stubs/productStub";

export const handlers = [
  rest.get("/api/products/60d55c4cd97a74d6bd80cb22", (req, res, ctx) => {
    return res(ctx.json(product));
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
    id: "60d55c4cd97a74d6bd80cb22",
  },
};

const mockPush = jest.fn();
const mockGoBack = jest.fn();

const history = {
  push: mockPush,
  goBack: mockGoBack,
};

it("should redirect if not logged in", async () => {
  render(<ProductScreen match={match} history={history} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(screen.getByTestId("product-name")).toHaveTextContent(
    "1st Solution Electrical"
  );
  expect(screen.getByTestId("product-price")).toHaveTextContent("89.99");
  expect(screen.getByTestId("product-image")).toHaveAttribute(
    "src",
    "/images/electrical.jpg"
  );
  expect(screen.queryByText("Add To Cart")).toBeNull();
  expect(screen.queryByText("Edit Listing")).toBeNull();
});

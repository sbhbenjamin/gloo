import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, renderWithLogin } from "../test-utils";
import OrderScreen from "../../../screens/OrderScreen";
import "@testing-library/jest-dom/extend-expect";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { sampleOrder } from "../stubs/orderStub";

export const handlers = [
  rest.get("/api/orders/", (req, res, ctx) => {
    return res(ctx.json(sampleOrder));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
const location = {
  search: "",
};

const pushMock = (arg) => arg;

const history = {
  push: pushMock,
};

test("should redirect if not logged in", async () => {
  render(<OrderScreen location={location} history={history} />);
});

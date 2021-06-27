import React from "react";
import { rest } from "msw";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import { render, renderWithLogin, screen, fireEvent } from "../test-utils";
import ProductCreateScreen from "../../../screens/ProductCreateScreen";
import { waitFor } from "@testing-library/react";
import { createProductStub } from "../stubs/productStub";

export const handlers = [
  rest.post("/api/products/", (req, res, ctx) => {
    return res(ctx.json(createProductStub));
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

it("should render if logged in", async () => {
  render(<ProductCreateScreen history={history} />);

  expect(screen.getByText("Create Product")).toBeInTheDocument();
  fireEvent.change(screen.getByTestId("product-name"), {
    target: { value: "2nd Solution Electrical" },
  });
  fireEvent.change(screen.getByTestId("product-price"), {
    target: { value: 89.99 },
  });
  fireEvent.change(screen.getByTestId("product-image"), {
    target: { value: "/images/electrical.jpg" },
  });
  fireEvent.change(screen.getByTestId("product-category"), {
    target: { value: "Electrical" },
  });
  fireEvent.change(screen.getByTestId("product-description"), {
    target: {
      value:
        "At 1st Solution, we specialize in electrical repair services and troubleshooting for power trips and power failures. Our professional 24/7 electrical contractors are always at your beck and call to maintain, repair & install your electrical appliances & fix all power issues.",
    },
  });
  fireEvent.click(screen.getByTestId("product-submit"));
});

it("should redirect to login page if not logged in", async () => {
  renderWithLogin(<ProductCreateScreen history={history} />);

  // expect redirect to login
});

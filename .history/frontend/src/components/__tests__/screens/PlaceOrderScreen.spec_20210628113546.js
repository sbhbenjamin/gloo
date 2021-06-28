import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, waitFor } from "@testing-library/react";
import {
  render,
  screen,
  renderWithLogin,
  renderWithCart,
  renderWithCartFull,
} from "../test-utils";
import PlaceOrderScreen from "../../../screens/PlaceOrderScreen";
import { createMemoryHistory } from "history";

let history;

beforeEach(() => {
  history = createMemoryHistory();
});

afterEach(cleanup);

it("should redirect user to home screen if not logged in", async () => {
  render(<PlaceOrderScreen history={history} />);
  expect(history.location.pathname).toBe("/login");
});

describe("should restrict access if logged in without items in cart", () => {
  it("should display error message", async () => {
    renderWithLogin(<PlaceOrderScreen history={history} />);

    await waitFor(() => {
      expect(screen.getByText("Order does not exist.")).toBeInTheDocument();
    });
  });
});

describe("should render shipping form with address information", () => {
  it("renders order information from local storage", async () => {
    renderWithCartFull(<PlaceOrderScreen history={history} />);

    await waitFor(() => {
      expect(screen.queryByText("Order does not exist.")).toBeNull();
      expect(
        screen.getByText("11 Main St, Oregon, 110534, USA")
      ).toBeInTheDocument();
      expect(screen.getByTestId("order-paymentmethod")).toHaveTextContent(
        "PayPal"
      );

      expect(screen.getByTestId("order-image")).toHaveAttribute(
        "src",
        "/images/electrical.jpg"
      );

      expect(screen.getByTestId("order-name")).toHaveTextContent(
        "1st Solution Electrical"
      );
      expect(screen.getByTestId("order-price")).toHaveTextContent("89.99");
      expect(screen.getByTestId("order-products-price")).toHaveTextContent(
        "89.99"
      );
      expect(screen.getByTestId("order-shipping-price")).toHaveTextContent(
        "100.00"
      );
      expect(screen.getByTestId("order-tax-price")).toHaveTextContent("13.50");
      expect(screen.getByTestId("order-total-price")).toHaveTextContent(
        "203.49"
      );
      expect(screen.getByTestId("order-submit-btn")).toBeInTheDocument();
    });
  });
  it("renders form with address information from local storage", async () => {
    renderWithCartFull(<PlaceOrderScreen history={history} />);

    await waitFor(() => {
      expect(screen.queryByText("Order does not exist.")).toBeNull();
      expect(screen.getByTestId("shipping-address").value).toBe("11 Main St");
      expect(screen.getByTestId("shipping-city").value).toBe("Oregon");
      expect(screen.getByTestId("shipping-country").value).toBe("USA");
      expect(screen.getByTestId("shipping-postalcode").value).toBe("110534");
    });
  });
});

import React from "react";
import Header from "../Header";
import store from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let header;
beforeEach(() => {
  header = render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
});

test("header renders with correct text", () => {
  const headerEl = header.getByTestId("navbar-brand");
  expect(headerEl.textContent).toBe("Gloo");
});

test("cart renders with correct text", () => {
  const cartEl = header.getByTestId("navbar-cart");
  expect(cartEl.textContent).toBe("Cart");
});

describe("testing cart feature", () => {
  it("cart renders with correct text", () => {
    const cartEl = header.getByTestId("navbar-cart");
    expect(cartEl.textContent).toBe("Cart");
  });
});

test("profile renders with correct text", () => {
  const profileEl = header.getByTestId("navbar-profile");
  expect(profileEl.textContent).toBe("Profile");
});

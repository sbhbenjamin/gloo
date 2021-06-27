import React from "react";
import Header from "../Header";
import store from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header renders with correct text", () => {
  const component = render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
  const headerEl = component.getByTestId("navbar-brand");
  expect(headerEl.textContent).toBe("Gloo");
});

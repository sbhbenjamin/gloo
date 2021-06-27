import React from "react";
import Header from "../Header";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header renders with correct text", () => {
  const component = render(<Header />);
  const headerEl = component.getByTestId("navbar-brand");
  expect(headerEl.textContent).toBe("Gloo");
});

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Product from "../Product";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Product loads correctly", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      userLogin: {
        userInfo: {
          _id: "60d55c4cd97a74d6bd80cb1f",
          name: "Admin user",
          email: "admin@example.com",
          isAdmin: true,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDU1YzRjZDk3YTc0ZDZiZDgwY2IxZiIsImlhdCI6MTYyNDYwODQxNSwiZXhwIjoxNjI3MjAwNDE1fQ.jLddueQAfN_TjOzXyZmoYF0o2iMqZxxjYforbICAXBI",
        },
      },
    });

    const product = {
      rating: 4.5,
      numReviews: 12,
      price: 89.99,
      available: true,
      _id: "60d55c4cd97a74d6bd80cb22",
      name: "1st Solution Electrical",
      image: "/images/electrical.jpg",
      description:
        "At 1st Solution, we specialize in electrical repair services and troubleshooting for power trips and power failures. Our professional 24/7 electrical contractors are always at your beck and call to maintain, repair & install your electrical appliances & fix all power issues.",
      category: "Electrical",
      user: {
        _id: "60d55c4cd97a74d6bd80cb1f",
        name: "Admin user",
      },
      reviews: [],
      __v: 0,
      createdAt: "2021-06-25T04:32:12.368Z",
      updatedAt: "2021-06-25T04:32:12.368Z",
    };

    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <Router>
          <Product product={product} />
        </Router>
      </Provider>
    );
  });

  // it("should render with given state from Redux store", () => {
  //   expect(screen.getByTestId("product-name")).toHaveTextContent(
  //     "1st Solution Electrical"
  //   );
  //   expect(screen.getByTestId("product-price")).toHaveTextContent("89.99");
  //   expect(screen.getByTestId("product-image")).toHaveAttribute(
  //     "src",
  //     "/images/electrical.jpg"
  //   );
  // });
});

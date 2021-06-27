import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  cleanup,
  fireEvent,
  getByTestId,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TestRenderer from "react-test-renderer";
// import store from '../store'
import Header from "../Header";
import configureStore from "redux-mock-store";
import { logout } from "../../actions/userActions";

const mockStore = configureStore([]);

describe("Navbar loads correctly", () => {
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

    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
  });

  afterEach(cleanup);

  it("should render with given state from Redux store", () => {
    const username = component.getByText("Admin user");
    expect(username).toHaveTextContent("Admin user");
  });

  it("should logout on button click", () => {
    const user = component.getByText("Admin user");
    fireEvent.click(user);
    const logoutBtn = component.getByTestId("navbar-logout");
    fireEvent.click(logoutBtn);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(logout.apply);
  });
});

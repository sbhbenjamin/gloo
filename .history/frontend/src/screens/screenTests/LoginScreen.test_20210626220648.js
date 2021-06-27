import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginScreen from "../LoginScreen";
import configureStore from "redux-mock-store";
import { createMemoryHistory } from "history";
import { loginhelper } from "../../actions/userActions";

const mockStore = configureStore([]);

describe("Login Screen loads correctly", () => {
  let store;
  let screen;
  const history = createMemoryHistory();
  const location = new URL("https://gloo-fixr.herokuapp.com/login");

  beforeEach(() => {
    store = mockStore({
      userLogin: {
        userInfo: {
          // _id: "60d55c4cd97a74d6bd80cb1f",
          // name: "Admin user",
          // email: "admin@example.com",
          // isAdmin: true,
          // token:
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDU1YzRjZDk3YTc0ZDZiZDgwY2IxZiIsImlhdCI6MTYyNDYwODQxNSwiZXhwIjoxNjI3MjAwNDE1fQ.jLddueQAfN_TjOzXyZmoYF0o2iMqZxxjYforbICAXBI",
        },
      },
    });
    store.dispatch = jest.fn();

    screen = render(
      <Provider store={store}>
        <Router>
          <LoginScreen location={location} history={history} />
        </Router>
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {
    expect(screen.getByTestId("login-title")).toHaveTextContent("Sign In");

    const emailEl = screen.getByTestId("login-email");
    fireEvent.change(emailEl, {
      target: {
        value: "admin@example.com",
      },
    });

    const passwordEl = screen.getByTestId("login-password");
    fireEvent.change(passwordEl, {
      target: {
        value: "123456",
      },
    });

    expect(emailEl.value).toBe("admin@example.com");
    expect(passwordEl.value).toBe("123456");
  });

  it("should logout on button click", () => {
    const loginBtn = screen.getByTestId("login-btn");
    fireEvent.click(loginBtn);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(loginhelper);
  });
});

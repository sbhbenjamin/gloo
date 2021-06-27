import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productListUserReducer,
} from '../../reducers/productReducers'
import { cartReducer } from '../../reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userDetailsPublicReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userFavouritesReducer,
  getFavouriteReducer,
  favouriteAddReducer,
  favouriteRemoveReducer,
} from '../../reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from '../../reducers/orderReducers'

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productListUser: productListUserReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDetailsPublic: userDetailsPublicReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userFavourites: userFavouritesReducer,
  getFavourite: getFavouriteReducer,
  favouriteAdd: favouriteAddReducer,
  favouriteRemove: favouriteRemoveReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
}

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer,
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

function renderWithLogin(
  ui,
  {
    preloadedState = {
      userLogin: {
        userInfo: {
          _id: '60d55c4cd97a74d6bd80cb20',
          name: 'John Doe',
          email: 'john@example.com',
          isAdmin: false,
          token: process.env.USER_TOKEN,
        },
      },
    },
    store = configureStore({
      reducer,
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

function renderWithOwnership(
  ui,
  {
    preloadedState = {
      userLogin: {
        userInfo: {
          _id: '60d55c4cd97a74d6bd80cb1f',
          name: 'Admin user',
          email: 'admin@example.com',
          isAdmin: true,
          token: process.env.OWNER_TOKEN,
        },
      },
    },
    store = configureStore({
      reducer,
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

function renderWithCartFull(
  ui,
  {
    preloadedState = {
      userLogin: {
        userInfo: {
          _id: '60d55c4cd97a74d6bd80cb1f',
          name: 'Admin user',
          email: 'admin@example.com',
          isAdmin: true,
          token: process.env.OWNER_TOKEN,
        },
      },
      cart: {
        cartItems: [
          {
            image: '/images/electrical.jpg',
            name: '1st Solution Electrical',
            price: 89.99,
            product: '60d55c4cd97a74d6bd80cb22',
            qty: 1,
          },
        ],
        shippingAddress: {
          address: '11 Main St',
          city: 'Oregon',
          country: 'USA',
          postalCode: '110534',
        },
        paymentMethod: 'PayPal',
      },
    },
    store = configureStore({
      reducer,
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

function renderWithCart(
  ui,
  {
    preloadedState = {
      userLogin: {
        userInfo: {
          _id: '60d55c4cd97a74d6bd80cb1f',
          name: 'Admin user',
          email: 'admin@example.com',
          isAdmin: true,
          token: process.env.OWNER_TOKEN,
        },
      },
      cart: {
        cartItems: [
          {
            image: '/images/aircon.jpg',
            name: '24hrs Shadin Air-conditioning',
            price: 929.99,
            product: '60d55c4cd97a74d6bd80cb24',
            qty: 1,
          },
        ],
        shippingAddress: {},
      },
    },
    store = configureStore({
      reducer,
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export {
  render,
  renderWithLogin,
  renderWithOwnership,
  renderWithCartFull,
  renderWithCart,
}

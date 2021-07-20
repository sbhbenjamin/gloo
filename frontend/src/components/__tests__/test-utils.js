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
  favouriteAddReducer,
  favouriteRemoveReducer,
  favouriteProductReducer,
} from '../../reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
  orderDeleteReducer,
  orderSellerReducer,
  orderSellerListMyReducer,
} from '../../reducers/orderReducers'
import {
  certListReducer,
  certDetailsReducer,
  certDeleteReducer,
  certCreateReducer,
  certUpdateReducer,
  certListUserReducer,
} from '../../reducers/certReducers'
import {
  conversationCreateReducer,
  conversationListReducer,
} from '../../reducers/conversationReducers'
import {
  messageCreateReducer,
  messageListReducer,
} from '../../reducers/messageReducers'
import {
  offerAcceptReducer,
  offerCreateReducer,
  offerListReducer,
} from '../../reducers/offerReducers'

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
  favouriteProduct: favouriteProductReducer,
  favouriteAdd: favouriteAddReducer,
  favouriteRemove: favouriteRemoveReducer,
  orderCreate: orderCreateReducer,
  orderDelete: orderDeleteReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderSeller: orderSellerReducer,
  orderSellerListMy: orderSellerListMyReducer,
  certList: certListReducer,
  certDetails: certDetailsReducer,
  certDelete: certDeleteReducer,
  certCreate: certCreateReducer,
  certUpdate: certUpdateReducer,
  certListUser: certListUserReducer,
  conversationList: conversationListReducer,
  conversationCreate: conversationCreateReducer,
  messageList: messageListReducer,
  messageCreate: messageCreateReducer,
  offerCreate: offerCreateReducer,
  offerList: offerListReducer,
  offerAccept: offerAcceptReducer,
}

function render(
  ui,
  {
    preloadedState,
    // = {
    //   userLogin: {
    //     userInfo: {},
    //   },
    // }
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
        offer: {
          orderItem: {
            name: '1st Solution Electrical',
            image: '/images/electrical.jpg',
            product: '60e5370183206d62e2a6e6d0',
          },
          _id: '60f653ac08c5080004c4eaad',
          conversation: '60f653a608c5080004c4eaac',
          sender: '60e5370183206d62e2a6e6ce',
          buyer: '60e5370183206d62e2a6e6ce',
          seller: '60e5370183206d62e2a6e6cd',
          offerPrice: 200,
          offerStatus: 'accepted',
        },
        shippingAddress: {
          address: '11 Main St',
          city: 'Oregon',
          postalCode: '110534',
          country: 'USA',
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
        offer: {
          orderItem: {
            name: '1st Solution Electrical',
            image: '/images/electrical.jpg',
            product: '60e5370183206d62e2a6e6d0',
          },
          _id: '60f653ac08c5080004c4eaad',
          conversation: '60f653a608c5080004c4eaac',
          sender: '60e5370183206d62e2a6e6ce',
          buyer: '60e5370183206d62e2a6e6ce',
          seller: '60e5370183206d62e2a6e6cd',
          offerPrice: 200,
          offerStatus: 'accepted',
        },
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

function renderWithOffer(
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
      offerList: [
        {
          orderItem: {
            name: '1st Solution Electrical',
            image: '/images/electrical.jpg',
            product: '60e5370183206d62e2a6e6d0',
          },
          _id: '60f2cbb065269381686fe9d2',
          conversation: '60f653a608c5080004c4eaac',
          sender: '60e5370183206d62e2a6e6ce',
          buyer: '60e5370183206d62e2a6e6ce',
          seller: '60e5370183206d62e2a6e6cd',
          offerPrice: 200,
          offerStatus: 'pending',
          createdAt: '2021-07-20T04:40:12.838Z',
          updatedAt: '2021-07-20T04:40:30.798Z',
          __v: 0,
        },
        {
          orderItem: {
            name: '1st Solution Electrical',
            image: '/images/electrical.jpg',
            product: '60e5370183206d62e2a6e6d0',
          },
          _id: '60f67f6fc0caa40004a2be52',
          conversation: '60f67f63c0caa40004a2be51',
          sender: '60e5370183206d62e2a6e6cf',
          buyer: '60e5370183206d62e2a6e6cf',
          seller: '60e5370183206d62e2a6e6cd',
          offerPrice: 5000,
          offerStatus: 'accepted',
          createdAt: '2021-07-20T07:46:55.644Z',
          updatedAt: '2021-07-20T07:46:55.644Z',
          __v: 0,
        },
      ],
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
  renderWithOffer,
}

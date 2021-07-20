import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productListUserReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
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
} from './reducers/userReducers'
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
} from './reducers/orderReducers'
import {
  certListReducer,
  certDetailsReducer,
  certDeleteReducer,
  certCreateReducer,
  certUpdateReducer,
  certListUserReducer,
} from './reducers/certReducers'
import {
  conversationCreateReducer,
  conversationListReducer,
} from './reducers/conversationReducers'
import {
  messageCreateReducer,
  messageListReducer,
} from './reducers/messageReducers'
import {
  offerAcceptReducer,
  offerCreateReducer,
  offerListReducer,
} from './reducers/offerReducers'

const reducer = combineReducers({
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
})

const offerFromStorage = localStorage.getItem('offer')
  ? JSON.parse(localStorage.getItem('offer'))
  : null

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    offer: offerFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

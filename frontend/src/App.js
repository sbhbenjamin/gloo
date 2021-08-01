import './styles/index.css'
import './styles/custom.css'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomeScreen from './screens/homeScreen/HomeScreen'
import ProductScreen from './screens/productScreen/ProductScreen'
import LoginScreen from './screens/loginScreen/LoginScreen'
import RegisterScreen from './screens/registerScreen/RegisterScreen'
import UserOrdersScreen from './screens/userOrdersScreen/UserOrdersScreen'
import ShippingScreen from './screens/shippingScreen/ShippingScreen'
import PaymentScreen from './screens/paymentScreen/PaymentScreen'
import PlaceOrderScreen from './screens/placeOrderScreen/PlaceOrderScreen'
import OrderScreen from './screens/orderScreen/OrderScreen'
import OrderListScreen from './screens/orderListScreen/OrderListScreen'
import UserListScreen from './screens/userListScreen/UserListScreen'
import UserEditScreen from './screens/userEditScreen/UserEditScreen'
import UserProfileScreen from './screens/userProfileScreen/UserProfileScreen'
import ProductListScreen from './screens/productListScreen/ProductListScreen'
import ProductEditScreen from './screens/productEditScreen/ProductEditScreen'
import ProductCreateScreen from './screens/productCreateScreen/ProductCreateScreen'
import FavouritesScreen from './screens/favouritesScreen/FavouritesScreen'
import UserCertsScreen from './screens/userCertsScreen/UserCertsScreen'
import CertScreen from './screens/certScreen/CertScreen'
import CertCreateScreen from './screens/certCreateScreen/CertCreateScreen'
import CertEditScreen from './screens/certEditScreen/CertEditScreen'
import CertListScreen from './screens/certListScreen/CertListScreen'
import ConversationScreen from './screens/conversationScreen/ConversationScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='pb-4'>
        <Route path='/search/:keyword' component={HomeScreen} />
        <Route path='/page/:pageNumber' component={HomeScreen} exact />
        <Route
          path='/search/:keyword/page/:pageNumber'
          component={HomeScreen}
          exact
        />
        <Route path='/' component={HomeScreen} exact />
        <Container className='pt-5'>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/orders' component={UserOrdersScreen} />
          <Route path='/favourites' component={FavouritesScreen} />
          <Route path='/conversations' component={ConversationScreen} />
          <Route path='/new' component={ProductCreateScreen} />
          <Route path='/product/:id/edit' exact component={ProductEditScreen} />
          <Route path='/product/:id' exact component={ProductScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/user/:id/listings' component={UserProfileScreen} />
          <Route path='/certificates' component={UserCertsScreen} exact />
          <Route path='/certificates/:id' component={CertScreen} exact />
          <Route path='/newcertificate' component={CertCreateScreen} exact />
          <Route
            path='/certificates/:id/edit'
            component={CertEditScreen}
            exact
          />
          <Route
            path='/admin/certificatelist'
            component={CertListScreen}
            exact
          />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist/' component={OrderListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App

import React from 'react'
import { mount } from '@cypress/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../store'
import Header from './Header'

it('Navbar loads correctly', () => {
  mount(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  )
  cy.contains('ShopJS')
})

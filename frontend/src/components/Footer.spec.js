import React from 'react'
import { mount } from '@cypress/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../store'
import Footer from './Footer'

it('Footer loads correctly', () => {
  mount(
    <Provider store={store}>
      <Router>
        <Footer />
      </Router>
    </Provider>
  )

  cy.contains('Copyright © ShopJS')
})

// <reference types="cypress" />

const URL = 'http://localhost:3000/'
// const URL = 'https://gloo-dev.herokuapp.com/'

const login = (email, password) => {
  cy.visit(URL)
  cy.get('[data-testid=navbar-signin]').click()
  cy.get('[data-testid=login-email]').type(email)
  cy.get('[data-testid=login-password]').type(password)
  cy.get('[data-testid=login-btn]').click()
}

const address = '11 Main St'
const city = 'Oregon'
const postalCode = '344312'
const country = 'USA'
const listingName = '1st Solution Electrical'

describe('should be able to send and receive messages through the chat', () => {
  it('user should be able to start a chat with a seller', () => {
    login('john@example.com', 123456)
    cy.contains(listingName, { timeout: 5000 }).click()
    cy.get('[data-testid=chat-btn]').click()
    cy.get('[data-testid=chat-product-name]')
      .contains(listingName)
      .should('exist')

    cy.get('[data-testid=chatbox]').should('exist')
    cy.get('[data-testid=chat-input]').should('exist')
    cy.get('[data-testid=chat-input]').type('hello from cypress')
    cy.get('[data-testid=chat-send]').click()
  })

  it('user should be able to receive incoming messages', () => {
    login('admin@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('John Doe').click()
    cy.get('[data-testid=chat-product-name]')
      .contains(listingName)
      .should('exist')

    cy.get('[data-testid=chatbox]').should('exist')
    cy.contains('hello from cypress').should('exist')
  })

  it('should not be able to make an offer if null input', () => {
    login('john@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('Admin user').click()
    cy.get('[data-testid=chat-product-offertoggle]').click()
    cy.get('[data-testid=chat-product-offersubmit]').click()
    cy.contains('Offer required').should('exist')
  })

  it('should only be able to input numbers', () => {
    cy.get('[data-testid=chat-product-offerinput]').type('abc')
    cy.get('[data-testid=chat-product-offersubmit]').click()
    cy.contains('Offer required').should('exist')
    cy.get('[data-testid=chat-product-offersubmit]').click()
    cy.get('[data-testid=chat-product-offerinput]').type(1200)
    cy.get('[data-testid=chat-product-offersubmit]').click()
    cy.contains('Offer successfully created').should('exist')
    cy.get('[data-testid=chat-product-offeredbtn]').should('exist')
  })

  it('other user should be able to receive offer', () => {
    login('admin@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('John Doe').click()
    cy.get('[data-testid=chat-product-offerbtn]', {
      timeout: 3000,
    })
      .contains('$1200.00')
      .should('exist')
  })

  it('user should be able to decline offer', () => {
    cy.get('[data-testid=chat-product-offerdecline]').click()
    cy.contains('Offer successfully rejected').should('exist')
    cy.get('[data-testid=chat-product-offertoggle]').should('exist')
    login('john@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('Admin user').click()
    cy.get('[data-testid=chat-product-offertoggle]').should('exist')
  })

  it('user should be able to accept offer and checkout', () => {
    cy.get('[data-testid=chat-product-offertoggle]').click()
    cy.get('[data-testid=chat-product-offerinput]').type(5000)
    cy.get('[data-testid=chat-product-offersubmit]').click()

    login('admin@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('John Doe').click()
    cy.get('[data-testid=chat-product-offerbtn]').contains('$5000.00').click()
    cy.get('[data-testid=chat-product-acceptedbtn]')
      .contains('Accepted')
      .should('exist')
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-logout]').click()

    login('john@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('Admin user').click()

    cy.get('[data-testid=chat-product-checkoutbtn]').should('exist')
  })

  it('shipping validation should work correctly', () => {
    cy.get('[data-testid=chat-product-checkoutbtn]')
      .contains('Proceed to Checkout')
      .click()
    cy.url().should('include', '/shipping')
    // Place order steps works correctly
    cy.get('[data-testid=step-signin] > a.disabled').should('not.exist')
    cy.get('[data-testid=step-shipping] > a.disabled').should('not.exist')
    cy.get('[data-testid=step-payment] > a.active').should('not.exist')
    cy.get('[data-testid=step-placeorder] > a.active').should('not.exist')

    // Shipping form validation works correctly
    cy.get('input:invalid').should('have.length', 4)

    cy.get('[data-testid=shipping-address]').type(address)
    cy.get('[data-testid=shipping-continue-btn]').click()
    cy.get('input:invalid').should('have.length', 3)

    cy.get('[data-testid=shipping-city]').type(city)
    cy.get('[data-testid=shipping-continue-btn]').click()
    cy.get('input:invalid').should('have.length', 2)

    cy.get('[data-testid=shipping-postalcode]').type(postalCode)
    cy.get('[data-testid=shipping-continue-btn]').click()
    cy.get('input:invalid').should('have.length', 1)

    cy.get('[data-testid=shipping-country]').type(country)
    cy.get('input:invalid').should('have.length', 0)

    cy.get('[data-testid=shipping-continue-btn]').click()
  })

  it('payment validation should work correctly', () => {
    cy.url().should('include', '/payment')

    // Place order steps works correctly
    cy.get('[data-testid=step-signin] > a.disabled').should('not.exist')
    cy.get('[data-testid=step-shipping] > a.disabled').should('not.exist')
    cy.get('[data-testid=step-payment] > a.disabled').should('not.exist')
    cy.get('[data-testid=step-placeorder] > a.active').should('not.exist')

    // Payment Validation works correctly
    cy.get('[data-testid=payment-radio]').check()
  })

  it('order details should be correct on order summary', () => {
    cy.get('[data-testid=payment-continue-btn]').click()
    cy.url().should('include', '/placeorder')

    // Place order steps works correctly
    cy.get('[data-testid=step-signin] > a.disabled').should('not.exist')
    cy.get('[data-testid=step-shipping] > a.disabled').should('not.exist')
    cy.get('[data-testid=step-payment] > a.disabled').should('not.exist')
    cy.get('[data-testid=step-placeorder] > a.disabled').should('not.exist')

    // PlaceOrder screen should include correct fields
    cy.contains(address).should('exist')
    cy.contains(city).should('exist')
    cy.contains(postalCode).should('exist')
    cy.contains(country).should('exist')
    cy.contains(listingName).should('exist')

    cy.get('[data-testid=order-submit-btn]').click()

    cy.url().should('include', '/order')

    // PaymentProcess Screen
    cy.contains(address).should('exist')
    cy.contains(city).should('exist')
    cy.contains(postalCode).should('exist')
    cy.contains(country).should('exist')
    cy.contains(listingName).should('exist')
    cy.contains('PayPal')
    cy.contains('Not Delivered')
    cy.contains('Not Paid')
  })

  it('user should be able to navigate to the order via the chat', () => {
    login('john@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('Admin user').click()
    cy.get('[data-testid=chat-product-vieworderbtn]').click()

    // buyer should be able to view order
    cy.contains(address).should('exist')
    cy.contains(city).should('exist')
    cy.contains(postalCode).should('exist')
    cy.contains(country).should('exist')
    cy.contains(listingName).should('exist')
    cy.contains('PayPal')

    cy.contains('Not Delivered')
    cy.contains('Not Paid')

    // seller should be able to view order
    cy.visit(URL)
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-logout]').click()

    login('admin@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('John Doe').click()
    cy.get('[data-testid=chat-product-vieworderbtn]').click()

    cy.contains(address).should('exist')
    cy.contains(city).should('exist')
    cy.contains(postalCode).should('exist')
    cy.contains(country).should('exist')
    cy.contains(listingName).should('exist')
    cy.contains('PayPal')

    cy.contains('Not Delivered')
    cy.contains('Not Paid')
  })

  it('sellers should be able to view the order through the seller orders screen', () => {
    login('admin@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('John Doe').click()
    cy.get('[data-testid=chat-product-vieworderbtn]').click()

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get('[data-testid=order-id]').then(($span) => {
      cy.get('[data-testid=navbar-orders]').click()
      cy.get('[data-testid=sales-btn]').click()
      cy.contains($span.text()).parent().contains('Details').click()
      cy.url().should('include', $span.text())
      cy.contains($span.text()).should('exist')
    })
  })

  it('buyers should be able to view the order through the buyer orders screen', () => {
    login('john@example.com', 123456)
    cy.get('[data-testid=navbar-chat]').click()
    cy.contains('Admin user').click()
    cy.get('[data-testid=chat-product-vieworderbtn]').click()

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get('[data-testid=order-id]').then(($span) => {
      cy.visit(URL) // fix for paypal button causing script error
      cy.get('[data-testid=navbar-orders]').click()
      cy.contains($span.text()).parent().contains('Details').click()
      cy.url().should('include', $span.text())
      cy.contains($span.text()).should('exist')
    })
  })
})

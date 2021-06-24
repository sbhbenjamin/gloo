/// <reference types="cypress" />

describe('order process works correctly', () => {
  beforeEach(() => {
    // cy.visit('https://gloo-fixr.herokuapp.com/')
    // localStorage.setItem('userInfo', USERINFO)
  })

  it('login works correctly', () => {
    cy.get('[data-testid=navbar-signin]').click()
    cy.get('[data-testid=login-email]').type('john@example.com')
    cy.get('[data-testid=login-password]').type('123456')
    cy.get('[data-testid=login-btn]').click()
  })

  it('add to cart works correctly', () => {
    cy.contains('1st Solution Electrical').click()
    cy.get('[data-testid=addtocart-btn]').click()

    // Cart Screen
    cy.contains('Add To Cart').click()
    cy.contains('1st Solution Electrical').should('exist')
    cy.contains('Proceed To Checkout').click()

    // Shipping Screen
    cy.contains('Continue').click()

    // cy.get('[id=address]').type('11 Main St')
    // cy.get('[id=city]').type('Oregon')
    // cy.get('[id=postalCode]').type('42234')
    // cy.get('[id=country]').type('USA')
    // cy.contains('Continue').click()

    // cy.contains('Continue').click()

    // cy.contains('1st Solution Electrical')
  })

  it.only('Shipping form validation works correctly', () => {
    cy.visit('https://gloo-fixr.herokuapp.com/shipping')

    // cy.get('#form-validation').within(() => {
    // at first both input elements are invalid
    cy.get('input:invalid').should('have.length', 4)

    cy.get('[data-testid=shipping-address]').type('11 Main St')
    cy.get('[data-testid=shipping-continue-btn]').click()
    cy.get('input:invalid').should('have.length', 3)

    cy.get('[data-testid=shipping-city]').type('Oregon')
    cy.get('[data-testid=shipping-continue-btn]').click()
    cy.get('input:invalid').should('have.length', 2)

    cy.get('[data-testid=shipping-postalcode]').type('344312')
    cy.get('[data-testid=shipping-continue-btn]').click()
    cy.get('input:invalid').should('have.length', 1)

    cy.get('[data-testid=shipping-country]').type('USA')
    cy.get('input:invalid').should('have.length', 0)

    cy.get('[data-testid=shipping-continue-btn]').click()
  })
})

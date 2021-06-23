/// <reference types="cypress" />

describe('order process works correctly', () => {
  // beforeEach(() => {
  //   // cy.visit('https://gloo-fixr.herokuapp.com/')

  //   localStorage.setItem('userInfo', USERINFO)
  // })

  it('login works correctly', () => {
    cy.contains('Sign In').click()
    cy.get('[id=email]').type('john@example.com')
    cy.get('[id=password]').type('123456')
    cy.get('.btn-primary').click()
  })

  it('add to cart works correctly', () => {
    cy.contains('1st Solution Electrical').click()

    cy.contains('Add To Cart').click()
    cy.contains('1st Solution Electrical').should('exist')
    cy.contains('Proceed To Checkout').click()

    cy.contains('Continue').click()
    cy.get('input:invalid').should('have.length', 1)

    // cy.get('[id=address]').type('11 Main St')
    // cy.get('[id=city]').type('Oregon')
    // cy.get('[id=postalCode]').type('42234')
    // cy.get('[id=country]').type('USA')
    // cy.contains('Continue').click()

    // cy.contains('Continue').click()

    // cy.contains('1st Solution Electrical')
  })

  it.only('check validation message on invalid input', () => {
    cy.visit('https://gloo-fixr.herokuapp.com/shipping')
    cy.get('input:invalid').should('have.length', 0)
    cy.get('[type="submit"]').click()
    cy.get('input:invalid').should('have.length', 1)
    // cy.get('[type="email"]').then(($input) => {
    //   expect($input[0].validationMessage).to.eq('I expect an email!')
    // })
  })
})

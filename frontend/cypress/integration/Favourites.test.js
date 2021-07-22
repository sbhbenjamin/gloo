/* eslint-disable cypress/no-unnecessary-waiting */
before(() => {
  cy.viewport(1280, 720)
  cy.visit('https://gloo-dev.herokuapp.com')
})

describe('Login feature works as expected', () => {
  it('Sign in button can be clicked', () => {
    cy.contains('Sign In').click()
  })

  it('Redirected to Sign In page', () => {
    cy.url().should('include', '/login')
  })

  it('Able to login with correct email and password', () => {
    cy.reload()
    cy.get("[type='email']").type('jane@example.com')
    cy.get("[type='password']").type('123456')
    cy.get('Button').contains('Sign In').click()
    cy.contains('Invalid Email or Password').should('not.exist')
    cy.get('[data-testid=navbar-username]')
      .should('have.text', 'Jane Doe')
      .click()
    cy.contains('Logout').should('exist')
  })
})

describe('Hearts should render upon sign in', () => {
  it('Heart renders for 1st Solution Electrical', () => {
    cy.contains('1st Solution Electrical')
      .parent('div')
      .within(() => {
        cy.get("[class='far fa-heart fa-lg']").should('exist')
      })
  })
  it('Heart renders for SZ Painting', () => {
    cy.contains('SZ Painting')
      .parent('div')
      .within(() => {
        cy.get("[class='far fa-heart fa-lg']").should('exist')
      })
  })
})

describe('Jane Favourites is empty intially', () => {
  it('Go to favourites page', () => {
    cy.get('[data-testid=navbar-favourites]')
      .should('have.text', 'Favourites')
      .click()
  })
  it('Renders No favourites message', () => {
    cy.contains('You do not have any favourite products.').should('exist')
  })

  it('Go back to home page', () => {
    cy.get('[data-testid=navbar-brand]').should('have.text', 'Gloo').click()
  })
})

describe('Favourite some products', () => {
  it('Favourite 1st Solution Electrical', () => {
    cy.contains('1st Solution Electrical')
      .parent('div')
      .within(() => {
        cy.get("[class='far fa-heart fa-lg']").should('exist').click()
      })
    cy.wait(1000)

    cy.contains('1st Solution Electrical')
      .parent('div')
      .within(() => {
        cy.get("[class='far fa-heart fa-lg']").should('not.exist')
      })
    cy.contains('1st Solution Electrical')
      .parent('div')
      .within(() => {
        cy.get("[class='fas fa-heart fa-lg']").should('exist')
      })
  })
  it('Favourite SZ Painting', () => {
    cy.contains('SZ Painting')
      .parent('div')
      .within(() => {
        cy.get("[class='far fa-heart fa-lg']").should('exist').click()
      })

    cy.contains('SZ Painting')
      .parent('div')
      .within(() => {
        cy.get("[class='far fa-heart fa-lg']").should('not.exist')
      })
    cy.contains('SZ Painting')
      .parent('div')
      .within(() => {
        cy.get("[class='fas fa-heart fa-lg']").should('exist')
      })
    cy.wait(1000) //if dont wait, cypress browser will immediately move on to favourites screen and will only load 1st Solution Electrical (even though SZ Painting is already within the UserFavourites state. Only shows SZ Painting on refresh)
  })
})

describe('Jane Favourites contains favourited products', () => {
  it('Go to favourites page', () => {
    cy.get('[data-testid=navbar-favourites]')
      .should('have.text', 'Favourites')
      .click()
    cy.url().should('include', '/favourites')
    cy.wait(1000) // wait for both products to load
  })
  it('Renders favourited products', () => {
    cy.contains('1st Solution Electrical').should('exist')
    cy.contains('1st Solution Electrical')
      .parent('div')
      .within(() => {
        cy.get("[class='fas fa-heart fa-lg']").should('exist')
      })

    cy.contains('SZ Painting').should('exist')
    cy.contains('SZ Painting')
      .parent('div')
      .within(() => {
        cy.get("[class='fas fa-heart fa-lg']").should('exist')
      })
  })

  it('Unfavourite products', () => {
    cy.contains('1st Solution Electrical').should('exist')
    cy.contains('1st Solution Electrical')
      .parent('div')
      .within(() => {
        cy.get("[class='fas fa-heart fa-lg']").should('exist').click()
      })

    cy.contains('SZ Painting').should('exist')
    cy.wait(1000) //when the first object is unfavourited, SZ Painting becomes the only item in favourites and moves to the left. without this wait statement, cypress will click on the original location of the heart, which is now nothing
    cy.contains('SZ Painting')
      .parent('div')
      .within(() => {
        cy.get("[class='fas fa-heart fa-lg']").should('exist').click()
      })
  })

  it('Renders No favourites message', () => {
    cy.contains('You do not have any favourite products.').should('exist')
  })

  it('Go back to home page', () => {
    cy.get('[data-testid=navbar-brand]').should('have.text', 'Gloo').click()
  })
})

describe('Home page should reflect changes due to unfavouriting of items', () => {
  it('1st Solution Electrical no longer favourited', () => {
    cy.contains('1st Solution Electrical')
      .parent('div')
      .within(() => {
        cy.get("[class='far fa-heart fa-lg']").should('exist')
      })
    cy.contains('1st Solution Electrical')
      .parent('div')
      .within(() => {
        cy.get("[class='fas fa-heart fa-lg']").should('not.exist')
      })
  })
  it('SZ Painting no longer favourited', () => {
    cy.contains('SZ Painting')
      .parent('div')
      .within(() => {
        cy.get("[class='far fa-heart fa-lg']").should('exist')
      })
    cy.contains('SZ Painting')
      .parent('div')
      .within(() => {
        cy.get("[class='fas fa-heart fa-lg']").should('not.exist')
      })
  })
})

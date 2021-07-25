/* eslint-disable cypress/no-unnecessary-waiting */
before(() => {
  cy.viewport(1280, 720)
  cy.visit('https://gloo-dev.herokuapp.com/')
  // cy.visit('localhost:3000')
})

//CREATE PRODUCT
describe('Add product feature not available until login', () => {
  it('Add Product does not exist', () => {
    cy.get('[data-testid=navbar-addproduct]').should('not.exist')
  })
})

describe('Login feature works as expected', () => {
  it('Sign in button can be clicked', () => {
    cy.get('[data-testid=navbar-signin]').click()
  })

  it('Redirected to Sign In page', () => {
    cy.url().should('include', '/login')
  })

  it('Able to login with correct email and password', () => {
    cy.reload()
    cy.get('[data-testid=login-email]').type('john@example.com')
    cy.get('[data-testid=login-password]').type('123456')
    cy.get('[data-testid=login-btn]').should('have.text', 'Sign In').click()
    cy.contains('Invalid Email or Password').should('not.exist')
  })
})

describe('Add Product Screen', () => {
  it('Click on Add Product', () => {
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-addproduct]').click({ force: true })
  })

  it('Redirected to correct url', () => {
    cy.url().should('include', '/new')
  })

  it('Create Product Screen renders properly', () => {
    cy.contains('Create Product').should('exist')
  })

  it('Details can be filled into form', () => {
    cy.get('[data-testid=product-name]').type('Add Product Using Image URL')
    cy.get('[data-testid=product-image]').type(
      'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png'
    )
    cy.get('[data-testid=product-category]').type('Test')
    cy.get('[data-testid=product-description]').type(
      'Testing add product using image url'
    )
    cy.get('[data-testid=product-submit]').click()
  })

  it('Redirected to home page', () => {
    cy.url().should('eq', 'https://gloo-dev.herokuapp.com/')
  })
})

describe('View Add Product Using Image URL', () => {
  it('Search for newly created product', () => {
    cy.get('[data-testid=search-input]').type('URL')
    cy.get('[data-testid=search-submit]').click()
    cy.contains('Add Product Using Image URL', { timeout: 8 * 1000 }).click()
  })

  it('Redirected to product page url', () => {
    cy.url().should('include', '/product')
    cy.contains('Add Product Using Image URL').should('exist')
  })

  it('Image should load', () => {
    cy.get("div[class='col-md-6']")
      .find('img', { timeout: 8 * 1000 })
      .should('have.attr', 'alt', 'Add Product Using Image URL')
      .should('be.visible')
  })
})

//EDIT PRODUCT

describe('View My Listings', () => {
  it('Listings button can be clicked', () => {
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-listings]').click()
  })

  it('Go to Product Page of Johns Product', () => {
    cy.contains('Add Product Using Image URL').click()
  })

  it('Click on edit listing', () => {
    cy.get('[data-testid=listing-edit-btn]').click()
  })

  it('redirected to correct url', () => {
    cy.url().should('include', '/edit')
  })

  it('Edit Product Screen renders properly', () => {
    cy.contains('Edit Product').should('exist')
  })
})

describe('Edit Product and check if updated', () => {
  it('Change name of listing', () => {
    cy.get('[data-testid=edit-name]').wait(3000).type(' Edited')
  })

  it('Update', () => {
    cy.get('[data-testid=edit-submit]').click()
  })
})

describe('Redirect to product page', () => {
  it('Redirected to product page', () => {
    cy.url().should('not.include', '/edit')
  })

  it('Product Title Updated', () => {
    cy.contains('Add Product Using Image URL Edited')
  })

  it('Image should load', () => {
    cy.get("div[class='col-md-6']")
      .find('img')
      .should('have.attr', 'alt', 'Add Product Using Image URL Edited')
      .should('be.visible')
  })
})

describe('Check if logged out users are able to view updated title', () => {
  it('Logout', () => {
    cy.get('[data-testid=navbar-username]').click()

    cy.get('[data-testid=navbar-logout]').should('have.text', 'Logout').click()
    cy.reload()
    cy.get('[data-testid=product-name]').should(
      'have.text',
      'Add Product Using Image URL Edited'
    )
  })
})

describe('Check if other logged in users are able to view updated title', () => {
  it('Sign in button can be clicked', () => {
    cy.get('[data-testid=navbar-signin]').click()
  })

  it('Redirected to Sign In page', () => {
    cy.url().should('include', '/login')
  })

  it('Able to login with correct email and password into Jane Account', () => {
    cy.reload()
    cy.get('[data-testid=login-email]').type('jane@example.com')
    cy.get('[data-testid=login-password]').type('123456')
    cy.get('[data-testid=login-btn]').should('have.text', 'Sign In').click()
    cy.contains('Invalid Email or Password').should('not.exist')
    cy.contains('Jane Doe').should('exist')
  })

  it('Search for newly updated product', () => {
    cy.get('[data-testid=search-input]').type('URL')
    cy.get('[data-testid=search-submit]').click()
    cy.contains('Add Product Using Image URL').click()
  })

  it('Jane can view updated title', () => {
    cy.get('[data-testid=product-name]').should(
      'have.text',
      'Add Product Using Image URL Edited'
    )
  })
})

describe('Logout of Jane Account and Login to John Account', () => {
  it('Logout of Jane', () => {
    cy.contains('Jane Doe').should('exist')
    cy.get('[data-testid=navbar-username]').click()

    cy.get('[data-testid=navbar-logout]').should('have.text', 'Logout').click()
  })

  it('Sign in button can be clicked', () => {
    cy.get('[data-testid=navbar-signin]').click()
  })

  it('Redirected to Sign In page', () => {
    cy.url().should('include', '/login')
  })

  it('Login to John', () => {
    cy.get('[data-testid=login-email]').type('john@example.com')
    cy.get('[data-testid=login-password]').type('123456')
    cy.get('[data-testid=login-btn]').should('have.text', 'Sign In').click()
    cy.contains('Invalid Email or Password').should('not.exist')
    cy.get('[data-testid=navbar-username]').click()
  })
})

describe('View Add Product Using Image URL Edited', () => {
  it('Search for newly created product', () => {
    cy.get('[data-testid=search-input]').type('URL')
    cy.get('[data-testid=search-submit]').click()
    cy.contains('Add Product Using Image URL Edited', {
      timeout: 8 * 1000,
    }).click()
  })

  it('Redirected to product page url', () => {
    cy.url().should('include', '/product')
    cy.get('[data-testid=product-name]').should(
      'have.text',
      'Add Product Using Image URL Edited'
    )
  })

  it('Image should load', () => {
    cy.get("div[class='col-md-6']")
      .find('img')
      .should('have.attr', 'alt', 'Add Product Using Image URL Edited')
      .should('be.visible')
  })
})

//DELETE LISTING
describe('Delete listing', () => {
  it('Conditional Rendering of Edit Listing works', () => {
    cy.get('[data-testid=listing-edit-btn]').should('exist').click()
  })

  it('Redirected to edit page url', () => {
    cy.url().should('include', '/edit')
    cy.contains('Edit Product').should('exist')
  })

  it('Delete function should work', () => {
    cy.get('[data-testid=edit-delete]').should('exist').click()
    cy.wait(1000)
  })

  it('redirected to home screen', () => {
    cy.url().should('include', '/')
  })

  it('No results for deleted product', () => {
    cy.get('[data-testid=search-input]').type('URL')
    cy.get('[data-testid=search-submit]').click()
    cy.contains('Add Product Using Image URL').should('not.exist')
  })
})

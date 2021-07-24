/* eslint-disable cypress/no-unnecessary-waiting */
before(() => {
  cy.viewport(1280, 1200)
  cy.visit('https://gloo-dev.herokuapp.com/')
  // cy.visit('localhost:3000')
})

//CREATE CERTIFICATE
describe('Certificates tab not available until login', () => {
  it('Certificates tab does not exist', () => {
    cy.get('[data-testid=navbar-username]').should('not.exist')
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
    cy.get('[data-testid=login-email]').type('jane@example.com')
    cy.get('[data-testid=login-password]').type('123456')
    cy.get('[data-testid=login-btn]').should('have.text', 'Sign In').click()
    cy.contains('Invalid Email or Password').should('not.exist')
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-logout]').should('have.text', 'Logout')
  })
})

describe('Create Certificate Screen', () => {
  it('Click on Certificates', () => {
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-certs]').click({ force: true })
  })

  it('Redirected to correct url', () => {
    cy.url().should('include', '/certificates')
  })

  it('Certificates Screen renders properly', () => {
    cy.contains('Certificates').should('exist')
    cy.get('[data-testid=create-cert-btn]')
      .should('exist')
      .should('have.text', ' Create Certificate')
  })

  it('Click on Create Certificate button', () => {
    cy.get('[data-testid=create-cert-btn]').click()
  })

  it('Redirected to newcertificate url', () => {
    cy.url().should('include', '/newcertificate')
  })

  it('Cert Create Screen renders properly', () => {
    cy.contains('Apply for Certificate').should('exist')
  })

  it('Details can be filled into form', () => {
    cy.get('[data-testid=cert-name]').type('Add Cert Using Image URL')
    cy.get('[data-testid=cert-issuer]').type('SG SkillsFuture')
    cy.get('[data-testid=cert-date]').type('17/07/2021')
    cy.get('[data-testid=cert-image]').type(
      'http://corpkit.com/images/detailed/d_top_stub.jpg'
    )
    cy.get('[data-testid=cert-submit]').click()
  })

  it('Redirected to certificates page', () => {
    cy.url().should('include', '/certificates')
  })
})

describe('View Add Cert Using Image URL', () => {
  it('Click on newly created certificate', () => {
    cy.contains('Add Cert Using Image URL').click()
  })

  it('Redirected to cert page url', () => {
    cy.url().should('include', '/certificates')
    cy.contains('Add Cert Using Image URL').should('exist')
  })

  it('Image should load', () => {
    cy.get('[data-testid=cert-image]')
      .should('have.attr', 'alt', 'Add Cert Using Image URL')
      .should('be.visible')
  })

  it('Correct details load', () => {
    cy.contains('SG SkillsFuture').should('exist')
    cy.contains('17/07/2021').should('exist')
  })
})

//EDIT CERTIFICATE

describe('jane Edit Certificate', () => {
  it('Edit Certificate button can be clicked', () => {
    cy.get('[data-testid=cert-edit-btn]')
      .should('have.text', 'Edit Certificate')
      .click()
  })

  it('redirected to correct url', () => {
    cy.url().should('include', '/certificates')
    cy.url().should('include', '/edit')
  })

  it('Edit Certificate Screen renders properly', () => {
    cy.contains('Edit Certificate').should('exist')
  })
})

describe('Edit Cert and check if updated', () => {
  it('Change name of listing', () => {
    cy.get('[data-testid=cert-name]').wait(1000).type(' Edited')
  })

  it('Option to Approve or Reject certificate is not present', () => {
    cy.get('[data-testid=approve-cert]').should('not.exist')
    cy.get('[data-testid=reject-cert]').should('not.exist')
  })

  it('Update', () => {
    cy.get('[data-testid=edit-submit]').click()
  })
})

describe('Redirect to certificates page', () => {
  it('Redirected to certificates page', () => {
    cy.url().should('not.include', '/edit')
    cy.url().should('include', '/certificates')
  })

  it('Certificate Title Updated', () => {
    cy.contains('Add Cert Using Image URL Edited')
  })
})

describe('Check that logged out users are not able to view certificates screen', () => {
  it('Logout', () => {
    cy.get('[data-testid=navbar-username]').click()

    cy.get('[data-testid=navbar-logout]').should('have.text', 'Logout').click()
  })

  it('Go to login screen', () => {
    cy.get('[data-testid=navbar-signin]').click()
    cy.contains('Add Cert Using Image URL Edited').should('not.exist')
    cy.url().should('include', '/login')

    cy.contains('Sign In').should('exist')
  })
})

describe('Sign in as admin to view and reject the Certificate', () => {
  it('Able to login with correct email and password into Admin Account', () => {
    cy.get('[data-testid=login-email]').type('admin@example.com')
    cy.get('[data-testid=login-password]').type('123456')
    cy.get('[data-testid=login-btn]').should('have.text', 'Sign In').click()
    cy.contains('Invalid Email or Password').should('not.exist')
  })

  it('Go to admin all certificates screen', () => {
    cy.get('[data-testid=admin-menu]').click()
    cy.get('[data-testid=admin-certs]')
      .should('have.text', 'Certificates')
      .click()
  })

  it('Newly created cert should appear', () => {
    cy.url().should('include', '/admin')
    cy.url().should('include', '/certificatelist')
    cy.contains('Add Cert Using Image URL Edited')
  })

  it('Admin able to view certificate screen', () => {
    cy.contains('Add Cert Using Image URL Edited').click()

    cy.url().should('include', '/certificates')
  })

  it('Image should load', () => {
    cy.get('[data-testid=cert-image]')
      .should('have.attr', 'alt', 'Add Cert Using Image URL Edited')
      .should('be.visible')
  })

  it('Correct details load', () => {
    cy.contains('SG SkillsFuture').should('exist')
    cy.contains('17/07/2021').should('exist')
  })

  it('Option to Approve or Reject certificate is present', () => {
    cy.get('[data-testid=approve-cert]').should('exist')
    cy.get('[data-testid=reject-cert]').should('exist').click()
    cy.wait(1000)
  })

  it('redirected to certificates screen', () => {
    cy.url().should('include', '/certificates')
  })
})

describe('Logout of Admin user Account and Login to jane Account to view rejected certificate', () => {
  it('Logout of Admin', () => {
    cy.get('[data-testid=navbar-username]').click()

    cy.get('[data-testid=navbar-logout]').should('have.text', 'Logout').click()
  })

  it('Sign in button can be clicked', () => {
    cy.get('[data-testid=navbar-signin]').click()
  })

  it('Redirected to Sign In page', () => {
    cy.url().should('include', '/login')
  })

  it('Login to jane', () => {
    cy.get('[data-testid=login-email]').type('jane@example.com')
    cy.get('[data-testid=login-password]').type('123456')
    cy.get('[data-testid=login-btn]').should('have.text', 'Sign In').click()
    cy.contains('Invalid Email or Password').should('not.exist')
    cy.get('[data-testid=navbar-username]').click()
  })
})

describe('View update in rejected certificate status', () => {
  it('Click on Certificates', () => {
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-certs]').click({ force: true })
  })

  it('Redirected to correct url', () => {
    cy.url().should('include', '/certificates')
  })

  it('Certificates Screen renders properly', () => {
    cy.contains('Certificates').should('exist')
    cy.get('[data-testid=create-cert-btn]')
      .should('exist')
      .should('have.text', ' Create Certificate')
    cy.contains('Add Cert Using Image URL Edited').should('exist')

    cy.contains('Add Cert Using Image URL Edited')
      .parent('td')
      .parent('tr')
      .within(() => {
        cy.contains('Rejected').should('exist')
      })
  })
})

describe('Certification should not be present in jane listings page', () => {
  it('Click on listings', () => {
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-listings]').click({ force: true })
  })

  it('Properly redirected to listings screen', () => {
    cy.url().should('include', '/listings')
    cy.get('[data-testid=verified-icon]').should('not.exist')
    cy.contains('Add Cert Using Image URL Edited').should('not.exist')
  })
})

describe('Log out of jane account', () => {
  it('Click logout', () => {
    cy.get('[data-testid=navbar-username]').should('exist').click()
    cy.get('[data-testid=navbar-logout]').should('exist').click()
  })

  it('Go to login screen', () => {
    cy.get('[data-testid=navbar-signin]').should('exist').click()
    cy.contains('Add Cert Using Image URL Edited').should('not.exist')
    cy.url().should('include', '/login')

    cy.contains('Sign In').should('exist')
  })
})

describe('Sign in as admin to view and approve the Certificate', () => {
  it('Able to login with correct email and password into Admin Account', () => {
    cy.get('[data-testid=login-email]').type('admin@example.com')
    cy.get('[data-testid=login-password]').type('123456')
    cy.get('[data-testid=login-btn]').should('have.text', 'Sign In').click()
    cy.contains('Invalid Email or Password').should('not.exist')
  })

  it('Go to admin all certificates screen', () => {
    cy.get('[data-testid=admin-menu]').should('have.text', 'Admin').click()
    cy.get('[data-testid=admin-certs]')
      .should('have.text', 'Certificates')
      .click()
  })

  it('Newly created cert should appear', () => {
    cy.url().should('include', '/admin')
    cy.url().should('include', '/certificatelist')
    cy.contains('Add Cert Using Image URL Edited')
  })

  it('Admin able to view certificate screen', () => {
    cy.contains('Add Cert Using Image URL Edited').click()

    cy.url().should('include', '/certificates')
  })

  it('Image should load', () => {
    cy.get('[data-testid=cert-image]')
      .should('have.attr', 'alt', 'Add Cert Using Image URL Edited')
      .should('be.visible')
  })

  it('Correct details load', () => {
    cy.contains('SG SkillsFuture').should('exist')
    cy.contains('17/07/2021').should('exist')
  })

  it('Option to Approve or Reject certificate is present', () => {
    cy.get('[data-testid=approve-cert]').should('exist').click()
    cy.wait(1000)
    cy.get('[data-testid=reject-cert]').should('exist')
  })

  it('redirected to certificates screen', () => {
    cy.url().should('include', '/certificates')
  })
})

describe('Logout of Admin user Account and Login to jane Account to view approved certificate', () => {
  it('Logout of Admin', () => {
    cy.get('[data-testid=navbar-username]').click()

    cy.get('[data-testid=navbar-logout]').should('have.text', 'Logout').click()
  })

  it('Sign in button can be clicked', () => {
    cy.get('[data-testid=navbar-signin]').click()
  })

  it('Redirected to Sign In page', () => {
    cy.url().should('include', '/login')
  })

  it('Login to jane', () => {
    cy.get('[data-testid=login-email]').type('jane@example.com')
    cy.get('[data-testid=login-password]').type('123456')
    cy.get('[data-testid=login-btn]').should('have.text', 'Sign In').click()
    cy.contains('Invalid Email or Password').should('not.exist')
    cy.get('[data-testid=navbar-username]').click()
  })
})

describe('Certification is present in jane listings page', () => {
  it('Go to listings screen', () => {
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-listings]').click({ force: true })
    cy.url().should('include', '/listings')
  })
  it('jane Approved certifications present', () => {
    cy.get('[data-testid=verified-icon]').should('exist')
    cy.contains('Add Cert Using Image URL Edited').should('exist')
  })
})

describe('View update in approved certificate status', () => {
  it('Click on Certificates', () => {
    cy.get('[data-testid=navbar-username]').click()
    cy.get('[data-testid=navbar-certs]').click({ force: true })
  })

  it('Redirected to correct url', () => {
    cy.url().should('include', '/certificates')
  })

  it('Certificates Screen renders properly', () => {
    cy.contains('Certificates').should('exist')
    cy.get('[data-testid=create-cert-btn]')
      .should('exist')
      .should('have.text', ' Create Certificate')
    cy.contains('Add Cert Using Image URL Edited').should('exist')

    cy.contains('Add Cert Using Image URL Edited')
      .parent('td')
      .parent('tr')
      .within(() => {
        cy.contains('Approved').should('exist')
      })
  })
})

describe('View Add Cert Using Image URL Edited', () => {
  it('Click on View Add Cert Using Image URL Edited', () => {
    cy.contains('Add Cert Using Image URL Edited').should('exist').click()
  })

  it('Redirected to cert page url', () => {
    cy.url().should('include', '/certificates')
    cy.contains('Add Cert Using Image URL Edited').should('exist')
  })

  it('Image should load', () => {
    cy.get('[data-testid=cert-image]')
      .should('have.attr', 'alt', 'Add Cert Using Image URL Edited')
      .should('be.visible')
  })

  it('Correct details load', () => {
    cy.contains('SG SkillsFuture').should('exist')
    cy.contains('17/07/2021').should('exist')
  })
})

describe('Edit Approved Certificate', () => {
  it('Edit Certificate button can be clicked', () => {
    cy.get('[data-testid=cert-edit-btn]')
      .should('have.text', 'Edit Certificate')
      .click()
  })

  it('redirected to correct url', () => {
    cy.url().should('include', '/certificates')
    cy.url().should('include', '/edit')
  })

  it('Edit Certificate Screen renders properly', () => {
    cy.contains('Edit Certificate').should('exist')
  })
})

describe('Edit Approved Cert and check if status returns to pending', () => {
  it('Change date of listing', () => {
    cy.get('[data-testid=cert-date]').clear()
    cy.get('[data-testid=cert-date]').type('16/06/2016')
  })

  it('Option to Approve or Reject certificate is not present', () => {
    cy.get('[data-testid=approve-cert]').should('not.exist')
    cy.get('[data-testid=reject-cert]').should('not.exist')
  })

  it('Update', () => {
    cy.get('[data-testid=edit-submit]').click()
  })

  it('redirected to certificates screen', () => {
    cy.url().should('include', '/certificates')
    cy.url().should('not.include', '/edit')
  })
})

describe('Go to Cert Screen', () => {
  it('Click on certificate', () => {
    cy.contains('Add Cert Using Image URL Edited').click()
  })
})

//DELETE LISTING
describe('Delete certificate', () => {
  it('Edit Certificate button can be clicked', () => {
    cy.get('[data-testid=cert-edit-btn]')
      .should('have.text', 'Edit Certificate')
      .click()
  })

  it('redirected to correct url', () => {
    cy.url().should('include', '/certificates')
    cy.url().should('include', '/edit')
  })

  it('Edit Certificate Screen renders properly', () => {
    cy.contains('Edit Certificate').should('exist')
  })

  it('Delete Certificate', () => {
    cy.on('window:confirm', (str) => {
      expect(str).eq('Are you sure?')
    })
    cy.get('[data-testid=edit-delete]').should('exist').click()
  })

  it('redirected to certificates screen', () => {
    cy.url().should('include', '/certificates')
    cy.url().should('not.include', '/edit')
  })

  it('No results for deleted certificate', () => {
    cy.contains('Add Cert Using Image URL Edited').should('not.exist')
  })
})

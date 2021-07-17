/* eslint-disable cypress/no-unnecessary-waiting */
before(() => {
  cy.viewport(1280, 720)
  cy.visit("https://gloo-dev.herokuapp.com/")
})

//CREATE CERTIFICATE
describe("Certificates tab not available until login", () => {
  it("Certificates tab does not exist", () => {
    cy.get("[data-testid=navbar-username]").should("not.exist")
  })
})

describe("Login feature works as expected", () => {
  it("Sign in button can be clicked", () => {
    cy.get("[data-testid=navbar-signin]").click()
  })

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login")
  })

  it("Able to login with correct email and password", () => {
    cy.reload()
    cy.get("[data-testid=login-email]").type("john@example.com")
    cy.get("[data-testid=login-password]").type("123456")
    cy.get("[data-testid=login-btn]").should("have.text", "Sign In").click()
    cy.contains("Invalid Email or Password").should("not.exist")
    cy.get("[data-testid=navbar-username]")
      .should("include.text", "John Doe")
      .click()
    cy.get("[data-testid=navbar-logout]").should("have.text", "Logout")
  })
})

describe("Create Certificate Screen", () => {
  it("Click on Certificates", () => {
    cy.get("[data-testid=navbar-certs]").should("exist").click()
  })

  it("Redirected to correct url", () => {
    cy.url().should("include", "/certificates")
  })

  it("Certificates Screen renders properly", () => {
    cy.contains("Certificates").should("exist")
    cy.get("[data-testid=create-cert-btn]")
      .should("exist")
      .should("have.text", "Create Certificate")
  })

  it("Click on Create Certificate button", () => {
    cy.get("[data-testid=create-cert-btn]").click()
  })

  it("Redirected to newcertificate url", () => {
    cy.url().should("include", "/newcertificate")
  })

  it("Cert Create Screen renders properly", () => {
    cy.contains("Apply for Certificate").should("exist")
  })

  it("Details can be filled into form", () => {
    cy.get("[data-testid=cert-name]").type("Add Cert Using Image URL")
    cy.get("[data-testid=cert-issuer]").type("SG SkillsFuture")
    cy.get("[data-testid=cert-date]").type("17/07/2021")
    cy.get("[data-testid=product-image]").type(
      "http://corpkit.com/images/detailed/d_top_stub.jpg"
    )
    cy.get("[data-testid=cert-submit]").click()
  })

  it("Redirected to certificates page", () => {
    cy.url().should("include", "/certificates")
  })
})

describe("View Add Cert Using Image URL", () => {
  it("Click on newly created certificate", () => {
    cy.contains("Add Cert Using Image URL").click()
  })

  it("Redirected to cert page url", () => {
    cy.url().should("include", "/certificates")
    cy.contains("Add Cert Using Image URL").should("exist")
  })

  it("Image should load", () => {
    cy.get("[data-testid=cert-image]")
      .find("img", { timeout: 8 * 1000 })
      .should("have.attr", "alt", "Add Cert Using Image URL")
      .should("be.visible")
  })

  it("Correct details load", () => {
    cy.contains("SG SkillsFuture").should("exist")
    cy.contains("17/07/2021").should("exist")
  })
})

//EDIT CERTIFICATE

describe("Edit Certificate", () => {
  it("Edit Certificate button can be clicked", () => {
    cy.get("[data-testid=cert-edit-btn]")
      .should("have.text", "Edit Certificate")
      .click()
  })

  it("redirected to correct url", () => {
    cy.url().should("include", "/certificates")
    cy.url().should("include", "/edit")
  })

  it("Edit Certificate Screen renders properly", () => {
    cy.contains("Edit Certificate").should("exist")
  })
})

describe("Edit Product and check if updated", () => {
  it("Change name of listing", () => {
    cy.get("[data-testid=edit-name]").wait(3000).type(" Edited")
  })

  it("Update", () => {
    cy.get("[data-testid=edit-submit]").click()
  })
})

describe("Redirect to product page", () => {
  it("Redirected to product page", () => {
    cy.url().should("not.include", "/edit")
  })

  it("Product Title Updated", () => {
    cy.contains("Add Product Using Image URL Edited")
  })

  it("Image should load", () => {
    cy.get("div[class='col-md-6']")
      .find("img")
      .should("have.attr", "alt", "Add Product Using Image URL Edited")
      .should("be.visible")
  })
})

describe("Check if logged out users are able to view updated title", () => {
  it("Logout", () => {
    cy.get("[data-testid=navbar-username]")
      .should("include.text", "John Doe")
      .click()

    cy.get("[data-testid=navbar-logout]").should("have.text", "Logout").click()
    cy.reload()
    cy.get("[data-testid=product-name]").should(
      "have.text",
      "Add Product Using Image URL Edited"
    )
  })
})

describe("Check if other logged in users are able to view updated title", () => {
  it("Sign in button can be clicked", () => {
    cy.get("[data-testid=navbar-signin]").click()
  })

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login")
  })

  it("Able to login with correct email and password into Jane Account", () => {
    cy.reload()
    cy.get("[data-testid=login-email]").type("jane@example.com")
    cy.get("[data-testid=login-password]").type("123456")
    cy.get("[data-testid=login-btn]").should("have.text", "Sign In").click()
    cy.contains("Invalid Email or Password").should("not.exist")
    cy.get("[data-testid=navbar-username]").should("include.text", "Jane Doe")
  })

  it("Search for newly updated product", () => {
    cy.get("[data-testid=search-input]").type(
      "Add Product Using Image URL Edited"
    )
    cy.get("[data-testid=search-submit]").click()
    cy.contains("Add Product Using Image URL").click()
  })

  it("Jane can view updated title", () => {
    cy.get("[data-testid=product-name]").should(
      "have.text",
      "Add Product Using Image URL Edited"
    )
  })
})

describe("Logout of Jane Account and Login to John Account", () => {
  it("Logout of Jane", () => {
    cy.get("[data-testid=navbar-username]")
      .should("include.text", "Jane Doe")
      .click()

    cy.get("[data-testid=navbar-logout]").should("have.text", "Logout").click()
  })

  it("Sign in button can be clicked", () => {
    cy.get("[data-testid=navbar-signin]").click()
  })

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login")
  })

  it("Login to John", () => {
    cy.get("[data-testid=login-email]").type("john@example.com")
    cy.get("[data-testid=login-password]").type("123456")
    cy.get("[data-testid=login-btn]").should("have.text", "Sign In").click()
    cy.contains("Invalid Email or Password").should("not.exist")
    cy.get("[data-testid=navbar-username]")
      .should("include.text", "John Doe")
      .click()
  })
})

describe("View Add Product Using Image URL Edited", () => {
  it("Search for newly created product", () => {
    // cy.get("[data-testid=search-input]").type(
    //   "Add Product Using Image URL Edited{enter}"
    // );
    cy.get("[data-testid=search-submit]").click()
    cy.contains("Add Product Using Image URL Edited", {
      timeout: 8 * 1000,
    }).click()
  })

  it("Redirected to product page url", () => {
    cy.url().should("include", "/product")
    cy.get("[data-testid=product-name]").should(
      "have.text",
      "Add Product Using Image URL Edited"
    )
  })

  it("Image should load", () => {
    cy.get("div[class='col-md-6']")
      .find("img")
      .should("have.attr", "alt", "Add Product Using Image URL Edited")
      .should("be.visible")
  })
})

//DELETE LISTING
describe("Delete listing", () => {
  it("Conditional Rendering of Edit Listing works", () => {
    cy.get("[data-testid=listing-edit-btn]").should("exist").click()
  })

  it("Redirected to edit page url", () => {
    cy.url().should("include", "/edit")
    cy.contains("Edit Product").should("exist")
  })

  it("Delete function should work", () => {
    cy.get("[data-testid=edit-delete]").should("exist").click()
  })

  it("No results for deleted product", () => {
    cy.get("[data-testid=search-input]").type("Add Product Using Image URL")
    cy.get("[data-testid=search-submit]").click()
    cy.contains("Add Product Using Image URL").should("not.exist")
  })
})

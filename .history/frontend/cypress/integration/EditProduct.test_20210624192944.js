before(() => {
  cy.viewport(1280, 720);
  cy.visit("https://gloo-fixr.herokuapp.com");
});

describe("Login feature works as expected", () => {
  it("Sign in button can be clicked", () => {
    cy.get("[data-testid=navbar-signin]").click();
  });

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login");
  });

  it("Able to login with correct email and password", () => {
    cy.reload();
    cy.get("[data-testid=login-email]").type("john@example.com");
    cy.get("[data-testid=login-password]").type("123456");
    cy.get("[data-testid=login-btn]").should("have.text", "Sign In").click();
    cy.contains("Invalid Email or Password").should("not.exist");
    cy.get("[data-testid=navbar-username]")
      .should("have.text", "John Doe")
      .click();
    cy.get("[data-testid=navbar-profile]").should("have.text", "Profile");
    cy.get("[data-testid=navbar-logout]").should("have.text", "Logout");
  });
});

describe("View My Listings", () => {
  it("My Listings button can be clicked", () => {
    cy.get("[data-testid=navbar-listings]").click();
  });

  it("redirected to correct url", () => {
    cy.url().should("include", "/edit");
  });

  it("Edit Product Screen renders properly", () => {
    cy.contains("Edit Product").should("exist");
  });
});

describe("Edit Product and check if updated", () => {
  it("Change name of listing", () => {
    cy.get("[data-testid=edit-name]").type("Johns Product Edited");
  });

  it("Update", () => {
    cy.get("[data-testid=edit-submit]").click();
  });

  it("Edit Product Screen renders properly", () => {
    cy.contains("Edit Product").should("exist");
  });
});

describe("Redirect to product page", () => {
  it("Redirected to product page", () => {
    cy.url().should("not.include", "/edit");
  });

  it("Product Title Updated", () => {
    cy.contains("Johns Product Edited");
  });

  it("Image should load", () => {
    cy.get("div[class='col-md-6']")
      .find("img")
      .should("have.attr", "alt", "Add Product Using Image URL")
      .should("be.visible");
  });
});

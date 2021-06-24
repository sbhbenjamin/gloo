before(() => {
  cy.viewport(1280, 720);
  cy.visit("https://gloo-fixr.herokuapp.com");
});

describe("Add product feature not available until login", () => {
  it("Add Product does not exist", () => {
    cy.get("[data-testid=navbar-addproduct]").should("not.exist");
  });
});

describe("Login feature works as expected", () => {
  it("Sign in button can be clicked", () => {
    cy.contains("Sign In").click();
  });

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login");
  });

  it("Able to login with correct email and password", () => {
    cy.reload();
    cy.get("[data-testid=login-email]").type("john@example.com");
    cy.get("[data-testid=login-email]").type("123456");
    cy.get("[data-testid=login-btn]").should("have.text", "Sign In").click();
    cy.contains("Invalid Email or Password").should("not.exist");
    cy.contains("John Doe").should("exist").click();
    cy.contains("Profile").should("exist");
    cy.contains("Logout").should("exist");
  });
});

describe("Add Product", () => {
  it("Click on Add Product", () => {
    cy.get("[data-testid=navbar-addproduct]").should("exist").click();
  });

  it("Redirected to correct url", () => {
    cy.url().should("include", "/new");
  });

  it("Create Product Screen renders properly", () => {
    cy.contains("Create Product").should("exist");
  });
});

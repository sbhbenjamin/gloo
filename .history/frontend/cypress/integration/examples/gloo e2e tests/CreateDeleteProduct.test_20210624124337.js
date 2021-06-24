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

describe("Add Product Screen", () => {
  it("Click on Add Product", () => {
    cy.get("[data-testid=navbar-addproduct]").should("exist").click();
  });

  it("Redirected to correct url", () => {
    cy.url().should("include", "/new");
  });

  it("Create Product Screen renders properly", () => {
    cy.contains("Create Product").should("exist");
  });

  it("Details can be filled into form", () => {
    cy.get("[data-testid=product-name]").type("Add Product Using Image URL");
    cy.get("[data-testid=product-price]").type("9.99");
    cy.get("[data-testid=product-image]").type(
      "https://cdn2.vectorstock.com/i/1000x1000/78/51/test-flat-design-icon-isolated-education-vector-3837851.jpg"
    );
    cy.get("[data-testid=product-category]").type("Test");
    cy.get("[data-testid=product-description]").type(
      "Testing add product using image url"
    );
  });
});

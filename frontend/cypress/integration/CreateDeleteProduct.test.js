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
    cy.get("[data-testid=product-submit]").click();
  });

  it("Redirected to home page", () => {
    cy.url().should("eq", "https://gloo-fixr.herokuapp.com/");
  });
});

describe("View Add Product Using Image URL", () => {
  it("Search for newly created product", () => {
    cy.get("[data-testid=search-input]").type("Add Product Using Image URL");
    cy.get("[data-testid=search-submit]").click();
    cy.contains("Add Product Using Image URL").click();
  });

  it("Redirected to product page url", () => {
    cy.url().should("include", "/product");
    cy.contains("Add Product Using Image URL").should("exist");
  });

  it("Image should load", () => {
    cy.get("div[class='col-md-6']")
      .find("img")
      .should("have.attr", "alt", "Add Product Using Image URL")
      .should("be.visible");
  });

  it("Conditional Rendering of Edit Listing works", () => {
    cy.get("[data-testid=listing-edit-btn]").should("exist").click();
  });

  it("Redirected to edit page url", () => {
    cy.url().should("include", "/edit");
    cy.contains("Edit Product").should("exist");
  });

  it("Delete function should work", () => {
    cy.get("[data-testid=edit-delete]").should("exist").click();
  });

  it("No results for deleted product", () => {
    cy.get("[data-testid=search-input]").type("Add Product Using Image URL");
    cy.get("[data-testid=search-submit]").click();
    cy.contains("Add Product Using Image URL").should("not.exist");
  });
});

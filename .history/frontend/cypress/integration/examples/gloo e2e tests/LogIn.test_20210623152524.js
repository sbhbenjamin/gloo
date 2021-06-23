describe("HomeScreen loads correctly with title and sign in button", () => {
  before(() => {
    cy.viewport(1280, 720);
    cy.visit("https://gloo-fixr.herokuapp.com");
  });

  it("Sign in button can be clicked", () => {
    cy.contains("Sign In").click();
  });

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login");
  });

  it("Unable to login without keying in email or password", () => {
    cy.contains("Invalid Email or Password").should("not.exist");
    cy.get("Button").contains("Sign In").click();
    cy.contains("Invalid Email or Password").should("exist");
  });

  it("Unable to login without keying in correct email", () => {
    cy.get("[type='email']").type("john@example.co");
    cy.get("[type='password']").type("123456");
    cy.get("Button").contains("Sign In").click();
    cy.contains("Invalid Email or Password").should("exist");
  });

  it("Unable to login without keying in correct password", () => {
    cy.get("[type='email']").type("john@example.com");
    cy.get("[type='password']").type("12345");
    cy.get("Button").contains("Sign In").click();
    cy.contains("Invalid Email or Password").should("exist");
  });

  it("Able to login with correct email and password", () => {
    cy.get("[type='email']").type("john@example.com");
    cy.get("[type='password']").type("123456");
    cy.get("Button").contains("Sign In").click();
    cy.contains("Invalid Email or Password").should("not.exist");
  });
});
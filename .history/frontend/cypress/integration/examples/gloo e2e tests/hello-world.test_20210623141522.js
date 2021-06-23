///<reference types="cypress" />;

describe("hello", () => {
  it("test one", () => {
    cy.visit("https://gloo-fixr.herokuapp.com");
    cy.contains("Sign In").click().should("have.text", "Sign In");
  });
});

//import { HomeScreenTest } from "./HomeScreen.test.js";

before(() => {
  cy.viewport(1280, 720);
  cy.visit("https://gloo-fixr.herokuapp.com");
});

describe("Logout feature works as expected", () => {
  it("Sign in button can be clicked", () => {
    cy.contains("Sign In").click();
  });

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login");
  });

  it("Able to login with correct email and password", () => {
    cy.reload();
    cy.get("[type='email']").type("john@example.com");
    cy.get("[type='password']").type("123456");
    cy.get("Button").contains("Sign In").click();
    cy.contains("Invalid Email or Password").should("not.exist");
    cy.contains("John Doe").should("exist").click();
    cy.contains("Profile").should("exist");
    cy.contains("Logout").should("exist");
  });

  it("Able to logout", () => {
    cy.contains("Logout").should("exist").click();
  });

  it("HomeScreen rerendered upon logout", () => {
    cy.contains("John Doe").should("not.exist");
  });

  HomeScreenTest();
});

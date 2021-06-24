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
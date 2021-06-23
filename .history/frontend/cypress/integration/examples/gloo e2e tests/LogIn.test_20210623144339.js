describe("HomeScreen loads correctly with title and sign in button", () => {
    before( () => {
      cy.viewport(1280, 720)
      cy.visit("https://gloo-fixr.herokuapp.com");
    })
  
    it("Sign in button can be clicked", () => {
      cy.contains("Sign In").click();
    });
  
    it("Redirected to Sign In page", () => {
      cy.url().should("include", '/login');
    });
  });
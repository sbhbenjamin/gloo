before(() => {
  cy.viewport(1280, 720)
  cy.visit("https://gloo-dev.herokuapp.com")
})

describe("Register new account", () => {
  it("Sign in button can be clicked", () => {
    cy.contains("Sign In").click()
  })

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login")
  })

  it("Click on register", () => {
    cy.get("[data-testid=register-redirect]").should("exist").click()
  })

  it("Redirected to Register page", () => {
    cy.url().should("include", "/register")
  })
})

describe("Input new account details into RegisterScreen", () => {
  it("Name", () => {
    cy.get("[data-testid=register-name]").should("exist").type("Steve Smith")
  })

  it("Email", () => {
    cy.get("[data-testid=register-email]")
      .should("exist")
      .type("john@example.com") //use an email that is already used
  })

  it("Weak Password", () => {
    cy.get("[data-testid=register-password]").should("exist").type("123456")
    cy.get("[class='progress-bar bg-danger progress-bar-striped']").should(
      "exist"
    )
    cy.get("[class='progress-bar bg-warning progress-bar-striped']").should(
      "not.exist"
    )
    cy.get("[class='progress-bar bg-success progress-bar-striped']").should(
      "not.exist"
    )
  })

  it("Confirm Password", () => {
    cy.get("[data-testid=register-confirmpassword]")
      .should("exist")
      .type("12345") //confirm password does not match at first
    cy.get("[data-testid=register-btn]").click()
    cy.get("[role=alert]").should("have.text", "Password is too weak")
  })

  it("Adequate Password", () => {
    cy.get("[data-testid=register-password]").should("exist").type("78")
    cy.get("[class='progress-bar bg-danger progress-bar-striped']").should(
      "exist"
    )
    cy.get("[class='progress-bar bg-warning progress-bar-striped']").should(
      "exist"
    )
    cy.get("[class='progress-bar bg-success progress-bar-striped']").should(
      "not.exist"
    )
  })

  it("Strong Password", () => {
    cy.get("[data-testid=register-password]").should("exist").type("a")
    cy.get("[class='progress-bar bg-danger progress-bar-striped']").should(
      "exist"
    )
    cy.get("[class='progress-bar bg-warning progress-bar-striped']").should(
      "exist"
    )
    cy.get("[class='progress-bar bg-success progress-bar-striped']").should(
      "exist"
    )
  })

  it("Confirm Strong Password", () => {
    cy.get("[data-testid=register-confirmpassword]").should("exist").type("678") //confirm password does not match at first
    cy.get("[data-testid=register-btn]").click()
    cy.get("[role=alert]").should("have.text", "Passwords do not match")
  })

  it("Strong passwords that match", () => {
    cy.get("[data-testid=register-confirmpassword]").should("exist").type("a") //confirm password does not match at first
    cy.get("[data-testid=register-btn]").click()
    cy.contains("User already exists").should("exist")
  })

  it("Use a new email that does not already have an account", () => {
    cy.get("[data-testid=register-email]").clear()
    cy.get("[data-testid=register-email]").type("steve@example.com")
    cy.get("[data-testid=register-btn]").click()
  })

  it("Able to login with correct email and password", () => {
    cy.get("[data-testid=navbar-username]")
      .should("include.text", "Steve Smith")
      .click()
    cy.get("[data-testid=navbar-profile]").should("have.text", "Profile")
    cy.get("[data-testid=navbar-logout]").should("have.text", "Logout")
  })
})

describe("Log out and delete account using Admin user", () => {
  it("Log Out", () => {
    cy.get("[data-testid=navbar-logout]").should("have.text", "Logout").click()
  })

  it("Sign in button can be clicked", () => {
    cy.get("[data-testid=navbar-signin]").click()
  })

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login")
  })

  it("Able to login with correct email and password", () => {
    cy.reload()
    cy.get("[data-testid=login-email]").type("admin@example.com")
    cy.get("[data-testid=login-password]").type("123456")
    cy.get("[data-testid=login-btn]").should("have.text", "Sign In").click()
    cy.contains("Invalid Email or Password").should("not.exist")
    cy.get("[data-testid=navbar-username]")
      .should("include.text", "Admin user")
      .click()
    cy.get("[data-testid=navbar-profile]").should("have.text", "Profile")
    cy.get("[data-testid=navbar-logout]").should("have.text", "Logout")
  })

  it("Go to Users", () => {
    cy.get("[data-testid=admin-menu]").should("exist").click()
    cy.get("[data-testid=admin-users]").should("exist").click()
  })

  it("Delete Steve Smith account", () => {
    cy.on("window:confirm", (str) => {
      expect(str).eq("Are you sure?")
    })
    cy.contains("Steve Smith")
      .parent("tr")
      .within(() => {
        cy.get("[class='fas fa-trash']").click()
      })
  })
})

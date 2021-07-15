/// <reference types="cypress" />

describe("order process works correctly", () => {
  beforeEach(() => {
    cy.visit("https://gloo-dev.herokuapp.com/")
    cy.get("[data-testid=navbar-signin]").click()
    cy.get("[data-testid=login-email]").type("john@example.com")
    cy.get("[data-testid=login-password]").type("123456")
    cy.get("[data-testid=login-btn]").click()
  })

  it("Cannot Proceed to Checkout if cart is empty", () => {
    cy.get("[data-testid=navbar-cart]").click()
    cy.get("[role=alert]").contains("Your cart is empty").should("exist")
    cy.get("[data-testid=cart-checkout-btn]").should("be.disabled")
  })

  it("Order process works correctly", () => {
    const address = "11 Main St"
    const city = "Oregon"
    const postalCode = "344312"
    const country = "USA"
    const listingName = "1st Solution Electrical"

    cy.contains(listingName).click()
    cy.get("[data-testid=addtocart-btn]").click()

    // Cart Screen
    cy.contains("1st Solution Electrical").should("exist")
    cy.contains("Proceed To Checkout").click()

    cy.url().should("include", "/shipping")
    // Place order steps works correctly
    cy.get("[data-testid=step-signin] > a.disabled").should("not.exist")
    cy.get("[data-testid=step-shipping] > a.disabled").should("not.exist")
    cy.get("[data-testid=step-payment] > a.active").should("not.exist")
    cy.get("[data-testid=step-placeorder] > a.active").should("not.exist")

    // Shipping form validation works correctly
    cy.get("input:invalid").should("have.length", 4)

    cy.get("[data-testid=shipping-address]").type(address)
    cy.get("[data-testid=shipping-continue-btn]").click()
    cy.get("input:invalid").should("have.length", 3)

    cy.get("[data-testid=shipping-city]").type(city)
    cy.get("[data-testid=shipping-continue-btn]").click()
    cy.get("input:invalid").should("have.length", 2)

    cy.get("[data-testid=shipping-postalcode]").type(postalCode)
    cy.get("[data-testid=shipping-continue-btn]").click()
    cy.get("input:invalid").should("have.length", 1)

    cy.get("[data-testid=shipping-country]").type(country)
    cy.get("input:invalid").should("have.length", 0)

    cy.get("[data-testid=shipping-continue-btn]").click()

    cy.url().should("include", "/payment")

    // Place order steps works correctly
    cy.get("[data-testid=step-signin] > a.disabled").should("not.exist")
    cy.get("[data-testid=step-shipping] > a.disabled").should("not.exist")
    cy.get("[data-testid=step-payment] > a.disabled").should("not.exist")
    cy.get("[data-testid=step-placeorder] > a.active").should("not.exist")

    // Payment Validation works correctly
    cy.get("[data-testid=payment-radio]").check()
    cy.get("[data-testid=payment-continue-btn]").click()

    cy.url().should("include", "/placeorder")

    // Place order steps works correctly
    cy.get("[data-testid=step-signin] > a.disabled").should("not.exist")
    cy.get("[data-testid=step-shipping] > a.disabled").should("not.exist")
    cy.get("[data-testid=step-payment] > a.disabled").should("not.exist")
    cy.get("[data-testid=step-placeorder] > a.disabled").should("not.exist")

    // PlaceOrder screen should include correct fields
    cy.contains(address).should("exist")
    cy.contains(city).should("exist")
    cy.contains(postalCode).should("exist")
    cy.contains(country).should("exist")
    cy.contains(listingName).should("exist")

    cy.get("[data-testid=order-submit-btn]").click()

    cy.url().should("include", "/order")

    // PaymentProcess Screen
    cy.contains(address).should("exist")
    cy.contains(city).should("exist")
    cy.contains(postalCode).should("exist")
    cy.contains(country).should("exist")
    cy.contains(listingName).should("exist")
    cy.contains("PayPal")

    cy.contains("Not Delivered")
    cy.contains("Not Paid")
  })

  it("Price is calculated correctly", () => {
    const address = "11 Main St"
    const city = "Oregon"
    const postalCode = "344312"
    const country = "USA"
    const listingName = "1st Solution Electrical"

    cy.contains(listingName).click()

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get("strong").then(($price) => {
      const price = Number($price.text().split("$")[1])
      const tax = (price * 0.15).toFixed(1)
      const shipping = 100
      const total = (Number(price) + Number(tax) + Number(shipping)).toFixed(2)

      cy.get("[data-testid=addtocart-btn]").click()
      cy.contains(price)
      cy.contains("Proceed To Checkout").click()
      cy.get("[data-testid=shipping-address]").type(address)
      cy.get("[data-testid=shipping-city]").type(city)
      cy.get("[data-testid=shipping-postalcode]").type(postalCode)
      cy.get("[data-testid=shipping-country]").type(country)

      cy.get("[data-testid=shipping-continue-btn]").click()
      cy.get("[data-testid=payment-radio]").check()
      cy.get("[data-testid=payment-continue-btn]").click()

      // place order screen
      cy.get("div.col-md-2").contains(price).should("exist")
      cy.get("[data-testid=order-products-price]")
        .contains(price)
        .should("exist")
      cy.get("[data-testid=order-shipping-price]")
        .contains(shipping)
        .should("exist")
      cy.get("[data-testid=order-tax-price]").contains(tax).should("exist")
      cy.get("[data-testid=order-total-price]").contains(total).should("exist")

      cy.get("[data-testid=order-submit-btn]").click()

      // order screen
      cy.get("div.col-md-2").contains(price).should("exist")
      cy.get("[data-testid=order-summary-price]")
        .contains(price)
        .should("exist")
      cy.get("[data-testid=order-summary-shipping]")
        .contains(shipping)
        .should("exist")
      cy.get("[data-testid=order-summary-tax]").contains(tax).should("exist")
      cy.get("[data-testid=order-summary-total]")
        .contains(total)
        .should("exist")
    })
  })
})

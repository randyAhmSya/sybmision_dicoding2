describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("should display login page correctly", () => {
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.get("button").contains("Masuk").should("be.visible");
  });
  it("should display alert when email and password are wrong", () => {
    cy.get("input#email").type("wronguser@example.com");
    cy.get("input#password").type("wrongpassword");
    cy.get("button").contains("Masuk").click();
    cy.on("window:alert", (str) => {
      expect(str).to.be.a("string");
    });
  });
  it("should display homepage when email and password are correct", () => {
    cy.get("input#email").type("dimas@dicoding.com");
    cy.get("input#password").type("123456");
    cy.get("button").contains("Masuk").click();
    cy.url().should("not.include", "/login");
  });
});

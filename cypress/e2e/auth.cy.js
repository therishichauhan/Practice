describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage(); // Ensures no previous auth state
    cy.visit("http://localhost:3000/signup"); // Start from signup page
  });

  it("Should allow a user to sign up", () => {
    cy.get("input[name='username']").type("testuser");
    cy.get("input[name='contact']").type("9876543210");
    cy.get("input[name='dob']").type("2000-01-01");
    cy.get("input[name='password']").type("Test@1234");
    cy.get("input[name='confirmPassword']").type("Test@1234");

    cy.get("button[type='submit']").click();

    cy.url().should("include", "/login"); // Ensure redirection after signup
  });

  it("Should not allow sign up if passwords do not match", () => {
    cy.get("input[name='username']").type("testuser");
    cy.get("input[name='contact']").type("9876543210");
    cy.get("input[name='dob']").type("2000-01-01");
    cy.get("input[name='password']").type("Test@1234");
    cy.get("input[name='confirmPassword']").type("WrongPassword");

    cy.get("button[type='submit']").click();

    cy.contains("Passwords do not match!").should("be.visible"); // Check error message
  });

  it("Should allow a user to log in", () => {
    cy.visit("http://localhost:3000/login"); // Navigate to login page

    cy.get("input[name='username']").type("testuser");
    cy.get("input[name='password']").type("Test@1234");

    cy.intercept("POST", "/api/login", (req) => {
      req.reply({ statusCode: 200, body: { success: true, token: "mockToken123" } });
    }).as("loginRequest");

    cy.get("button[type='submit']").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
    cy.window().its("localStorage.isAuthenticated").should("equal", "true");

    cy.url().should("include", "/dashboard");
  });

  it("Should show error message for invalid login credentials", () => {
    cy.visit("http://localhost:3000/login"); // Navigate to login page

    cy.get("input[name='username']").type("wronguser");
    cy.get("input[name='password']").type("WrongPassword123");

    cy.get("button[type='submit']").click();

    cy.contains("Invalid username or password!").should("be.visible"); // Verify error
  });

  it("Should log out the user and redirect to login page", () => {
    localStorage.setItem("isAuthenticated", "true"); // Simulate logged-in state

    cy.visit("http://localhost:3000/dashboard");

    cy.get("button").contains("Logout").click();

    cy.url().should("include", "/login"); 
  });
});

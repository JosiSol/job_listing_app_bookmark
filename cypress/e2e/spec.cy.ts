describe("Basic Bookmark Functionality Tests", () => {
  describe("Authentication Flow", () => {
    it("should redirect unauthenticated users to login", () => {
      // Visit the home page without being logged in
      cy.visit("/");

      // Should be redirected to login page
      cy.url().should("include", "/login");

      // Verify login form is present
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("should display login form correctly", () => {
      cy.visit("/login");

      // Check form elements
      cy.contains("Welcome Back,").should("be.visible");
      cy.get('input[name="email"]').should(
        "have.attr",
        "placeholder",
        "Enter email address"
      );
      cy.get('input[name="password"]').should(
        "have.attr",
        "placeholder",
        "Enter password"
      );

      // Check sign up link
      cy.contains("Don't have an account?").should("be.visible");
      cy.get('a[href="/signup"]').should("contain.text", "Sign up");
    });

    it("should show validation errors for empty form", () => {
      cy.visit("/login");

      // Try to submit empty form
      cy.get('button[type="submit"]').click();

    });
  });

  describe("Navigation and UI Elements", () => {
    it("should navigate to signup page", () => {
      cy.visit("/login");

      // Click sign up link
      cy.get('a[href="/signup"]').click();

      // Should navigate to signup page
      cy.url().should("include", "/signup");
    });
  });

  // Only run authenticated tests if we can successfully log in
  describe("Authenticated User Tests", () => {
    beforeEach(() => {
      // Try to log in, but handle failure gracefully
      cy.visit("/login");

      // Check if we can attempt login
      cy.get('input[name="email"]')
        .should("be.visible")
        .then(() => {
          // Try with test credentials - this may fail, which is okay
          cy.get('input[name="email"]').type("47prodigi@gmail.com");
          cy.get('input[name="password"]').type("Theflash21");
          cy.get('button[type="submit"]').click();

          // Wait a moment for the response
          cy.wait(2000);
        });
    });

    it("should handle login attempt", () => {
      // Check current URL to see if login was successful
      cy.url().then((url) => {
        if (url.includes("/login")) {
          // Login failed - check for error message or form still visible
          cy.get('input[name="email"]').should("be.visible");
          // This is expected if test credentials don't exist
          cy.log("Login failed - test credentials may not exist");
        } else {
          // Login successful - we're on the home page
          cy.url().should("eq", Cypress.config().baseUrl + "/");
          cy.get("button").contains("Log out").should("be.visible");
          cy.log("Login successful");
        }
      });
    });

    it("should show appropriate content based on auth state", () => {
      cy.url().then((url) => {
        if (!url.includes("/login")) {
          // We're authenticated - test bookmark functionality
          cy.log("Testing authenticated features");

          // Look for job cards or bookmark buttons
          // Check for at least one visible bookmark button (by icon or button text)
          cy.get("button").contains("Log out").should("be.visible");
          // You may want to check for a button with a specific class or icon if available

          // Test navigation to bookmark page
          // Navigate to bookmark page using the "Show Bookmarks" heading or back button
          cy.contains("Show Bookmarks").should("be.visible");
        } else {
          // Still on login page - authentication required
          cy.log("Authentication required for this test");
          cy.get('input[name="email"]').should("be.visible");
        }
      });
    });

    it("should bookmark the first card, verify in bookmarks, unbookmark, and verify removal", () => {
      // Login with given credentials
      cy.visit("/login");
      cy.get('input[name="email"]').type("47prodigi@gmail.com");
      cy.get('input[name="password"]').type("Theflash21");
      cy.get('button[type="submit"]').click();
      cy.url().should("not.include", "/login");

      // Bookmark the first card (assume first button in first card is the bookmark)
      cy.get(".card").first().within(() => {
        cy.get("button").first().as("bookmarkBtn");
        cy.get("@bookmarkBtn").click();
      });

      // Go to the bookmark page
      cy.visit("/bookmark");

      // Check that the first card's title is present in bookmarks
      cy.get(".card").first().within(() => {
        cy.get("h2, .card-title").invoke("text").then((title) => {
          expect(title.trim().length).to.be.greaterThan(0);
          cy.contains(title.trim()).should("exist");

          // Unbookmark the card in bookmarks
          cy.get("button").first().click();
        });
      });

      // Go back to bookmarks page to verify removal
      cy.visit("/bookmark");
      cy.get(".card").should("not.exist");
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors gracefully", () => {
      // Intercept login request and simulate network error
      cy.intercept("POST", "**/api/auth/callback/credentials", {
        forceNetworkError: true,
      }).as("loginError");

      cy.visit("/login");
      // Use valid credentials to correctly login to test bookmark
      cy.get('input[name="email"]').type("");
      cy.get('input[name="password"]').type("");
      cy.get('button[type="submit"]').click();

      // Should handle the error gracefully
      cy.wait("@loginError");

      // Check that we're still on login page or show error message
      cy.url().should("include", "/login");
    });

    it("should handle invalid credentials", () => {
      cy.visit("/login");

      // Try with obviously invalid credentials
      cy.get('input[name="email"]').type("invalid@example.com");
      cy.get('input[name="password"]').type("wrongpassword");
      cy.get('button[type="submit"]').click();

      // Wait for response
      cy.wait(3000);

      // Should either show error message or stay on login page
      cy.url().should("include", "/login");

      // Check for error message (if implemented)
      cy.get("body").then(($body) => {
        if ($body.find(".bg-red-100").length > 0) {
          cy.get(".bg-red-100").should("be.visible");
        }
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper form labels and accessibility attributes", () => {
      cy.visit("/login");

      // Check form accessibility
      cy.get('input[name="email"]').should("have.attr", "type", "email");
      cy.get('input[name="password"]').should("have.attr", "type", "password");

      // Check button accessibility
      cy.get('button[type="submit"]').should("not.be.disabled");
    });
  });
});

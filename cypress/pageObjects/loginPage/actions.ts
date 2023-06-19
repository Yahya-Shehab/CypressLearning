class LoginPageActions {
  signIn(email: string, password: string) {
    cy.intercept(
      "POST",
      "https://conduit.productionready.io/api/users/login"
    ).as("LoginAPI");
    cy.intercept("GET", "https://conduit.productionready.io/api/tags").as(
      "tags"
    );
    cy.intercept(
      "GET",
      "https://conduit.productionready.io/api/articles/feed?**"
    ).as("articlesFeed");

    cy.get("input[type=email]").type(email);
    cy.get("input[type=password]").type(password);
    cy.contains("button", "Sign in").click();
  }
}

export default LoginPageActions;

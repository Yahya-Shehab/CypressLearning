import "@testing-library/cypress/add-commands";
import "cypress-file-upload";
import "cypress-wait-until";

declare global {
  namespace Cypress {
    interface Chainable {
      login: (email?: string, password?: string) => Cypress.Chainable;
      logout: () => void;
    }
  }
}

Cypress.Commands.add(
  "login",
  (email = "yahyaadmin@admin.com", password = "123") => {
    cy.logout();
    cy.request("POST", "https://api.realworld.io/api/users/login", {
      user: { email, password },
    }).then((res) => {
      localStorage.setItem("jwt", res.body.user.token);
    });
  }
);

Cypress.Commands.add("logout", () => {
  localStorage.clear();
});

export const GetAPIPrefix = (url: string) => {
  return `https://api.realworld.io/api/${url}`;
};

import "@testing-library/cypress/add-commands";
import cypress from "cypress";
import "cypress-file-upload";
import "cypress-wait-until";

declare global {
  namespace Cypress {
    interface Chainable {
      login: (email?: string, password?: string) => Cypress.Chainable;
      logout: () => void;
      // createArticle: (
      //   title: string,
      //   description: string,
      //   body: string,
      //   tagList: string
      // ) => Cypress.Chainable;
    }
  }
}

Cypress.Commands.add(
  "login",
  (email = "yahyaadmin@admin.com", password = "123") => {
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
// Cypress.Commands.add(
//   "createArticle",
//   (title: string, description: string, body: string, tagList: string) => {
//     cy.request({
//       method: "POST",
//       url: "https://api.realworld.io/api/articles",
//       body: { article: { title, description, body, tagList } },
//       headers: {
//         authorization: localStorage.getItem("jwt"),
//       },
//     }).then((res) => {
//       localStorage.getItem;
//     });
//   }
// );

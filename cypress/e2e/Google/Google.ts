import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

When("Open Google Home Page", () => {
  cy.visit("/");
});

Then("Page should load successfully", () => {
  // cy.get("input[type=submit]").should("have.value", "Google Search");
});

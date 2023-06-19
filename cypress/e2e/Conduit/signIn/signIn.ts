import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import LoginPageActions from "@pageObjects/loginPage/actions";
import LoginPageAssertions from "@pageObjects/loginPage/assertions";
import TopNavAssertions from "@pageObjects/topNav/assertions";

const loginPageActions = new LoginPageActions();
const loginPageAssertions = new LoginPageAssertions();
const topNavAssertions = new TopNavAssertions();

Given("Open Sign in page", () => {
  cy.logout();
  cy.visit("/#/login");
});

When("Fill valid email and password, then submit sign in", () => {
  loginPageActions.signIn("yahyaadmin@admin.com", "123");
  cy.wait(["@LoginAPI", "@tags", "@articlesFeed"]);
});

Then("Home page for valid account should appeared", () => {
  topNavAssertions.checkTopNavContainsUserName("yahyaAdmin", true);
  // cy.get("@LoginAPI").then((xhr: any) =>
  //   expect(xhr.response.statusCode).to.equal(200)
  // );
});

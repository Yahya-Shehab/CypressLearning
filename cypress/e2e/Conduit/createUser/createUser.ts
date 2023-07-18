import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SharedDataUtils from "@pageObjects/dataUtils";
import { NewUser } from "@support/createDataTypes";
import moment from "moment";

const sharedDataUtils = new SharedDataUtils();

const user: NewUser = {
  username: `CypressUserY-01${moment().format("DMhmss")}`,
  email: `CypressUserY-01${moment().format("DMhmss")}@test.com`,
  password: "123",
};

Given("Logout from conduit account", () => {
  cy.logout();
});

When("Request user API to create user", () => {
  sharedDataUtils.createUser(user).then((res) => console.log(res.email));
});

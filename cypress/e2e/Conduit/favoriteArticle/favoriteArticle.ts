import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import SharedDataUtils from "@pageObjects/dataUtils";
import HomePageActions from "@pageObjects/homePage/actions";
import TopNavActions from "@pageObjects/topNav/actions";
import UserPageAssertions from "@pageObjects/userPage/assertions";
import { NewArticle, NewUser } from "@support/createDataTypes";
import moment from "moment";

const sharedDataUtils = new SharedDataUtils();
const topNavActions = new TopNavActions();
const userPageAssertions = new UserPageAssertions();
const homePageActions = new HomePageActions();

let mySlug = "";
const article: NewArticle = {
  title: "Cypress Article Title 01",
  description: "Cypress Article Description 01",
  body: "Cypress Article Body 01",
};
const user: NewUser = {
  username: `CypressUserY-01${moment().format("DMhmss")}`,
  email: `CypressUserY-01${moment().format("DMhmss")}@test.com`,
  password: "123",
};

Given("The system has an article", () => {
  sharedDataUtils.createArticle(article).then((slug) => (mySlug = slug));
});

When("Set article on favorite article list", () => {
  sharedDataUtils.setArticleAsFavoritePost(mySlug);
});

Given("The admin user has an article", () => {
  sharedDataUtils.createArticle(article).then((slug) => (mySlug = slug));
});

Given("The system has a user", () => {
  sharedDataUtils.createUser(user);
  cy.login(user.email, user.password);
});

Given("That user likes the admin's article", () => {
  sharedDataUtils.setArticleAsFavoritePost(mySlug);
});

When("The admin user opens the article page for that article", () => {
  cy.intercept("GET", "https://api.realworld.io/api/user").as("user");
  cy.login();
  homePageActions.openHomePage();
  cy.wait("@user");
  topNavActions.clickOnUserNameButton("yahyaAdmin");
});

Then("The article should have the number 1 in favorite button", () => {
  userPageAssertions.checkNumberOfFavorites(article.title, "1", true);
});

afterEach(() => {
  sharedDataUtils.deleteArticleForAuthor("yahyaAdmin", article.title);
});

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SharedDataUtils from "@pageObjects/dataUtils";
import EditorPageAssertions from "@pageObjects/editorPage/assertions";
import HomePageActions from "@pageObjects/homePage/actions";
import HomePageAssertions from "@pageObjects/homePage/assertions";
import UserPageAssertions from "@pageObjects/userPage/assertions";
import { GetAPIPrefix } from "@support/commands";
import { NewArticle } from "@support/createDataTypes";

const homePageActions = new HomePageActions();
const homePageAssertions = new HomePageAssertions();
const sharedDataUtils = new SharedDataUtils();
const editorPageAssertions = new EditorPageAssertions();
const userPageAssertions = new UserPageAssertions();

const article: NewArticle = {
  title: "Yahya Article Title",
  body: "Yahya Article Body",
  description: "Yahya Article Description",
};

Given("Open Home Page", () => {
  homePageActions.openHomePage();
});

When("Follow account", () => {
  sharedDataUtils.followAccount();
});

When("Click on Your Feed list", () => {
  homePageActions.clickOnYourFeed();
});

Then("User posts should be appeared", () => {
  homePageAssertions.checkArticlesOnYourFeed("Anah Benešová");
});

When("Click on Global Feed list", () => {
  homePageActions.clickOnGlobalFeed();
});

Then("Your posts and all post published should be appeared", () => {
  homePageAssertions.checkArticlesOnGlobalFeed("yahyaAdmin");
});

When("Check the content of the Popular Tags box", () => {});

Then("The box should has a set of tags", () => {
  sharedDataUtils.getAllTags().then((tags) => {
    homePageAssertions.checkPopularTagsContent(tags.length);
  });
});

Given("The system has an article", () => {
  sharedDataUtils.createArticle(article);
});

Then("The article should be on the list", () => {
  homePageAssertions.checkIfArticleOnList(article.title);
});

Then(
  "The article should has article author, article title and article description",
  () => {
    homePageAssertions.checkArticleContentOnList(
      "yahyaAdmin",
      article.title,
      article.description
    );
  }
);

When("Click on article", () => {
  homePageActions.clickOnArticle(article.title);
});

Then("Article page should be opened", () => {
  editorPageAssertions.publicationSuccess(article.title);
});

Given("The system has an article with popular tag", () => {
  sharedDataUtils
    .getAllTags()
    .then((tags) => {
      article.tagList = [tags[0]];
    })
    .then(() => {
      sharedDataUtils.createArticle(article);
    });
});

When("Click on popular tag", () => {
  cy.intercept(
    "GET",
    GetAPIPrefix(`articles?tag=${article.tagList[0]}&limit=10&offset=0`)
  ).as(`${article.tagList[0]}`);
  homePageActions.selectTag(article.tagList[0]);
  cy.wait(`@${article.tagList[0]}`);
});

Then(
  "List of posts for this tag should be appeared that has your post and all posts which has this popular tag",
  () => {
    homePageAssertions.checkListForPopularTag(article.tagList[0]);
  }
);

When("Click on favorite button for this article", () => {
  homePageActions.setArticleAsFavorite(article.title);
});

Then("The number of favorites should be 1", () => {
  homePageAssertions.checkNumberOfFavorites(article.title, 1);
});

Then("The post should be on Favorited Articles list", () => {
  userPageAssertions.checkArticleOnFavoritesList(article.title);
});

afterEach(() => {
  sharedDataUtils.deleteArticleForAuthor("yahyaAdmin", article.title);
});

import {
  And,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import SharedDataUtils from "@pageObjects/dataUtils";
import EditorPageActions from "@pageObjects/editorPage/actions";
import EditorPageAssertions from "@pageObjects/editorPage/assertions";
import HomePageActions from "@pageObjects/homePage/actions";
import HomePageAssertions from "@pageObjects/homePage/assertions";
import { NewArticle } from "@support/createDataTypes";

const editorPageActions = new EditorPageActions();
const editorPageAssertions = new EditorPageAssertions();
const sharedDataUtils = new SharedDataUtils();
const homePageActions = new HomePageActions();
const homePageAssertions = new HomePageAssertions();

const article: NewArticle = {
  title: "Cypress Definition",
  body: "Cypress is an open-source end-to-end testing framework used for web applications. It provides a simple and intuitive API (Application Programming Interface) for writing tests that simulate user interactions and verify the behavior of your application.",
  description: "What is the cypress",
};

Given("Open Editor page", () => {
  editorPageActions.openEditorPage();
});

When("Fill all elements of article", () => {
  editorPageActions
    .typeInTitleInputField(article.title)
    .typeInDescriptionInputField(article.description)
    .typeInBodyTextField(article.body);
});

And("Publish article", () => {
  editorPageActions.clickOnPublishPostButton();
});

Then("The article should be published", () => {
  editorPageAssertions.publicationSuccess(article.title);
});

When("Fill all elements of article except title", () => {
  editorPageActions
    .typeInDescriptionInputField(article.description)
    .typeInBodyTextField(article.body);
});

Then(
  "The article shouldn't be published and error message should be appeared",
  () => {
    editorPageAssertions.publicationFail();
  }
);

When("Fill all elements of article except article description", () => {
  editorPageActions
    .typeInTitleInputField(article.title)
    .typeInBodyTextField(article.body);
});

When("Fill all elements of article except article body", () => {
  editorPageActions
    .typeInTitleInputField(article.title)
    .typeInDescriptionInputField(article.description);
});

Given("The system has an article", () => {
  sharedDataUtils.createArticle(article).then((slug) => console.log(slug));
});

Given("The system has an article with popular tag", () => {
  sharedDataUtils
    .getAllTags()
    .then((tags) => {
      article.tagList = [tags[0]];
    })
    .then(() => {
      console.log(article);
      sharedDataUtils.createArticle(article);
    });
});

When("Open Home page", () => {
  homePageActions.openHomePage();
});

When("Click on popular tag", () => {
  homePageActions.selectTag(article.tagList[0]);
});

Then("My article should be appeared", () => {
  homePageAssertions.checkArticleAvailability(article.title);
});

When("Delete Article", () => {
  sharedDataUtils
    .getAllArticlesForAuthor("yahyaAdmin")
    .then((articles) => console.log(articles));
  sharedDataUtils.deleteArticleForAuthor("yahyaAdmin", article.title);
});

afterEach(() => {
  sharedDataUtils.deleteArticleForAuthor("yahyaAdmin", article.title);
});

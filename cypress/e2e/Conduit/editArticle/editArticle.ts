import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import SharedDataUtils from "@pageObjects/dataUtils";
import EditorPageActions from "@pageObjects/editorPage/actions";
import EditorPageAssertions from "@pageObjects/editorPage/assertions";
import TopNavActions from "@pageObjects/topNav/actions";
import UserPageAssertions from "@pageObjects/userPage/assertions";
import { NewArticle } from "@support/createDataTypes";

const editorPageActions = new EditorPageActions();
const editorPageAssertions = new EditorPageAssertions();
const sharedDataUtils = new SharedDataUtils();
const userPageAssertions = new UserPageAssertions();
const topNavActions = new TopNavActions();

let slug = "";
const newDescription = "New Description";

const article: NewArticle = {
  title: "a",
  body: "aa",
  description: "Old Description",
};

Given("The system has an article", () => {
  sharedDataUtils.createArticle(article).then((resSlug) => {
    slug = resSlug;
  });
});

When("Open editor page for the article and edit description", () => {
  editorPageActions.openEditorPage(slug);
  cy.wait("@EditorAPI");
  editorPageActions.typeInDescriptionInputField(newDescription);
});

When("Click on publish article", () => {
  editorPageActions.clickOnPublishPostButton();
});

Then("Article should be edited", () => {
  editorPageAssertions.publicationSuccess(article.title);
  topNavActions.clickOnUserNameButton("yahyaAdmin");
  userPageAssertions.checkDescriptionContents(
    article.title,
    newDescription,
    true
  );
});

afterEach(() => {
  sharedDataUtils.deleteArticleForAuthor("yahyaAdmin", article.title);
});

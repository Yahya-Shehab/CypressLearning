import SharedDataUtils from "@pageObjects/dataUtils";

const sharedDataUtils = new SharedDataUtils();
class UserPageAssertions {
  checkDescriptionContents(
    articleTitle: string,
    content: string,
    isExist: boolean
  ) {
    cy.contains("h1", articleTitle)
      .parent()
      .contains("p", content)
      .should(isExist ? "exist" : "not.exist");
  }

  checkNumberOfFavorites(
    articleTitle: string,
    numberOfFavorites: string,
    isExist: boolean
  ) {
    cy.contains("h1", articleTitle)
      .parent()
      .parent()
      .contains("button", numberOfFavorites)
      .should(isExist ? "exist" : "not.exist");
  }

  checkArticleOnFavoritesList(articleTitle: string) {
    // cy.contains("h1", articleTitle).should(isExist ? "exist" : "not.exist");
    sharedDataUtils
      .favoriteArticlesList("yahyaAdmin")
      .should("deep.equal", articleTitle);
  }
}

export default UserPageAssertions;

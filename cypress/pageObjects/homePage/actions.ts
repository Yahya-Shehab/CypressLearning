class HomePageActions {
  openHomePage() {
    cy.visit("/");
    return this;
  }

  selectTag(tag: string) {
    cy.get(".tag-list").contains(tag).click();
  }

  clickOnYourFeed() {
    cy.get(".feed-toggle").find("li").contains("a", "Your Feed").click();
  }

  clickOnGlobalFeed() {
    cy.get(".feed-toggle").find("li").contains("a", "Global Feed").click();
  }

  clickOnArticle(articleTitle: string) {
    cy.get(".article-preview").contains("h1", articleTitle).click();
  }

  setArticleAsFavorite(articleTitle: string) {
    cy.contains("h1", articleTitle)
      .parent()
      .parent()
      .contains("button", 0)
      .click();
  }
}

export default HomePageActions;

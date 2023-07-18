class UserPageActions {
  openUserPage() {
    cy.visit("/@yahyaAdmin");
    return this;
  }

  clickOnFavoritedArticlesList() {
    cy.get(".articles-toggle")
      .find("li")
      .contains("a", "Favorited Articles")
      .click();
  }
}

export default UserPageActions;

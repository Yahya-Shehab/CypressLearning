class HomePageActions {
  openHomePage() {
    cy.visit("/");
    return this;
  }

  selectTag(tag: string) {
    cy.get(".tag-list").contains(tag).click();
  }
}

export default HomePageActions;

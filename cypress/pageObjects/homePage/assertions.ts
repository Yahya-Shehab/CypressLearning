class HomePageAssertions {
  checkArticleAvailability(articleTitle: string) {
    cy.get(".article-preview").contains(articleTitle).should("exist");
  }
}

export default HomePageAssertions;

class HomePageAssertions {
  checkArticleAvailability(articleTitle: string) {
    cy.get(".article-preview").contains(articleTitle).should("exist");
  }

  checkArticlesOnYourFeed(author: string) {
    cy.get(".article-preview").each(($div) => {
      cy.wrap($div).contains("a.author", author).should("exist");
    });
  }

  checkArticlesOnGlobalFeed(author: string) {
    cy.get(".article-preview").contains("a.author", author).should("exist");
    cy.get(".article-preview").should(($a) => {
      expect($a).not.to.contain("a.author", author);
    });
  }

  checkIfArticleOnList(articleTitle: string) {
    cy.contains("h1", articleTitle).should("exist");
  }

  checkArticleContentOnList(
    articleAuthor: string,
    articleTitle: string,
    articleDescription: string
  ) {
    cy.contains("h1", articleTitle).should("exist");
    cy.contains("h1", articleTitle)
      .parent()
      .contains("p", articleDescription)
      .should("exist");
    cy.contains("h1", articleTitle)
      .parent()
      .parent()
      .contains(".author", articleAuthor)
      .should("exist");
  }

  checkPopularTagsContent(size: number) {
    cy.get(".tag-list").find("a").should("have.length", size);
  }

  checkListForPopularTag(tag: string) {
    cy.get(".nav-item").contains("a", tag).should("exist");
    cy.get("div.article-preview") // Select all div elements with class 'article-preview'
      .each(($div) => {
        const content = $div.text();
        // Perform assertions or checks on the content
        cy.wrap(content).should("contain", tag);
      });
  }

  checkNumberOfFavorites(articleTitle: string, numberOfFavorites: number) {
    cy.contains("h1", articleTitle)
      .parent()
      .parent()
      .contains("button", numberOfFavorites)
      .should("exist");
  }
}

export default HomePageAssertions;

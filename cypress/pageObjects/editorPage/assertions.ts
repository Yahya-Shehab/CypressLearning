class EditorPageAssertions {
  publicationSuccess(title: string) {
    cy.get("h1").contains(title).should("exist");
    cy.get(".article-content > .col-xs-12").should("exist");
  }

  publicationFail() {
    cy.get(".error-messages > li").contains("can't be blank").should("exist");
  }
}

export default EditorPageAssertions;

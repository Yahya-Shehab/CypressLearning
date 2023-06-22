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
}

export default UserPageAssertions;

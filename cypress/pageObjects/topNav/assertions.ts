class TopNavAssertions {
  checkTopNavContainsUserName(value: string, isExist: boolean) {
    cy.get(".pull-xs-right")
      .find("li")
      .contains("a", value)
      .should(isExist ? "exist" : "not.exist");
  }
}

export default TopNavAssertions;

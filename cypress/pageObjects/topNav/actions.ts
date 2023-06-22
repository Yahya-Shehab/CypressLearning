class TopNavActions {
  clickOnUserNameButton(userName: string) {
    cy.get(".pull-xs-right").find("li").contains("a", userName).click();
  }
}

export default TopNavActions;

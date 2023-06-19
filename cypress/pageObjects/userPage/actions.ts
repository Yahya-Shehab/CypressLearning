class UserPageActions {
  openUserPage() {
    cy.visit("/@yahyaAdmin");
    return this;
  }
}

export default UserPageActions;

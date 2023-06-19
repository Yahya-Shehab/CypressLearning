class EditorPageActions {
  openEditorPage() {
    cy.visit("#/editor");
    return this;
  }

  typeInTitleInputField(title: string) {
    cy.get('[placeholder="Article Title"]').clear().type(title);
    return this;
  }

  typeInDescriptionInputField(description: string) {
    cy.get(`[placeholder="What's this article about?"]`)
      .clear()
      .type(description);
    return this;
  }

  typeInBodyTextField(body: string) {
    cy.get('[placeholder="Write your article (in markdown)"]')
      .clear()
      .type(body);
    return this;
  }

  setTags(tags: string) {
    cy.get('[placeholder="Enter tags"]').clear().type(tags);
    return this;
  }

  clickOnPublishPostButton() {
    cy.contains("button", "Publish Article").click();
    return this;
  }
}

export default EditorPageActions;
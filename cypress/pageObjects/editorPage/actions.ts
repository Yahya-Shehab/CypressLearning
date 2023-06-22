class EditorPageActions {
  openEditorPage(slug?: string) {
    cy.intercept("GET", "https://api.realworld.io/api/articles/**").as(
      "EditorAPI"
    );
    cy.visit(`#/editor/${slug ? slug : ""}`);
    slug && cy.wait("@EditorAPI");
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

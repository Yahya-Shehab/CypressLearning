class ArticlePageActions {
  openArticlePage(slug: string) {
    cy.visit(`#/article/${slug}`);
    return this;
  }
}

export default ArticlePageActions;

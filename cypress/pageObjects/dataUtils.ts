import { GetAPIPrefix } from "@support/commands";
import { createNewArticleBody } from "@support/constants";
import { NewArticle } from "@support/createDataTypes";
import { ArticleResponse } from "@support/types";

class SharedDataUtils {
  createArticle(article: NewArticle): Cypress.Chainable<string> {
    return cy
      .request({
        method: "POST",
        url: GetAPIPrefix("articles"),
        body: createNewArticleBody(article),
        headers: { authorization: `Token ${localStorage.getItem("jwt")}` },
      })
      .then((response) => response.body.article.slug);
  }

  getAllTags(): Cypress.Chainable<string[]> {
    return cy
      .request({
        method: "GET",
        url: GetAPIPrefix("tags"),
        headers: { authorization: `Token ${localStorage.getItem("jwt")}` },
      })
      .then((response) => response.body.tags);
  }

  getAllArticlesForAuthor(
    author: string
  ): Cypress.Chainable<ArticleResponse[]> {
    return cy
      .request({
        method: "GET",
        url: GetAPIPrefix(`articles?author=${author}&limit=5&offset=0`),
        headers: { authorization: `Token ${localStorage.getItem("jwt")}` },
      })
      .then((response) => response.body.articles);
  }

  deleteArticleForAuthor(author: string, title: string) {
    this.getArticleForAuthor(author, title).then((article) => {
      if (article)
        cy.request({
          method: "DELETE",
          url: GetAPIPrefix(`articles/${article.slug}`),
          headers: { authorization: `Token ${localStorage.getItem("jwt")}` },
        });
    });
  }

  getArticleForAuthor(
    author: string,
    title: string
  ): Cypress.Chainable<ArticleResponse> {
    return this.getAllArticlesForAuthor(author).then(
      (articles) =>
        articles.filter((article) => article.title === title)[0] || null
    );
  }
}

export default SharedDataUtils;

import { GetAPIPrefix } from "@support/commands";
import { createNewArticleBody, createNewUserBody } from "@support/constants";
import { NewArticle, NewUser } from "@support/createDataTypes";
import { ArticleResponse, UserResponse } from "@support/types";

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

  createUser(user: NewUser): Cypress.Chainable<UserResponse> {
    return cy
      .request({
        method: "POST",
        url: GetAPIPrefix("users"),
        body: createNewUserBody(user),
      })
      .then((response) => response.body.user);
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

  setArticleAsFavoritePost(slug: string) {
    cy.request({
      method: "POST",
      url: GetAPIPrefix(`articles/${slug}/favorite`),
      headers: { authorization: `Token ${localStorage.getItem("jwt")}` },
    }).then((res) => {
      console.log(res.body.article.favorited);
    });
  }

  deleteArticleFromFavoriteList(slug: string) {
    cy.request({
      method: "DELETE",
      url: GetAPIPrefix(`articles/${slug}/favorite`),
      headers: { authorization: `Token ${localStorage.getItem("jwt")}` },
    }).then((res) => {
      console.log(res.body.article.favorited);
    });
  }

  favoriteArticlesList(author: string): Cypress.Chainable<string> {
    return cy
      .request({
        method: "GET",
        url: GetAPIPrefix(`articles?favorited=${author}&limit=5&offset=0`),
        headers: { authorization: `Token ${localStorage.getItem("jwt")}` },
      })
      .then((response) => response.body.articles[0].title);
  }

  followAccount() {
    cy.request({
      method: "POST",
      url: GetAPIPrefix("profiles/Anah%20Bene%C5%A1ov%C3%A1/follow"),
      headers: { authorization: `Token ${localStorage.getItem("jwt")}` },
    });
  }
}

export default SharedDataUtils;

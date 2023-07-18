import { NewArticle, NewUser } from "./createDataTypes";

export const createNewArticleBody = (article: NewArticle) => {
  return {
    article: { ...article },
  };
};

export const createNewUserBody = (user: NewUser) => {
  return {
    user: { ...user },
  };
};

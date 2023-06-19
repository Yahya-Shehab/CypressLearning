import { NewArticle } from "./createDataTypes";

export const createNewArticleBody = (article: NewArticle) => {
  return {
    article: { ...article },
  };
};

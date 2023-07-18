export interface NewArticle {
  title: string;
  body: string;
  description: string;
  tagList?: string[];
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

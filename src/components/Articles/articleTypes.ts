export type Article = {
  title: string;
  content: string;
  slug: string;
  description: string;
  thumbnail: {
    src: string;
    alt: string;
  };
  articleAuthor: ArticleAuthor;
};

type ArticleAuthor = {
  authorName: string;
  aboutAuthor?: string;
};

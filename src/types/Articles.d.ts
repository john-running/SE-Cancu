declare namespace Articles {
  export type Article = ComponentProps<{
    fields: {
      title: string;
      content: string;
      slug: string;
      description: string;
      thumbnail: ArticleThumbnail;
      articleAuthor: ArticleAuthor;
    };
    sys: {
      id: string;
    };
  }>;

  type ArticleThumbnail = {
    src: string;
    alt: string;
  };

  type ArticleAuthor = ComponentProps<{
    fields: {
      authorName: string;
      aboutAuthor?: string;
    };
  }>;
}

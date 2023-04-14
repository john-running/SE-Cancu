import React, { useContext } from 'react';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';
import { CompositionContext } from '@/containers/CommonContainer';

interface Props {
  article: Articles.Article;
  articleTags: string;
  articleBody: {
    rteValue: string;
  };
  overrideCmsWithRteArticle: boolean;
}

const ArticleComponent: React.FC<Props> = ({ article, articleTags, articleBody, overrideCmsWithRteArticle }) => {
  const composition = useContext(CompositionContext);

  if (!(article || composition?.parameters?.articleContent?.value)) {
    return (
      <Container paddingBottom={PaddingSize.Large} paddingTop={PaddingSize.Large}>
        <h1 className="text-4xl md:text-5xl font-extrabold pb-6">No article selected</h1>
        <p className="text-2xl pb-3">Your article will be shown here</p>
      </Container>
    );
  }

  const { title, articleAuthor, content, tags } = article || composition?.parameters?.articleContent?.value;
  const tagOverrides = articleTags?.split(',');
  const displayTags = tagOverrides ? tagOverrides : tags && tags.length > 0 ? tags : '';
  const displayArticleBody = articleBody?.rteValue;
  const articleContent = overrideCmsWithRteArticle ? displayArticleBody : content;

  const { authorName, aboutAuthor } = articleAuthor || {};
  return (
    <Container paddingBottom={PaddingSize.Large} paddingTop={PaddingSize.Large}>
      <h1 className="text-4xl md:text-5xl font-extrabold pb-6">{title}</h1>
      <p className="text-2xl pb-3">by {authorName}</p>
      <div className="pb-6">
        {displayTags &&
          displayTags.map((t: any, index: number) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-theme_strong px-3 py-0.5 mr-3 text-sm font-medium text-white"
            >
              {t}
            </span>
          ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: articleContent }} className="max-w-5xl" />
      {Boolean(aboutAuthor) && (
        <div className="border-t mt-10 lg:mt-20">
          <p className="text-2xl font-extrabold pt-11 pb-2.5">About this author</p>
          <p className="max-w-5xl text-lg">{aboutAuthor}</p>
        </div>
      )}
    </Container>
  );
};

export default ArticleComponent;

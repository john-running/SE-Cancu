import React from 'react';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';
import ArticleListItem from './ArticleListItem';

interface Props {
  title: string;
  articles: Articles.Article[];
}

const ArticlesList: React.FC<Props> = ({ title, articles }) => (
  <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None}>
    <p className="text-5xl font-bold">{title}</p>
    <div>
      {articles &&
        Array.isArray(articles) &&
        articles.map((article: Articles.Article, index: number) => (
          <ArticleListItem key={index} article={article} variant="navigation" />
        ))}
    </div>
  </Container>
);

export default ArticlesList;

import React from 'react';
import ArticleListItem from './ArticleListItem';
import { BaseContainer } from '@/components/_atoms/BaseContainer';

interface Props {
  title: string;
  articles: Articles.Article[];
}

const ArticlesList: React.FC<Props> = ({ title, articles }) => (
  <BaseContainer>
    <p className="text-5xl font-bold">{title}</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-articles-center gap-6 pt-12 mt-12 border-t border-light_gray">
      {articles &&
        Array.isArray(articles) &&
        articles.map((article: Articles.Article, index: number) => (
          <ArticleListItem key={index} article={article} variant="list" />
        ))}
    </div>
  </BaseContainer>
);

export default ArticlesList;

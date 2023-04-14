import React, { useMemo } from 'react';
import FilterList from '@/components/FilterList';

interface Props {
  title: string;
  articles: Articles.Article[];
}

const ArticlesList: React.FC<Props> = ({ articles }) => {
  const mappedArticles = useMemo(
    () => articles?.map(item => ({ id: item.id, name: item.title, url: `/articles/${item?.slug}` })),
    [articles]
  );
  return (
    <FilterList title="Featured articles" list={mappedArticles || []} titleClassName="!text-base" className="pb-4" />
  );
};

export default ArticlesList;

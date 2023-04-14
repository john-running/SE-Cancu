export { default as Article } from './Article';
export { default as ArticleListItem } from './ArticleListItem';
export { default as ArticlesList } from './ArticlesList';
export { default as ArticlesListNavigation } from './ArticlesListNavigation';
export { default as SpotlightList } from './SpotlightList';
export { default as SpotlightListItem } from './SpotlightListItem';

export const buildArticleLink = ({ slug }: { slug: string }): { href: string } => ({ href: `/articles/${slug}` });

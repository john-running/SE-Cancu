import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from '@/components/_atoms/Image';
import ButtonLink from '@/components/_atoms/ButtonLink';
import NavLink from '@/components/_atoms/NavLink';
import { NoImageSrc } from '@/constants';
import { checkIfCurrentRoute } from '../../utils';
import { Article } from './articleTypes';

interface Props {
  article: Article;
  variant: 'navigation' | 'list';
}

const ArticleListItem: React.FC<Props> = ({ article, variant }) => {
  const router = useRouter();
  const { title, slug, description, thumbnail, articleAuthor } = article || {};
  const isCurrentRoute = useMemo(() => checkIfCurrentRoute(`/articles/${slug}`, router.asPath), [router.asPath, slug]);

  if (!title || !slug || !article) {
    return null;
  }

  const { authorName } = articleAuthor || {};
  const imageUrl = thumbnail?.src || NoImageSrc;

  if (variant === 'navigation') {
    return (
      <div className="p-2 flex flex-col">
        <span className="shrink-0 aspect-square block w-full relative">
          <Image alt={title} src={imageUrl} fill />
        </span>
        <NavLink href={`/articles/${slug}`} title={title} isActive={isCurrentRoute} />
      </div>
    );
  }
  return (
    <div className="border border-light_gray p-2 flex flex-col">
      <span className="shrink-0 aspect-video block w-full relative">
        <Image src={imageUrl} alt="" fill />
      </span>
      <div className="p-3 inline-flex flex-col h-full">
        <p className="font-bold text-2xl">{title}</p>
        <p className="pt-2">{description}</p>
        <p className="py-6">by {authorName}</p>
        {slug && <ButtonLink text="Read more" href={`/articles/${slug}`} className="block mt-auto text-sm" />}
      </div>
    </div>
  );
};

export default ArticleListItem;

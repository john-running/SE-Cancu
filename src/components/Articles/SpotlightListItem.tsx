import React from 'react';
import classNames from 'classnames';
import Image from '@/components/_atoms/Image';
import { NoImageSrc } from '@/constants';
import { Article } from './articleTypes';
import Link from '../_atoms/Link';

interface Props {
  article: Article;
  articleLink: string;
}

const SpotlightListItem: React.FC<Props> = ({ article, articleLink }) => {
  if (!article) {
    return null;
  }
  const { title, slug, description, thumbnail } = article;
  const img = thumbnail?.src || NoImageSrc;
  return (
    <div className="cursor-pointer group">
      <Link href={articleLink ?? slug ?? '#'}>
        <div className="grid grid-cols-2 md:grid-cols-12 auto-rows-max transition border border-main_gray bg-ivory group-hover:border-black p-3.5 pr-6 lg:pr-14 gap-y-4">
          <div
            className={classNames('w-20 h-[71px] row-start-1 flex align-middle', {
              'pl-0 pr-10 md:pl-10 md:pr-14': img.includes('.svg'),
            })}
          >
            <Image src={img} width={150} height={130} objectFit="cover" alt="spotlight-image" />
          </div>
          <div className="col-span-2 md:col-start-3 md:col-end-11 w-full md:ml-12 md:mr-2 flex flex-col justify-center">
            <p className="font-bold text-2xl">{title}</p>
            {description && (
              <div className="text-xs pt-2 leading-5" dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
          <div className="self-center justify-self-end row-start-1 md:col-start-12 ">
            <Image width={17} height={17} src="/img/spotlight-arrow.svg" alt="spotlight-arrow" unoptimized />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpotlightListItem;

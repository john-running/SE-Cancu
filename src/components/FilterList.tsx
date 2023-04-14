import React from 'react';
import classNames from 'classnames';
import Link from './_atoms/Link';

export interface Item {
  id: number;
  name: string;
  url: string;
}

interface Props {
  title: string;
  list: Item[];
  getLink?: (item: Item) => { pathname: string; query: any };
  activeItemId?: number | null;
  className?: string;
  titleClassName?: string;
}

const FilterList: React.FC<Props> = ({ title, list, className = '', titleClassName }) => (
  <div className={className}>
    <p className={classNames('font-extrabold text-lg ml-3', titleClassName)}>{title}</p>
    {Boolean(list.length) && (
      <ul>
        {list.map(item => (
          <li key={item.id} className="mt-4">
            <Link
              href={item.url}
              scroll={false}
              className={`rounded px-3 py-1.5 hover:opacity-30 text-theme_strong bg-white`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default FilterList;

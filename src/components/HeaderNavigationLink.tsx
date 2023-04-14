import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import NavLink from '@/components/_atoms/NavLink';
import { checkIfCurrentRoute } from '../utils';

const HeaderNavigationLink: React.FC<{
  link: { path: string };
  title: string;
  attachHeaderClass?: boolean;
  styleType?: 'default' | 'menu';
}> = ({ link, title, attachHeaderClass = true, styleType }) => {
  const router = useRouter();

  const isCurrentRoute = useMemo(() => checkIfCurrentRoute(link.path, router.asPath), [router.asPath, link]);

  return (
    <NavLink
      href={link.path}
      title={title}
      isActive={isCurrentRoute}
      className={classNames('block lg:m-0 m-3', {
        'header-navigation-item': attachHeaderClass,
        'pl-3 pb-4 text-left': styleType === 'menu',
      })}
    />
  );
};

export default HeaderNavigationLink;

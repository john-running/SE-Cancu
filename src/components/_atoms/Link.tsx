import React from 'react';
//import NextLink from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

interface Props {
  href: string;
  title?: string;
  className?: string;
  children?: any;
  scroll?: boolean;
}

const Link: React.FC<Props> = ({ title, href = '', className = '', children, scroll = true }) => {
  const router = useRouter();
  const { country, lang } = router.query || {};

  const defaultClasses = 'cursor-pointer text-sm font-bold not-italic';

  if (!href) return null;
  const path = href.startsWith('/') ? href : `/${href}`;

  const localizedHref = `/${(country as string).toLocaleLowerCase()}/${(lang as string).toLocaleLowerCase()}${path}`;
  return href.startsWith('http') ? (
    <a href={href} className={classNames(defaultClasses, className)}>
      {children ?? title}
    </a>
  ) : (
    // <NextLink href={localizedHref} scroll={scroll} className={classNames(defaultClasses, className)}>
    //   {children ?? title}
    // </NextLink>
    <a href={localizedHref} className={classNames(defaultClasses, className)}>
      {children ?? title}
    </a>
  );
};

export default Link;

import React from 'react';
import Link from './Link';
import classNames from 'classnames';

interface Props {
  title: string;
  href: string;
  className?: string;
  isActive?: boolean;
}

const NavLink: React.FC<Props> = ({ href, title, className = '', isActive = false }) => (
  <Link
    href={href}
    title={title}
    className={classNames(
      'header_footer_container--header_items hover:opacity-30 text-theme_strong',
      isActive ? 'opacity-30' : 'opacity-100',
      className
    )}
  />
);

export default NavLink;

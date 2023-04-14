import React from 'react';
import Link from './Link';
import classNames from 'classnames';

interface Props {
  href: string;
  text: string;
  styleType?: 'primary' | 'secondary' | 'static';
  rel?: string;
  target?: string;
  disabled?: boolean;
}

const ButtonLink: React.FC<React.HTMLProps<HTMLButtonElement> & Props> = ({
  href,
  text,
  styleType = 'primary',
  disabled,
  className,
}) => {
  const classes = {
    common:
      'block w-max border-2 uppercase font-bold text-md cursor-pointer font-acumin text-center px-8 py-2.5 leading-7',
    disabled: 'pointer-events-none opacity-60',
    primary:
      'text-theme_strong bg-white border-theme_strong text-black hover:border-white hover:text-white hover:bg-theme_strong',
    secondary: 'bg-black border-white text-white hover:border-black hover:text-theme_strong hover:bg-white',
    static: 'bg-white text-black hover:border-white hover:text-white hover:bg-black',
  };
  return (
    <Link
      href={href}
      className={classNames(classes.common, classes[styleType], { [classes.disabled]: disabled }, className)}
    >
      <span>{text}</span>
    </Link>
  );
};

export default ButtonLink;

import React from 'react';
import classNames from 'classnames';
import IconArrow from '@/components/_atoms/IconArrow';

interface Props {
  direction: 'left' | 'right';
  onClick?: () => void;
  dark?: boolean;
  disabled?: boolean;
}

const ButtonArrow: React.FC<Props> = ({ onClick = () => null, dark = false, direction = 'left', disabled = false }) => (
  <button
    className={classNames(
      'flex items-center group justify-center w-12 h-12 border-2 cursor-pointer disabled:pointer-events-none disabled:opacity-60',
      { 'border-white hover:bg-white': dark },
      { 'border-black bg-white hover:bg-black': !dark }
    )}
    onClick={onClick}
    aria-label={`${direction} slide`}
    disabled={disabled}
    type="button"
  >
    <IconArrow
      direction={direction}
      fill={dark ? 'white' : 'black'}
      className={dark ? 'group-hover:fill-black' : 'group-hover:fill-white'}
    />
  </button>
);

export default ButtonArrow;

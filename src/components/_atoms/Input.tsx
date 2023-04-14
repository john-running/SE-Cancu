import React from 'react';
import classNames from 'classnames';
import Image from '@/components/_atoms/Image';

interface Props {
  id?: string;
  onChange?(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  errorMessage?: string | false;
  className?: string;
  required?: boolean;
  type?: string;
  name?: string;
  inputClassName?: string;
  labelClassName?: string;
  rows?: number;
}

const Input: React.FC<Props> = ({
  id = '',
  onChange = () => undefined,
  onBlur = () => undefined,
  onFocus = () => undefined,
  disabled = false,
  errorMessage = '',
  className = '',
  required = false,
  type = 'text',
  label = '',
  name = '',
  inputClassName = '',
  labelClassName = '',
  rows = 0,
  placeholder = '',
}) => (
  <div className={classNames({ 'sm:pt-2.5 pb-5 relative': label }, className)}>
    {label && <span className={classNames('block text-left leading-4 pb-4', labelClassName)}>{label}</span>}
    {rows ? (
      <textarea
        id={id}
        className={classNames(
          'rounded appearance-none bg-white border border-main_gray md:text-base text-xs leading-5 pt-3 pr-9 pb-3 pl-3.5 w-full focus:border-black focus:outline-none p-3',
          inputClassName,
          { 'bg-lightgray placeholder:text-grey': disabled }
        )}
        placeholder={placeholder && !errorMessage ? placeholder : ''}
        onChange={onChange}
        rows={rows}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        name={name}
      />
    ) : (
      <input
        id={id}
        className={classNames(
          'rounded appearance-none bg-white border border-main_gray md:text-base text-xs leading-5 pt-3 pr-9 pb-3 pl-3.5 w-full focus:border-black focus:outline-none p-3',
          inputClassName,
          { 'bg-lightgray placeholder:text-grey': disabled }
        )}
        placeholder={placeholder && !errorMessage ? placeholder : ''}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        type={type}
        name={name}
      />
    )}
    {errorMessage && (
      <>
        <p className="absolute bottom-0 text-brand_secondary mt-1.5 text-sm leading-5 text-red-500">{errorMessage}</p>
        <div className="absolute right-2.5 top-10 sm:top-14 lg:top-14 w-5 h-5">
          <Image src="/img/warning.svg" layout="fill" />
        </div>
      </>
    )}
  </div>
);

export default Input;

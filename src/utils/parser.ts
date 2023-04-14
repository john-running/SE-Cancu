import { first, last } from 'lodash';

export const parseCategoryName = (categoryName: string): string =>
  categoryName.toLowerCase().trim().replace('&', 'and').split(' ').join('-');

export const parseProductName = (productName: string): string =>
  first(productName.toLowerCase().trim().split(' ').join('-').split('-(')) || '';

export const parseLanguageCode = (
  languageCode: string,
  style?: 'toUpperCase' | 'toLowerCase',
  firstCode?: boolean
): string => {
  const code = (firstCode ? first(languageCode?.split('-')) : last(languageCode?.split('-'))) || languageCode;
  return style === 'toLowerCase' ? code?.toLowerCase() : code?.toUpperCase();
};

export const parseLanguage = (
  language: string,
  replaceString: '-' | '_',
  splitString: '-' | '_',
  style: 'uppercase' | 'lowercase' = 'uppercase'
): string => {
  if (!language) return '';
  const splitCode = language.split(splitString);
  const lastCode = style === 'uppercase' ? splitCode[1]?.toUpperCase() : splitCode[1]?.toLowerCase();
  return `${splitCode[0]}${replaceString}${lastCode}`;
};

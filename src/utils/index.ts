const slugify = (value: string): string =>
  !value
    ? ''
    : value
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text

export function buildProductDetailLink({ slug }: { slug: string }): {
  href: string;
} {
  return {
    href: `/products/${slugify(slug)}`,
  };
}

export const encode = (data: { [key: string]: any }) =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

export const checkIfCurrentRoute = (href: string, route: string) => {
  if (!href) return false;
  if (href === route) return true;

  const hrefArr = href === '/' ? [] : href.split('/');
  const routeArr = route.split('/');

  return routeArr.some(r => Boolean(r && r === hrefArr[hrefArr.length - 1]));
};

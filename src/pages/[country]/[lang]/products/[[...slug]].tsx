import { cms } from '@/utils/cms';
import CommonContainer from '@/containers/CommonContainer';
import { getCompositionByNodePath, getCompositionBySlug } from '@/utils/canvas';
import appRenderer from '@/compositions/appRenderer';
import { getCommerceContext } from '@/context/commerce/CommerceContext';
import { countryLangConfig } from '@/constants';

const Page = (props: any) => <CommonContainer {...props} resolveRenderer={appRenderer} />;

export const getStaticProps = async (context: any) => {
  const { params, preview = false } = context || {};
  const { lang, country, slug } = params || {};

  const commerceContext = await getCommerceContext(preview, lang, country, Array.isArray(slug) ? slug.at(0) : slug);

  context.language = lang;
  context.country = country;
  context.market = commerceContext.country.marketId;
  context.product = commerceContext.product?.reference;

  let composition;
  try {
    // checking override first
    composition = await getCompositionByNodePath(`/products/${slug}`, context);
  } catch (error) {
    composition = await getCompositionByNodePath('/products/pdp', context);
  }

  if (!composition) {
    return { notFound: true };
  }

  const { composition: globalComposition } = await getCompositionBySlug('global', context);

  return {
    props: {
      composition,
      globalComposition,
      revalidate: Number.MAX_SAFE_INTEGER,
      preview,
      language: lang,
      commerceContext,
    },
  };
};

export const getStaticPaths = async () => {
  const localizedProductSlugs = await cms().getProductSlugs();

  let paths: string[] = ['/us/en-us/products/pdp'];
  const countries = Array.from(countryLangConfig.keys());
  countries.forEach(country => {
    const languages = countryLangConfig.get(country)!;
    languages.forEach((language: string) => {
      const localizedSlugs = localizedProductSlugs.get(language);

      if (!localizedSlugs) {
        return;
      }

      paths = paths.concat(localizedSlugs?.map((slug: string) => `/${country}/${language}/products/${slug}`));
    });
  });
  paths = paths.filter(p => p);
  //console.log('product paths', { paths });
  return { paths, fallback: false };
};

export default Page;

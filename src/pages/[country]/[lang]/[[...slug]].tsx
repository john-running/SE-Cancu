import CommonContainer from '@/containers/CommonContainer';
import { getCompositionByNodePath, getCompositionBySlug, getNodePaths } from '@/utils/canvas';
import appRenderer from '@/compositions/appRenderer';
import { getCommerceContext } from '@/context/commerce/CommerceContext';

import '@/components/algolia';

const Page = (props: any) => <CommonContainer {...props} resolveRenderer={appRenderer} />;

export const getStaticProps = async (context: any) => {
  const { params, preview = false } = context || {};
  const { slug, country, lang } = params || {};

  const commerceContext = await getCommerceContext(preview, lang, country);
  context.language = lang;
  context.country = country;
  context.market = commerceContext.country.marketId;

  const composition = await getCompositionByNodePath(slug, context);

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
  // ignoring the PDP template node
  const filteredPaths = ['/products/'];
  const paths = await getNodePaths('/', []);
  const pagePaths = paths.filter(p => filteredPaths.some(filter => p.indexOf(filter) < 0));

  return { paths: pagePaths, fallback: false };
};

export default Page;

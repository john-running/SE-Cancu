import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig() || {};
const { hostName, languages } = publicRuntimeConfig || {};

const PageHead: React.FC<any> = ({ metaTitle, metaDescription, ogImage }) => {
  const router = useRouter();
  const { country } = router.query || {};
  const schema = hostName?.startsWith('http') ? '' : 'https://';
  const canonicalUrl = `${schema}${removeTrailingSlash(hostName)}${router.asPath}`;

  const renderHrefLangTag = (theLocale: string) => {
    const slug = router.asPath.replace(`/${country}`, ``);
    return (
      <link
        key={theLocale}
        rel="alternate"
        hrefLang={theLocale.toLowerCase()}
        href={`${schema}${removeTrailingSlash(hostName)}/${theLocale}${slug}`}
      />
    );
  };

  const renderHrefLangTags = () => {
    return languages?.map((l: string) => renderHrefLangTag(l));
  };

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="version" content={metaTitle} />
      <meta property="og:title" content={metaTitle} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" property="og:description" content={metaDescription} />
      <meta name="twitter:description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={'website'} />
      <meta name="twitter:card" content={'summary_large_image'} />
      <meta name="twitter:site" content="@uniformdev" />
      <meta property="og:site_name" content="JavaDrip" />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:image" content={ogImage} />
      {renderHrefLangTags()}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
    </Head>
  );
};

function removeTrailingSlash(str: string) {
  return str?.endsWith('/') ? str?.slice(0, -1) : str;
}

export default PageHead;

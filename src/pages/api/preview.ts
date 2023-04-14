import { IN_CONTEXT_EDITOR_QUERY_STRING_PARAM } from '@uniformdev/canvas';
import { NextApiHandler, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { getProjectMapClient } from '@/utils/canvas';

const queryParamsToPreserve = [IN_CONTEXT_EDITOR_QUERY_STRING_PARAM];
const {
  serverRuntimeConfig: { previewSecret },
} = getConfig();

const IS_PROD = process.env.NODE_ENV === 'production';

const setCookieSameSite = (res: NextApiResponse, value: string) => {
  const cookies = res.getHeader('Set-Cookie') as string[];
  res.setHeader(
    'Set-Cookie',
    cookies?.map(cookie => cookie.replace('SameSite=Lax', `SameSite=${value}; ${IS_PROD ? 'Secure;' : ''}`))
  );
};

const handler: NextApiHandler = async (req, res) => {
  const method = req.method?.toLocaleLowerCase();

  // POSTs are to welcome here
  if (method !== 'get') {
    return res.status(405).json({ message: 'Method not implemented' });
  }

  // validating preview secret presence and match
  const isUsingPreviewSecret = Boolean(previewSecret);
  if (isUsingPreviewSecret && req.query.secret !== previewSecret) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!req.query.id) {
    return res.status(400).json({ message: 'Missing composition ID' });
  }

  // get node path from composition ID
  const compositionId = req.query.id as string;
  const { nodes } = await getProjectMapClient().getNodes({
    compositionId,
  });
  const path = nodes && nodes.length > 0 ? nodes[0].path : '';

  let slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;

  // add slash to slug if missing and fallback to '/' if undefined
  slug = !slug ? '/' : slug.startsWith('/') ? slug : `/${slug}`;
  // add prefix for slug based preview route
  slug = `/preview/${slug}`;
  // decide how to redirect:
  // if project map path is set use it otherwise fallback to slug
  const url = path.length ? path : slug;

  if (req.query.disable) {
    res.clearPreviewData();
    res.redirect(url);
    return;
  }

  // enable preview mode and redirect to the slug to preview
  res.setPreviewData({ isPreview: true });
  setCookieSameSite(res, 'None');

  const newQuery = new URLSearchParams();
  queryParamsToPreserve.forEach(param => {
    const paramValue = req.query[param];
    if (typeof paramValue === 'string') {
      newQuery.append(param, paramValue);
    }
  });

  // TODO: reconsider how we set default localized url (now sets to /us/en-us)
  const defaultLanguage = 'en-us';
  const defaultCountry = 'us';
  const urlToRedirectTo = newQuery.toString()
    ? `/${defaultCountry}/${defaultLanguage}${url}?${newQuery.toString()}`
    : url;

  // console.log({ urlToRedirectTo });
  res.redirect(urlToRedirectTo);
};

export default handler;

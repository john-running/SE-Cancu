import { ContentfulClientList } from '@uniformdev/canvas-contentful';
import { createClient } from 'contentful';

export function formatLocale(locale: string) {
  if (!locale) {
    return locale;
  }

  const parts = locale.split('-');
  if (parts.length <= 1) {
    return locale;
  }

  const firstPart = parts[0];
  return firstPart;
}

export const contentfulClients = (): ContentfulClientList => {
  const contentfulSpaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
  const contentfulEnvironment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? 'master';
  const contentfulDeliveryToken = process.env.NEXT_PUBLIC_CONTENTFUL_CDA_ACCESS_TOKEN!;
  const contentfulPreviewToken = process.env.NEXT_PUBLIC_CONTENTFUL_CPA_ACCESS_TOKEN!;

  const client = createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulDeliveryToken,
  });

  const previewClient = createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulPreviewToken,
    host: 'preview.contentful.com',
  });

  const clientList = new ContentfulClientList({ client, previewClient });

  return clientList;
};

export const contentfulConfigured: boolean = ![
  process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
  process.env.NEXT_PUBLIC_CONTENTFUL_CDA_ACCESS_TOKEN,
  process.env.NEXT_PUBLIC_CONTENTFUL_CPA_ACCESS_TOKEN,
].includes(undefined);

import { getNodePathsByCompositionId } from '@/utils/canvas';
import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.query.secret as string | undefined;
  const { previewSecret } = getConfig().serverRuntimeConfig;
  if (secret !== previewSecret) {
    return res.status(401).json({ message: 'Secret was not provided or it does not match' });
  }
  try {
    const compositionId = req.body?.id;
    if (!compositionId) {
      console.log('No compositionId specified, skipping revalidation.');
      return res.json({ revalidated: false });
    }

    console.log('Revalidating composition ', { compositionId });
    const paths = await getPagePathsToRevalidate(compositionId);
    console.log('Revalidating paths: ', { paths });
    await Promise.allSettled(paths.map(async (p: string) => await res.revalidate(p)));
    console.log('revalidated all paths.');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating!');
  }
}

async function getPagePathsToRevalidate(compositionId: string) {
  return getNodePathsByCompositionId(compositionId);
}

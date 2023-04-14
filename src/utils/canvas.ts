import { countryLangConfig } from '@/constants';
import { CanvasClient, CANVAS_PUBLISHED_STATE, CANVAS_DRAFT_STATE } from '@uniformdev/canvas';
import { ProjectMapClient } from '@uniformdev/project-map';
import getConfig from 'next/config';
import runEnhancers from './enhancers';

const { serverRuntimeConfig } = getConfig() || {};
const { apiKey, apiHost, projectId } = serverRuntimeConfig || {};

const getCanvasClient = () => {
  if (!apiKey) {
    throw new Error('apiKey is not specified. CanvasClient cannot be instantiated: ' + apiKey);
  }

  if (!apiHost) throw new Error('apiHost is not specified. CanvasClient cannot be instantiated');

  if (!projectId) throw new Error('projectId is not specified. CanvasClient cannot be instantiated.');

  const client = new CanvasClient({
    apiKey,
    apiHost,
    projectId,
  });

  return client;
};

export const getProjectMapClient = () => {
  if (!apiHost) throw new Error('apiHost is not specified. Project Map client cannot be instantiated');

  if (!projectId) throw new Error('projectId is not specified. Project Map client cannot be instantiated');

  return new ProjectMapClient({
    apiKey,
    apiHost,
    projectId: projectId,
  });
};

export const getCompositionByNodePath = async (slug: string, context: any) => {
  const { composition } = await getCanvasClient().getCompositionByNodePath({
    projectMapNodePath: getNodePath(slug, context),
    state: getState(context),
    unstable_resolveData: true,
  });

  await runEnhancers(composition, context);

  return composition || {};
};

const getNodePath = (slug: string | Array<string>, context: { country: string; language: string }) => {
  if (!slug) {
    return '/';
  }
  const nodePath = !Array.isArray(slug) ? slug : slug.join('/');
  return !nodePath.startsWith('/') ? `/${nodePath}` : nodePath;
  //return `/${context.country}/${context.language}/${nodePath}`;
};

export const getCompositionBySlug = async (slug: string, context: any) => {
  if (!slug) throw new Error('composition slug is not provided');

  const compositionSlug = slug;
  const { preview } = context || {};

  const { composition } = await getCanvasClient().getCompositionBySlug({
    slug: compositionSlug,
    state: getState(preview),
  });

  await runEnhancers(composition, context);

  return { composition };
};

export const getCompositionById = async (
  id: string,
  enhanceComposition: boolean,
  context: { preview: boolean; language: string; country: string }
) => {
  if (!id) throw new Error('composition id is not provided');

  const { preview = false } = context || {};
  try {
    const { composition } = await getCanvasClient().getCompositionById({
      compositionId: id,
      state: getState(preview),
    });

    if (enhanceComposition) {
      await runEnhancers(composition, context);
    }

    return composition;
  } catch (err) {
    console.error({ err });
    return undefined;
  }
};

export const getCompositionList = async ({ type }: { language: string; type?: string | string[] }) => {
  return getCanvasClient()
    .getCompositionList({ skipEnhance: true, type, state: getState(false) })
    .then(c => c.compositions);
};

// TODO: add ignorePath filtering
export const getNodePaths = async (path: string = '/', ignorePaths: string[] = []) => {
  const { nodes } = await getProjectMapClient().getNodes({
    path,
  });

  if (!nodes || nodes.length < 0) {
    return [];
  }

  let nodePaths: any = await getNodesPaths(nodes);
  nodePaths = await (await Promise.all(nodePaths)).map((p: string) => p);
  return getLocalizedNodePaths(nodePaths);
};

export const getNodePathsByCompositionId = async (compositionId: string) => {
  const { nodes } = await getProjectMapClient().getNodes({
    compositionId,
  });

  if (!nodes || nodes.length < 0) {
    return [];
  }

  let nodePaths: any = await getNodesPaths(nodes);
  nodePaths = await (await Promise.all(nodePaths)).map((p: string) => p);
  return getLocalizedNodePaths(nodePaths);
};

export function getLocalizedNodePaths(nodePaths: Array<string>) {
  let localizedPaths: string[] = [];
  const countries = Array.from(countryLangConfig.keys()).filter(c => c);
  nodePaths.forEach((nodePath: string) => {
    countries.forEach((country: string) =>
      countryLangConfig.get(country)?.forEach((lang: string) => {
        if (nodePath) {
          localizedPaths.push(`/${country}/${lang}${nodePath}`.toLocaleLowerCase());
        }
      })
    );
  });
  return localizedPaths;
}

async function getNodesPaths(nodes: Array<any>) {
  return nodes
    ?.filter((node: any) => node?.compositionId! && node.type === 'composition')
    .map(async (node: any) => {
      const composition = await getCompositionById(node.compositionId, false, {
        language: 'en-us',
        country: 'us',
        preview: false,
      });
      if (!composition) return undefined;
      return node.path;
    });
}

export const getState = (preview: boolean | undefined) =>
  process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE;

export const hideFromFeaturedArticles = async (preview: boolean) => {
  const { compositions } = await canvasClient().getCompositionList({
    state: getState(preview),
    type: 'article',
  });
  return compositions
    ? compositions
        .map((c: any) => {
          const { composition } = c;
          const { hideFromFeatured, articleContent } = composition.parameters || {};
          if (hideFromFeatured?.value === true) {
            return articleContent.value?.entryId;
          }
        })
        .filter(a => a)
    : ([] as any);
};

export const hideFromSubNavigation = async (preview: boolean) => {
  const { compositions } = await canvasClient().getCompositionList({
    state: getState(preview),
    type: 'article',
  });
  return compositions
    ? compositions
        .map((c: any) => {
          const { composition } = c;
          const { hideFromSubnav, articleContent } = composition.parameters || {};
          if (hideFromSubnav?.value === true) {
            return articleContent?.value?.entryId;
          }
        })
        .filter(a => a)
    : ([] as any);
};

export const getCanvasArticles = async (preview: boolean) => {
  const CanvasArticles: string[] = [];
  const { compositions } = await canvasClient().getCompositionList({
    state: getState(preview),
    type: 'article',
  });
  compositions.forEach(member => {
    const { composition } = member;
    const { articleContent } = composition.parameters || {};

    if (articleContent) {
      CanvasArticles.push(articleContent.value?.entryId);
    }
  });
  return CanvasArticles;
};

export const canvasClient = () => {
  const {
    serverRuntimeConfig: { apiKey, projectId, apiHost },
  } = getConfig();

  const client = new CanvasClient({
    apiKey: apiKey,
    projectId: projectId,
    apiHost: apiHost,
  });

  return client;
};

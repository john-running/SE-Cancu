import { hideFromSubNavigation, getCanvasArticles } from '@/utils/canvas';

const articleListNavigationEnhancer = async (data: any, preview: boolean) => {
  const featured = await hideFromSubNavigation(preview);
  const canvasArticles = await getCanvasArticles(preview);
  return data.parameter.value
    .filter((articleEntry: any) => !featured.includes(articleEntry.id))
    .filter((articleEntry: any) => canvasArticles.includes(articleEntry.id));
};

export default articleListNavigationEnhancer;

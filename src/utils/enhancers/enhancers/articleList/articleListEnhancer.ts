import { hideFromFeaturedArticles, getCanvasArticles } from '@/utils/canvas';

const articleListEnhancer = async (data: any, preview: boolean) => {
  const featured = await hideFromFeaturedArticles(preview);
  const canvasArticles = await getCanvasArticles(preview);
  if (featured && featured.length > 0) {
    return data.parameter.value
      .filter((articleEntry: any) => !featured.includes(articleEntry.id))
      .filter((articleEntry: any) => canvasArticles.includes(articleEntry.id));
  }
  return data.parameter.value;
};

export default articleListEnhancer;

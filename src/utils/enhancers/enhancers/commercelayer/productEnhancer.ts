import { cms } from '@/utils/cms';

const productEnhancer = async (data: any, locale: string, preview: boolean) => {
  const { parameter } = data;
  if (data.parameter.value) {
    return await cms().getProductById(data.parameter.value.entryId ?? data.parameter.value, locale, preview);
  }
  return parameter.value;
};

export default productEnhancer;

const algoliaRecommendCurrentProductOverwrite = ({ parameter, productId }: { parameter: any; productId: string }) => {
  // productId is not supplied in preview and on the PDP page, so we can't override it
  if (productId) {
    // if that's the algolia-recommend parameter type
    if (parameter.type === 'algolia-recommend') {
      const value = {
        ...parameter.value,
        recommendOptions: {
          ...parameter.value.recommendOptions,
          // overwriting objectId with current product id
          objectId: productId,
        },
      };
      return value;
    }
  }

  return parameter.value;
};

export default algoliaRecommendCurrentProductOverwrite;

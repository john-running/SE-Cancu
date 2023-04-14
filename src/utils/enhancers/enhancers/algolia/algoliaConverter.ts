const algoliaConverter = ({ component, parameter }: { component: Type.ComponentInstance; parameter: any }) => {
  const value = parameter.value;
  if (Array.isArray(value) && value.length === 1) {
    return value[0];
  }
  if (Array.isArray(value)) {
    const products = value.map(p => transformProduct(p));
    return products;
  }

  return value;
};

function transformProduct(product: any) {
  try {
    const productData = {
      ...product,
      id: product.objectID,
    };
    return productData;
  } catch (err) {
    console.log({ err });
  }
}

export default algoliaConverter;

import { useContext } from 'react';
import {} from '@commercelayer/react-components';
import ProductSearch from '@/components/commercelayer/ProductSearch';
import { CommerceContext } from '@/context/commerce/CommerceContext';

const ProductsSectionContainer = () => {
  const commerceContext = useContext(CommerceContext);
  const { cms, filters } = commerceContext || {};
  return <ProductSearch cms={cms!} filters={filters} />;
};

export default ProductsSectionContainer;

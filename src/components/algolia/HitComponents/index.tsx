import React from 'react';
import { Hits } from 'react-instantsearch-hooks-web';
import { ComponentInstance } from '@uniformdev/canvas';
import ProductItem from '../../products/ProductItem';

enum HitTypes {
  Product = 'algolia-hitProduct',
}

const RenderHits: React.FC<ComponentInstance> = component => {
  const { type } = component?.slots?.hitComponent?.[0] || {};

  const listClassNames = {
    list: 'grid gap-y-3 mb-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8 sm:gap-y-6 lg:gap-x-8 lg:gap-y-5 sm:mb-0',
  };

  const ProductHit = ({ hit }: { hit: object }) => <ProductItem product={hit} />;

  switch (type) {
    case HitTypes.Product: {
      return <Hits hitComponent={ProductHit} classNames={listClassNames} />;
    }
    default:
      return <Hits hitComponent={ProductHit} classNames={listClassNames} />;
  }
};

export default RenderHits;

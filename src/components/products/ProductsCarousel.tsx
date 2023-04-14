import React from 'react';
import Container, { BackgroundTypes } from '@/components/_atoms/BaseContainer';
import ButtonLink from '@/components/_atoms/ButtonLink';
import ProductItem from './ProductItem';
import Carousel from '@/components/Carousel';
import { Product } from '@/types/commerce';
import CarouselBlock from '../CarouselBlock';

interface Props {
  title: string;
  subTitle?: string;
  seeMoreTitle: string;
  seeMoreUrl: string;
  category: {
    name: string;
    label: string;
    products: Product[];
  };
  products?: Product[];
  addToCart?: boolean;
}

const ProductsCarousel: React.FC<Type.ComponentProps<Props>> = ({
  title,
  subTitle,
  category,
  seeMoreTitle,
  seeMoreUrl,
  component,
  products,
  addToCart = false,
}) => {
  const isDark = component.variant === BackgroundTypes.Dark.toLowerCase();
  const productsForDisplay = category?.products ?? products;
  if (!productsForDisplay) {
    return null;
  }
  return (
    <CarouselBlock
      title={title}
      subTitle={subTitle}
      buttonCopy={seeMoreTitle}
      buttonLink={seeMoreUrl?.path}
      isDark={isDark}
    >
      {productsForDisplay.map((item: any) => (
        <ProductItem key={`featured-product-${item.id}`} product={item} showAddToCart={addToCart} isDark={isDark} />
      ))}
    </CarouselBlock>
  );
};

export default ProductsCarousel;

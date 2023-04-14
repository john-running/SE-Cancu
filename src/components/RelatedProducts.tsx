import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { BackgroundTypes } from './_atoms/BaseContainer';
import Carousel from '../components/Carousel';
import ProductItem from './products/ProductItem';

type Props = ComponentProps<{
  title: string;
  products: Type.Product[];
}>;

const RelatedProducts: FC<Props> = ({ title, products }) => (
  <Container backgroundType={BackgroundTypes.LightGray}>
    <span className="w-fit dark:border-b-gray-800 h-10 font-bold text-2xl text-center">
      {products ? title : 'No product recommendations, come back later :)'}
    </span>
    <div className="mt-6" />
    {products?.length ? (
      <Carousel itemClass="px-2" containerClass="-mx-2">
        {products?.map(item => (
          <ProductItem key={item.id} product={item} />
        ))}
      </Carousel>
    ) : products ? (
      <ProductItem key={products.id} product={products} />
    ) : null}
  </Container>
);

registerUniformComponent({
  type: 'relatedProducts',
  component: RelatedProducts,
});

export default RelatedProducts;

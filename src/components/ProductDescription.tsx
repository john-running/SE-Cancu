import { FC, useContext } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { first } from 'lodash';
import { CommerceContext } from '@/context/commerce/CommerceContext';

import Container from './_atoms/BaseContainer';

type Props = ComponentProps<{
  title: string;
}>;

const ProductDescription: FC<Props> = ({ title }) => {
  const commerceContext = useContext(CommerceContext);
  const { product } = commerceContext || {};
  const { description } = product || {};
  return (
    <Container>
      <div className="w-fit font-overpass font-extrabold text-3xl leading-6">{title}</div>
      <div className="mt-4 w-4/5">
        <div className="product-description leading-6" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </Container>
  );
};

registerUniformComponent({
  type: 'productDescription',
  component: ProductDescription,
});

export default ProductDescription;

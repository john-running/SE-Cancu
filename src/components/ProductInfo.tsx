import { FC, useContext } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { first } from 'lodash';
import { CommerceContext } from '@/context/commerce/CommerceContext';
import { Price, PricesContainer } from '@commercelayer/react-components';

type Props = ComponentProps<{
  product: Type.Product;
}>;

const ProductInfo: FC<Props> = () => {
  const commerceContext = useContext(CommerceContext);
  const { product } = commerceContext || {};
  const { name, description, variants } = product || {};
  const firstVariantCode = first(variants)?.code;

  return (
    <div className="md:pt-8 pt-4">
      <p className="font-bold text-4xl lg:text-5xl">{name}</p>
      {/* <p className="md:pt-8 pt-4 leading-relaxed text-clip">{description}</p> */}
      <div className="flex flex-row w-28 justify-between mt-8 leading-5 text-2xl">
        <PricesContainer>
          <Price skuCode={firstVariantCode} className="mr-1" compareClassName="text-gray-500 line-through text-lg" />
        </PricesContainer>
      </div>
      <div className="border-gray-100 border-t-2 my-7" />
    </div>
  );
};

registerUniformComponent({
  type: 'productInfo',
  component: ProductInfo,
});

export default ProductInfo;

import React from 'react';
import Link from '@/components/_atoms/Link';
import { Price, PricesContainer, AvailabilityContainer, AvailabilityTemplate } from '@commercelayer/react-components';
import Image from '@/components/_atoms/Image';
import { NoImageSrc } from '@/constants';
import { buildProductDetailLink } from '@/utils/index';
import AddToCartButton from '@/components/AddToCartButton';
import { Product } from '@/types/commerce';
import { first } from 'lodash';

interface Props {
  title?: string;
  product: Product;
  withoutPrice?: boolean;
  showAddToCart?: boolean;
  styleType?: 'default' | 'menu';
}

const ProductItem: React.FC<Props> = ({
  product,
  withoutPrice = false,
  showAddToCart = false,
  styleType = 'default',
}) => {
  if (!product) return null;
  const { name, slug, images, variants, price, formattedPrice, comparePrice, formattedComparePrice, availability } =
    product || {};
  const imageSrc = first(images)?.url ?? first(images) ?? NoImageSrc;
  const sku = first(variants)?.code ?? first(variants);

  return (
    <div className="flex flex-1 flex-col w-full mx-auto mb-auto mt-0 h-full">
      <div className="relative flex flex-col items-center lg:px-0 h-full">
        <Link className="group flex flex-col cursor-pointer w-full h-full" {...buildProductDetailLink({ slug })}>
          <div className="relative p-[0px] w-full h-auto pb-[calc(100%-36px)] border-[18px] border-white outline-1 outline outline-gray-100 bg-white">
            <div className="absolute left-0 top-0 h-full w-full group-hover:scale-105 transition-all">
              <Image
                className="object-contain"
                fill
                src={imageSrc}
                alt={product.name}
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </div>
          <span className="font-bold overflow-hidden text-ellipsis text-2xl mt-6">{product.name}</span>
          <div className="flex h-14">
            {!withoutPrice && price ? (
              <div className="flex h-14">
                <span className="text-green-600 mr-1 text-base md:text-sm">{formattedPrice}</span>
                {comparePrice ? (
                  <span className="text-gray-500 line-through text-sm md:text-xs">{formattedComparePrice}</span>
                ) : null}
                {availability ? (
                  <span className="text-gray-400 ml-3 text-base md:text-sm">{availability} available</span>
                ) : (
                  <AvailabilityContainer skuCode={sku}>
                    <AvailabilityTemplate showShippingMethodName={true}></AvailabilityTemplate>
                  </AvailabilityContainer>
                )}
              </div>
            ) : (
              <PricesContainer skuCode={sku}>
                <Price
                  className="text-green-600 mr-1 text-base md:text-sm"
                  compareClassName="text-gray-500 line-through text-sm md:text-xs"
                />
              </PricesContainer>
            )}
          </div>
        </Link>
        {showAddToCart && (
          <AddToCartButton
            product={product}
            quantity={1}
            styleType="primary"
            className="w-full md:w-32 !px-2 text-sm"
          />
        )}
      </div>
    </div>
  );
};

export default ProductItem;

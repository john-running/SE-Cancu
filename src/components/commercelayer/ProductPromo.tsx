import React from 'react';
import { first } from 'lodash';
import { Price, PricesContainer } from '@commercelayer/react-components';
import { Product } from '@/types/commerce';
import ButtonLink from '../_atoms/ButtonLink';
import Container, { PaddingSize } from '../_atoms/BaseContainer';
import Image from '@/components/_atoms/Image';
import Link from '@/components/_atoms/Link';
import { buildProductDetailLink } from '@/utils/index';

type ProductPromoProps = Type.ComponentProps<{
  product: Product;
  buttonCopy: string;
  buttonLink: string;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
}>;

const ProductPromo = ({
  product,
  buttonCopy,
  paddingTop = PaddingSize.Medium,
  paddingBottom = PaddingSize.Medium,
}: ProductPromoProps) => {
  const { id, slug, images, name, description, variants } = product || {};
  const productImage = images && Array.isArray(images) && images.length > 0 ? images[0].url : undefined;
  const code = first(variants)?.code;

  const href = buildProductDetailLink({ slug }).href;
  return (
    <Container paddingTop={paddingTop} paddingBottom={paddingBottom}>
      <div className="flex flex-col lg:flex-row gap-x-16 max-w-sm sm:max-w-xl lg:max-w-full">
        {productImage ? (
          <div className="basis-1/2">
            <Image layout="responsive" width={1280} height={1280} src={productImage} alt={`${name}-product-image`} />
          </div>
        ) : null}
        <div className="flex flex-col justify-center pt-8 md:pt-12 lg:pt-0 basis-1/2">
          <p className="font-extrabold text-3xl">{name}</p>
          {Boolean(description) && (
            <div className="product-description pt-6" dangerouslySetInnerHTML={{ __html: description }} />
          )}
          {id && (
            <Link href={href}>
              <p className="uppercase w-max font-extrabold tracking-wider text-sm mt-10 px-8 py-3 border-2 border-black text-center cursor-pointer hover:bg-black hover:text-white">
                {buttonCopy}
              </p>
            </Link>
          )}
          <PricesContainer skuCode={code}>
            <Price
              className="text-green-600 mr-1 text-base md:text-sm"
              compareClassName="text-gray-500 line-through text-sm md:text-xs"
            />
          </PricesContainer>
          <ButtonLink text={buttonCopy} href={href} className="mt-6 text-sm md:mt-10" />
        </div>
      </div>
    </Container>
  );
};

export default ProductPromo;

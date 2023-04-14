import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from './_atoms/BaseContainer';
import Button from './Button';
import { withContent } from '../hocs/withContent';

export enum DirectionVariant {
  Right = 'imageRight',
  Left = 'imageLeft',
}

const DirectionClasses = {
  [DirectionVariant.Right]: 'lg:flex-row-reverse',
  [DirectionVariant.Left]: 'lg:flex-row',
};

export type FeaturedProductProps = ComponentProps<{
  product: {
    name: string;
    description?: string;
    images: Array<string>;
  };
  buttonCopy?: string;
  buttonUrl?: { path: string };
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
}>;

const FeaturedProductVariation: FC<FeaturedProductProps & { direction?: DirectionVariant }> = ({
  product,
  direction,
  buttonCopy,
  buttonUrl,
  paddingTop = PaddingSize.Medium,
  paddingBottom = PaddingSize.Medium,
}) => {
  const { name, description, images } = product || {};
  return (
    <Container paddingTop={paddingTop} paddingBottom={paddingBottom}>
      <div
        className={classNames(
          'flex flex-col gap-x-16 gap-y-16 max-w-full lg:items-center',
          direction ? DirectionClasses[direction] : ''
        )}
      >
        <div className="basis-1/2">
          {images?.length > 0 && <Image width={504} height={504} src={images[0]} alt="featured callout" />}
        </div>
        <div className="flex flex-col justify-center pt-8 md:pt-12 lg:pt-0 basis-1/2">
          <p className="font-extrabold text-3xl">{name}</p>
          {Boolean(description) && <div className="product-description pt-6">{description}</div>}
          {buttonCopy && buttonUrl && (
            <Button.Link
              href={buttonUrl.path}
              styleType="primary"
              ariaLabel={buttonCopy}
              className="mt-6 text-sm md:mt-10 w-max"
            >
              <span>{buttonCopy}</span>
            </Button.Link>
          )}
        </div>
      </div>
    </Container>
  );
};

const FeaturedProduct: FC<FeaturedProductProps> = props => (
  <FeaturedProductVariation direction={props.component.variant as DirectionVariant} {...props} />
);

['imageLeft', 'imageRight', undefined].forEach(variantId =>
  registerUniformComponent({
    type: 'FeaturedProduct',
    component: withContent(FeaturedProduct),
    variantId,
  })
);

export default FeaturedProduct;

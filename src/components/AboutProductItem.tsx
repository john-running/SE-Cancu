import React from 'react';
import classNames from 'classnames';
import Image from '@/components/_atoms/Image';
import { NoImageSrc } from '@/constants';

export enum DirectionTypes {
  Right = 'Right',
  Left = 'Left',
}

const DirectionClasses = {
  [DirectionTypes.Right]: 'lg:flex-row',
  [DirectionTypes.Left]: 'lg:flex-row-reverse',
};

interface BaseProps {
  title: string;
  content?: string;
  image: string;
  imageWidth: number | string;
  imageHeight: number | string;
  direction: DirectionTypes;
}

interface Props {
  direction: DirectionTypes;
  entry: Enhancers.AboutProductItem;
}

const AboutProductItem: React.FC<BaseProps> = ({ direction, title, content, image, imageHeight, imageWidth }) => (
  <div
    className={classNames(
      'flex flex-col gap-x-14 pb-10 lg:pb-20 last:pb-0 lg:items-center',
      DirectionClasses[direction]
    )}
  >
    <div className="basis-5/12 pb-5 lg:pb-0">
      <p className="lg:text-3xl text-xl font-extrabold pb-5 lg:pb-10">{title}</p>
      {Boolean(content) && <p>{content}</p>}
    </div>
    <div className="basis-7/12">
      <Image
        src={image || NoImageSrc}
        width={imageWidth || 600}
        height={imageHeight || 600}
        alt="about-product-image"
        layout="responsive"
      />
    </div>
  </div>
);
const mapProps = (Component: React.FC<BaseProps>): React.FC<BaseProps> => {
  const ComponentWithMappedProps = (props: Props | BaseProps) => {
    if ((props as Props).entry) {
      const { entry, direction } = props as Props;

      const mappedProps: BaseProps = {
        title: entry.heading,
        content: entry.description,
        image: entry.image?.src,
        imageWidth: entry.image?.width,
        imageHeight: entry.image?.height,
        direction,
      };

      return <Component {...mappedProps} />;
    }

    return <Component {...(props as BaseProps)} />;
  };
  return ComponentWithMappedProps;
};

export default mapProps(AboutProductItem);

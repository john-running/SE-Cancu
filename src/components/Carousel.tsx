import React from 'react';
import MultiCarousel, { CarouselProps, ResponsiveType } from 'react-multi-carousel';
import CarouselButtons from '@/components/CarouselButtons';
import 'react-multi-carousel/lib/styles.css';

interface Props extends Omit<CarouselProps, 'responsive'> {
  children: JSX.Element[];
  responsive?: ResponsiveType;
  dark?: boolean;
}

const defaultResponsiveData = {
  desktop: {
    breakpoint: { max: Infinity, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 568 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 568, min: 0 },
    items: 1,
  },
};

const Carousel: React.FC<Props> = ({ children, dark, responsive, ...rest }) => {
  const responsiveData = responsive || defaultResponsiveData;
  return (
    <MultiCarousel
      ssr
      deviceType="desktop"
      customButtonGroup={<CarouselButtons dark={dark} />}
      renderButtonGroupOutside
      renderDotsOutside
      shouldResetAutoplay={false}
      responsive={responsiveData}
      arrows={false}
      {...rest}
    >
      {children}
    </MultiCarousel>
  );
};

export default Carousel;

import React from 'react';

type PromoProps = Type.ComponentProps<{
  image: string;
  description?: string;
  counter?: string;
}>;

const Promo: React.FC<PromoProps> = ({ image, description, counter }) => (
  <div className="relative">
    {image?.src ? <img className="absolute" srcSet={image.srcSet} src={image?.src} alt={description} /> : null}
    <div className="relative flex items-center justify-center px-4 py-56 z-30">
      <div className="text-white text-3xl md:text-5xl font-bold text-center max-w-[600px]">
        {counter} {description}
      </div>
    </div>
  </div>
);

export default Promo;

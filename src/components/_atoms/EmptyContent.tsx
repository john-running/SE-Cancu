import React from 'react';
import Image from '@/components/_atoms/Image';

interface Props {
  title: string;
  imageLink?: string;
  text?: string;
  isLoad?: boolean;
}

const EmptyContent: React.FC<Props> = ({ title, imageLink = '', text = '', isLoad = false }) => (
  <div className="pt-14 lg:mb-28 flex flex-col justify-center items-center h-full text-center">
    {!isLoad && (
      <>
        <div className="mt-7 font-bold text-3xl">{title}</div>
        {imageLink && (
          <div className="mt-7">
            <Image src={imageLink} alt="Wishlist" width={76} height={75} layout="fixed" />
          </div>
        )}
        {title && <div className="mt-7">{text}</div>}
      </>
    )}
  </div>
);

export default EmptyContent;

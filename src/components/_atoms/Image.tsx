import React, { memo } from 'react';
import NextImage, { ImageProps, ImageLoader } from 'next/image';

const getIsCloudinarySrc = (src: string): boolean => src.includes('res.cloudinary.com');

const customLoader: ImageLoader = ({ src, width }) => {
  if (!getIsCloudinarySrc(String(src))) return src;
  return String(src).replace('/upload/', `/upload/q_auto,f_auto${width ? `,w_${width}` : ''}/`);
};

const Image: React.FC<ImageProps> = ({ src, ...restProps }) => (
  <NextImage
    src={src}
    {...restProps}
    loader={!String(src).startsWith('http') || getIsCloudinarySrc(String(src)) ? customLoader : undefined}
  />
);

export default memo(Image);

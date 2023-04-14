import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const IconUniformLogo: React.FC<Props> = ({ width = 18, height = 21 }) => (
  <svg width={width} height={height} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.27287 0.0883789L0.5 3.42171V10.0884L6.27287 6.75506L12.0472 3.42171L6.27287 0.0883789Z"
      fill="#83C6E1"
    />
    <path
      d="M6.27287 13.4217V6.755L0.5 10.0884V16.755L6.27287 20.0884L12.0472 16.755V10.0884L6.27287 13.4217Z"
      fill="#438FD5"
    />
    <path
      d="M12.0471 3.42169L6.27283 6.75502L12.0471 10.0883V16.755L17.82 13.4217V6.75502L12.0471 3.42169Z"
      fill="#F4220B"
    />
  </svg>
);

export default IconUniformLogo;

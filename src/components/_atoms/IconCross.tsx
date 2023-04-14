import React from 'react';

const IconCross = ({ width = 16, height = 16, className = '' }: Type.IconProps) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 12 12"
    fill="none"
    strokeWidth="1px"
    stroke="black"
  >
    <path d="M5.99243 4.51968L10.2426 0.269035L11.7163 1.7568L7.47971 5.99292L11.7163 10.2431L10.2426 11.7168L5.99243 7.4802L1.75631 11.7168L0.268555 10.2431L4.51919 5.99292L0.268555 1.7568L1.75631 0.269035L5.99243 4.51968Z" />
  </svg>
);

export default IconCross;

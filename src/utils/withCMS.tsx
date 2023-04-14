import React, { ComponentType } from 'react';

const withCMS =
  (BaseComponent: React.ComponentType): ComponentType<any> =>
  ({ entry, ...props }: Type.CMSProps) =>
    <BaseComponent {...(entry?.fields || {})} {...props.content} />;

export default withCMS;

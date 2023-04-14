import React from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import RenderHits from './HitComponents';

const CanvasHits = (componentProps: ComponentProps) => {
  return <div className="pt-2">{RenderHits(componentProps.component)}</div>;
};

registerUniformComponent({
  type: 'algolia-hits',
  component: CanvasHits,
});

export default CanvasHits;

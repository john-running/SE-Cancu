import React from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';

const FeatureGrid = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-14">
    <UniformSlot name="content" />
  </div>
);

export default FeatureGrid;

import React from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';

interface Props {
  title?: string;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
  desktopColumnSize: number;
  tabletColumnSize: number;
  mobileColumnSize: number;
}

const SpotlightList: React.FC<Props> = ({
  title = '',
  paddingTop = PaddingSize.Medium,
  paddingBottom = PaddingSize.Medium,
  desktopColumnSize = 3,
  tabletColumnSize = 2,
  mobileColumnSize = 1,
}) => (
  <Container paddingBottom={paddingBottom} paddingTop={paddingTop}>
    {title && (
      <div className="w-full mt-2 font-bold text-3xl">
        <h2>{title}</h2>
      </div>
    )}
    <div
      className={`grid lg:grid-cols-${desktopColumnSize} md:grid-cols-${tabletColumnSize} sm:grid-cols-${mobileColumnSize}`}
    >
      <UniformSlot name="spotlightItem">
        {({ child }: any) => (
          <div key={child.key} className="md:mt-11 mt-5">
            {child}
          </div>
        )}
      </UniformSlot>
    </div>
  </Container>
);

export default SpotlightList;

import React from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import classNames from 'classnames';
import Container, { PaddingSize, BackgroundTypes } from '@/components/_atoms/BaseContainer';

type Columns = '3' | '4' | '5' | '6' | '7' | '8' | '9';

type GridOrder = 'order-first' | 'order-last';

interface Props {
  verticalAlignment: 'items-start' | 'items-center' | 'items-end';
  leftContentColumns: Columns;
  rightContentColumns: Columns;
  mobileItemsOrder: GridOrder;
  hideBottomBorder?: boolean;
  backgroundType: BackgroundTypes;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
}

const SectionTwoColumns: React.FC<Props> = ({
  leftContentColumns = 6,
  rightContentColumns = 6,
  verticalAlignment,
  mobileItemsOrder,
  hideBottomBorder = false,
  backgroundType = BackgroundTypes.White,
  paddingTop = PaddingSize.Medium,
  paddingBottom = PaddingSize.Medium,
}) => (
  <Container backgroundType={backgroundType} paddingBottom={paddingBottom} paddingTop={paddingTop}>
    <div
      className={classNames(`grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-0 pb-12`, verticalAlignment, {
        ' border-b-2': !hideBottomBorder,
      })}
    >
      <div className={classNames('lg:order-none', [`lg:col-span-${leftContentColumns}`], mobileItemsOrder)}>
        <UniformSlot name="leftContent" />
      </div>
      <div className={classNames('lg:col-end-13', [`lg:col-span-${rightContentColumns}`])}>
        <UniformSlot name="rightContent" />
      </div>
    </div>
    <div className="lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 hidden" />
  </Container>
);

export default SectionTwoColumns;

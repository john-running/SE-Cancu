import React from 'react';
import ButtonAction from '@/components/_atoms/ButtonAction';
import { Product } from '@/types/commerce';

interface Props {
  product: Product;
  quantity: number;
  className?: string;
  styleType?: 'primary' | 'secondary';
  buttonCopy?: string;
}

const AddToCartButton: React.FC<Props> = ({
  product,
  quantity,
  className = '',
  styleType = 'secondary',
  buttonCopy = 'Add to Cart',
}) => {
  return (
    <ButtonAction className={className} styleType={styleType}>
      <span>{buttonCopy}</span>
    </ButtonAction>
  );
};

export default AddToCartButton;

import { FC, useContext } from 'react';
import { CommerceContext } from '@/context/commerce/CommerceContext';
import LayoutContext from '@/context/LayoutContext';
import Button from './Button';
import { AddToCartButton } from '@commercelayer/react-components';
import { first } from 'lodash';

interface Props {
  product: Type.Product;
  quantity: number;
  className?: string;
  styleType?: 'primary' | 'secondary';
  buttonCopy?: string;
}

const AddToCartCustom = (props: any) => {
  const { className, label, disabled, handleClick } = props;
  const { handleAnimation } = useContext(LayoutContext);
  const customHandleClick = async (e: any) => {
    const { success } = await handleClick(e);
    if (success && handleAnimation) handleAnimation(e);
  };
  return (
    <Button.Action styleType={'primary'} disabled={disabled} className={className} onClick={customHandleClick}>
      <span>{disabled ? 'out of stock' : label}</span>
    </Button.Action>
  );
};

const ProductAddToCartButton: FC<Props> = ({ quantity }) => {
  const commerceContext = useContext(CommerceContext);
  const { product } = commerceContext || {};
  const { variants } = product || {};
  const firstVariantCode = first(variants)?.code;
  return (
    <AddToCartButton disabled={product?.availability === 0} quantity={quantity} skuCode={firstVariantCode}>
      {AddToCartCustom}
    </AddToCartButton>
  );
};

export default ProductAddToCartButton;

import React from 'react';
import Link from '../_atoms/Link';

type CartPromotionProps = Type.ComponentProps<{
  title: string;
  text?: string;
  ctaTitle?: string;
  ctaLink?: string;
}>;

const CartPromotion: React.FC<CartPromotionProps> = ({ title, text, ctaTitle, ctaLink }) => (
  <section
    aria-labelledby="sale-heading"
    className="relative mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8"
  >
    <div className="mx-auto max-w-2xl lg:max-w-none">
      <h2
        id="sale-heading"
        className="text-2xl font-bold tracking-tight text-gray-900"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h2>
      <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600" dangerouslySetInnerHTML={{ __html: text }} />
      {ctaLink && ctaTitle ? (
        <Link
          href={ctaLink}
          className="mt-6 inline-block w-full rounded-md border border-transparent bg-red-900 py-3 px-8 font-medium hover:bg-red-800 sm:w-auto text-white hover:text-white"
        >
          {ctaTitle}
        </Link>
      ) : null}
    </div>
  </section>
);

export default CartPromotion;

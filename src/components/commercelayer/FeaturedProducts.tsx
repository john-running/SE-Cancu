import React from 'react';
import { first } from 'lodash';
import { Price, PricesContainer } from '@commercelayer/react-components';
import { Product } from '@/types/commerce';
import { useRouter } from 'next/router';
import Link from '@/components/_atoms/Link';
import translations from '@/translations/index';
import ButtonLink from '@/components/_atoms/ButtonLink';
import Container, { BackgroundTypes } from '../Container';
import { buildProductDetailLink } from '@/utils/index';

type FeaturedProductsProps = Type.ComponentProps<{
  title: string;
  subtitle?: string;
  seeMoreTitle?: string;
  seeMoreLink?: string;
  productDisplayLimit: number;
  category: {
    name: string;
    label: string;
    products: Product[];
  };
}>;

const FeaturedProducts = ({
  title,
  subTitle,
  seeMoreTitle,
  seeMoreUrl,
  productDisplayLimit,
  category,
  component,
}: FeaturedProductsProps) => {
  const {
    query: { lang },
  } = useRouter();
  const isDark = component.variant === BackgroundTypes.Dark.toLowerCase();
  return (
    <Container backgroundType={isDark ? BackgroundTypes.Dark : BackgroundTypes.LightGray}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10">
        <div className="mb-6 md:mb-0 basis-2/3 xl:basis-auto">
          <p className="font-acumin font-extrabold text-3xl">{title}</p>
          {subTitle && <p className="sm:pr-8">{subTitle}</p>}
        </div>
        {seeMoreTitle && seeMoreUrl?.path && (
          <ButtonLink href={seeMoreUrl.path} text={seeMoreTitle} styleType={isDark ? 'secondary' : 'primary'} />
        )}
      </div>
      <div className="mt-10 sm:ml-10 lg:col-span-2">
        <ul className="md:pt-7 space-y-12 sm:grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
          {category.products
            ?.slice(0, productDisplayLimit)
            .map(({ images, name, variants, reference, slug }, key: number) => {
              const img = first(images)?.url;
              const code = first(variants)?.code;
              return (
                <li key={key}>
                  <Link {...buildProductDetailLink({ slug })}>
                    <div className="flex flex-col h-full shadow-lg rounded-lg p-5 md:p-3 cursor-pointer hover:opacity-75 hover:shadow-2xl">
                      <div className="aspect-w-3 aspect-h-2 mb-5">
                        <img className="object-contain" src={`${img}`} alt={name} />
                      </div>
                      <div className="text-base leading-6 font-medium space-y-1 justify-self-start h-full">
                        <h3>{name}</h3>
                        <p className="text-gray-700 text-sm">{reference}</p>
                      </div>
                      <div className="justify-self-end mt-5">
                        <ul className="flex justify-between space-x-1 items-center">
                          <li>
                            <PricesContainer skuCode={code}>
                              <Price
                                className="text-green-600 mr-1 text-base md:text-sm"
                                compareClassName="text-gray-500 line-through text-sm md:text-xs"
                              />
                            </PricesContainer>
                          </li>
                          <li>
                            <a className="inline-flex uppercase items-center p-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              {translations[(lang as string) ?? 'en-us']?.viewMore}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </Container>
  );
};

export default FeaturedProducts;

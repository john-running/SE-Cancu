import React, { ComponentType, FunctionComponent } from 'react';
import {
  LineItemsContainer,
  LineItemsCount,
  LineItem,
  LineItemImage,
  LineItemName,
  LineItemQuantity,
  Errors,
  LineItemAmount,
  LineItemRemoveLink,
  SubTotalAmount,
  DiscountAmount,
  ShippingAmount,
  TaxesAmount,
  GiftCardAmount,
  TotalAmount,
  CheckoutLink,
} from '@commercelayer/react-components';
import { Transition } from '@headlessui/react';
import translations from '@/translations/index';
import { useRouter } from 'next/router';
import { UniformComposition, DefaultNotImplementedComponent, UniformSlot } from '@uniformdev/canvas-react';
import ProductPromo from './ProductPromo';
import CartPromotion from './CartPromotion';
import { RootComponentInstance } from '@uniformdev/canvas/.';
import Alert from '../Alert';

type CustomRemoveLinkProps = {
  handleRemove: (e: any) => void;
};

const CustomRemoveLink: FunctionComponent<CustomRemoveLinkProps> = ({ handleRemove }) => {
  return (
    <a title="Remove" href="#" onClick={handleRemove}>
      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </a>
  );
};

type Props = {
  handleAnimation: (e: any) => void;
  lang?: string;
  active: boolean;
  composition: RootComponentInstance;
};

const ShoppingBag: React.FunctionComponent<Props> = ({ composition, handleAnimation, active }) => {
  const {
    query: { lang },
  } = useRouter();
  return (
    <UniformComposition data={composition} resolveRenderer={resolveRenderer}>
      <div className={`fixed inset-0 overflow-hidden ${!active ? 'hidden' : 'z-10'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition
            show={active}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          </Transition>
          <section
            className="absolute inset-y-0 right-0 pl-10 max-w-full flex overflow-auto"
            aria-labelledby="slide-over-heading"
          >
            <Transition
              className="md:w-screen max-w-sm md:max-w-md lg:max-w-lg bg-white"
              show={active}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="flex flex-col space-y-6 py-6 bg-white">
                <LineItemsContainer>
                  <UniformSlot name="cartTop" />
                  <header className="px-4 sm:px-6">
                    <div className="flex items-start justify-between space-x-3">
                      <h2 className="text-lg leading-7 font-medium text-gray-900">
                        {translations[lang as string]?.yourShoppingCart} <LineItemsCount />{' '}
                        {translations[lang as string]?.items}
                      </h2>
                      <div className="h-7 flex items-center">
                        <button
                          aria-label="Close panel"
                          className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                          onClick={handleAnimation}
                        >
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </header>
                  <div className="relative flex-1 px-4 sm:px-6">
                    <LineItem>
                      <div className="py-5 border-b flex flex-row items-center flex-no-wrap space-x-5 max-w-screen-sm">
                        <LineItemImage className="w-24 h-24" />
                        <div className="flex flex-row flex-wrap items-center">
                          <div className="flex flex-col flex-shrink">
                            <LineItemName className="font-bold text-sm md:text-base" />
                            <LineItemAmount type="unit" className="text-xs md:text-sm" />
                          </div>
                          <div className="py-2 flex flex-row items-center md:justify-between">
                            <LineItemQuantity
                              max={10}
                              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            />
                            <Errors resource="line_items" field="quantity" />
                            <LineItemAmount className="font-extrabold ml-3 px-2 text-sm" />
                          </div>
                        </div>
                        <LineItemRemoveLink>{CustomRemoveLink}</LineItemRemoveLink>
                      </div>
                    </LineItem>
                  </div>
                </LineItemsContainer>
                <div className="flex flex-col py-5 w-5/6 mx-auto">
                  <div className="flex flex-row justify-between pb-2">
                    <span className="font-extrabold">{translations[lang as string]?.subTotal}:</span>
                    <SubTotalAmount />
                  </div>
                  <div className="flex flex-row justify-between text-gray-600 pb-2 text-sm">
                    <span>{translations[lang as string]?.discount}:</span>
                    <DiscountAmount />
                  </div>
                  <div className="flex flex-row justify-between text-gray-600 pb-2 text-sm">
                    <span>{translations[lang as string]?.shipping}:</span>
                    <ShippingAmount />
                  </div>
                  <div className="flex flex-row justify-between text-gray-600 pb-2 text-sm">
                    <span>{translations[lang as string]?.taxes}:</span>
                    <TaxesAmount />
                  </div>
                  <div className="flex flex-row justify-between text-gray-600 pb-3 border-b border-black text-sm">
                    <span>{translations[lang as string]?.giftCard}:</span>
                    <GiftCardAmount />
                  </div>
                  <div className="flex flex-row justify-between font-black pt-3 text-xl">
                    <span className="font-bold">{translations[lang as string]?.total}:</span>
                    <TotalAmount />
                  </div>
                  <div className="flex flex-col-reverse md:flex-row justify-between my-10">
                    <span className="inline-flex rounded-md shadow-sm">
                      <button
                        type="button"
                        className="w-full md:w-auto inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-blue active:bg-gray-700 transition ease-in-out duration-150"
                        onClick={handleAnimation}
                      >
                        {translations[lang as string]?.continueShopping}
                      </button>
                    </span>
                    <span className="mb-5 md:mb-0 inline-flex rounded-md shadow-sm">
                      <CheckoutLink
                        label={translations[lang as string]?.proceedToCheckout as string}
                        className="w-full md:w-auto justify-center text-center primary inline-flex items-center px-4 py-3 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-600 transition ease-in-out duration-150"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <UniformSlot name="cartBottom" />
            </Transition>
          </section>
        </div>
      </div>
    </UniformComposition>
  );
};

const ComponentsMap: Record<string, ComponentType<any>> = {
  productPromo: ProductPromo,
  cartPromotion: CartPromotion,
  alert: Alert,
};

const resolveRenderer = (component: Type.ComponentInstance): ComponentType<Type.ComponentProps<any>> | null => {
  const componentName = component.type;
  return ComponentsMap[componentName] || DefaultNotImplementedComponent;
};

export default ShoppingBag;

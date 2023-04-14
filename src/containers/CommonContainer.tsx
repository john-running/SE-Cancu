import React from 'react';
import {
  UniformComposition,
  UniformSlot,
  useUniformContextualEditing,
  createUniformApiEnhancer,
} from '@uniformdev/canvas-react';
import { RootComponentInstance } from '@uniformdev/canvas';
import PageHead from '@/components/Meta/PageHead';
import LayoutContext from '@/context/LayoutContext';
import { CommerceContext } from '@/context/commerce/CommerceContext';
import ShoppingBag from '@/components/commercelayer/ShoppingBag';
import { useGetToken } from '@/hooks/commerce/useGetToken';
import { CommerceLayer, OrderContainer, OrderStorage } from '@commercelayer/react-components';
import { parseLanguageCode } from '@/utils/parser';
import { useRouter } from 'next/router';
import { useUniformContext } from '@uniformdev/context-react';
import ProductDetailPageContainer from '@/components/commercelayer/ProductDetailPageContainer';

export const CompositionContext = React.createContext<RootComponentInstance | undefined>(undefined);

const CommonContainer: React.FC<any> = ({
  composition: compositionInstance,
  globalComposition,
  resolveRenderer,
  language,
  commerceContext,
}) => {
  const { context } = useUniformContext();
  const { endpoint, clientId, country } = commerceContext || {};
  const marketId = country?.marketId || 'all';
  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: `/api/enhancers/enhance?language=${language}&country=${country?.code?.toLowerCase()}`,
  });
  const { composition } = useUniformContextualEditing({
    initialCompositionValue: compositionInstance,
  });

  const [animation, setAnimation] = React.useState(false);
  const handleAnimation = (event: React.MouseEvent) => {
    event.preventDefault();
    setAnimation(!animation);
    // TODO: find a better way to subscribe to changing shopping context
    updateCommerceContext();
  };

  const { articleContent, metaTitle, metaDescription, ogImage } = compositionInstance?.parameters || {};
  const pageMetaTitle = metaTitle?.value ?? articleContent?.value?.metaTitle;
  const pageMetaDescription = metaDescription?.value ?? articleContent?.value?.metaDescription;
  const pageOgImage = ogImage?.value ?? articleContent?.value?.ogImage?.src;

  const {
    query: { lang },
  } = useRouter();

  const token = useGetToken({
    clientId: clientId as string,
    endpoint: endpoint as string,
    scope: `market:${marketId}`,
    countryCode: country?.code?.toLowerCase() as string,
  });
  const languageCode = parseLanguageCode(lang as string, 'toLowerCase', true);

  const updateCommerceContext = async () => {
    // This doesn't work, 401s :( no matter what token I am using
    // const sdk = await getSdkWithToken(token);
    // const lineItems = await sdk.orders.list();
    // TODO: rework this
    const orderId = localStorage.getItem(`order-${country?.code?.toLowerCase()}`);
    const response = await fetch(
      `https://uniform-engineering.commercelayer.io/api/orders/${orderId}?include=line_items.item,line_items.line_item_options.sku_option`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    const quirks = {
      cartActive: data.data.attributes?.skus_count > 0,
      cartGuest: data.data.attributes?.guest,
      cartBigSpender: data.data.attributes?.total_amount_cents > 10000,
      cartTotal: data.data.attributes?.total_amount_cents,
      cartSkuCount: data.data.attributes?.skus_count,
    };

    // TODO: reset signals (if cart is updated)
    await context.update({
      quirks,
    });

    console.log({ quirks });
  };

  const { type: compositionType } = composition || {};

  return (
    <CommerceContext.Provider value={commerceContext}>
      <LayoutContext.Provider value={{ handleAnimation }}>
        <CommerceLayer accessToken={token} endpoint={endpoint}>
          <PageHead metaTitle={pageMetaTitle} metaDescription={pageMetaDescription} ogImage={pageOgImage} />
          <OrderStorage persistKey={`order-${country?.code?.toLowerCase()}`}>
            <OrderContainer attributes={{ language_code: languageCode }}>
              <div className="min-h-[calc(100vh-166px)]">
                {globalComposition && (
                  <UniformComposition data={globalComposition} behaviorTracking="onLoad">
                    <UniformSlot name="header" resolveRenderer={resolveRenderer} />
                  </UniformComposition>
                )}
                {composition && (
                  <CompositionContext.Provider value={composition}>
                    <UniformComposition
                      data={composition}
                      contextualEditingEnhancer={contextualEditingEnhancer}
                      behaviorTracking="onLoad"
                    >
                      {compositionType === 'productDetailPage' ? (
                        <ProductDetailPageContainer>
                          {' '}
                          <UniformSlot name="content" resolveRenderer={resolveRenderer} />
                        </ProductDetailPageContainer>
                      ) : (
                        <UniformSlot name="content" resolveRenderer={resolveRenderer} />
                      )}
                    </UniformComposition>
                  </CompositionContext.Provider>
                )}
              </div>
              {globalComposition && (
                <UniformComposition data={globalComposition} behaviorTracking="onLoad">
                  <ShoppingBag
                    composition={globalComposition.slots.shoppingBag[0]}
                    active={animation}
                    handleAnimation={handleAnimation}
                    lang={lang as string}
                  />
                  <UniformSlot name="footer" resolveRenderer={resolveRenderer} />
                </UniformComposition>
              )}
            </OrderContainer>
          </OrderStorage>
        </CommerceLayer>
      </LayoutContext.Provider>
    </CommerceContext.Provider>
  );
};

export default CommonContainer;

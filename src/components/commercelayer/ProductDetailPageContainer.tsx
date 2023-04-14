import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { ItemContainer } from '@commercelayer/react-components';
import { CommerceContext } from '@/context/commerce/CommerceContext';
import { useUniformContext } from '@uniformdev/context-react';
import translations from '@/translations/index';
import Container from '../_atoms/BaseContainer';
import Link from '../_atoms/Link';

const ProductDetailPageContainer: React.FC<any> = ({ children }) => {
  const commerceContext = useContext(CommerceContext);
  const { product } = commerceContext || {};
  const { context } = useUniformContext();

  let { enrichments, subcategories } = product || {};

  enrichments = enrichments?.map((e: any) => {
    const enr = { ...e };
    enr.str = 5;
    return enr;
  });

  const subcategoryEnrichments = subcategories
    ? subcategories.map((subcatName: string) => {
        return {
          cat: 'subcat',
          key: subcatName,
          str: 5,
        };
      })
    : [];

  enrichments = enrichments?.concat(subcategoryEnrichments);

  useEffect(() => {
    console.log('Setting enrichments', { enrichments });
    context.update({ enrichments });
  }, [context]);

  const {
    query: { lang },
  } = useRouter();

  return !product ? null : (
    <Container>
      <ItemContainer>
        <div className="container pb-6 max-w-screen-lg px-5 lg:px-0 text-sm text-gray-700">
          <Link href={`/search`}>
            <div>
              <img title="back" src="/back.svg" className="w-5 h-5 inline-block" />
              <p className="ml-2 hover:underline inline-block align-middle">
                {translations[lang as string].backToAllProducts}
              </p>
            </div>
          </Link>
        </div>
        {children}
      </ItemContainer>
    </Container>
  );
};

export default ProductDetailPageContainer;

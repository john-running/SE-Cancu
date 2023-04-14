import { Product } from '@/types/commerce';
import ProductItem from '../products/ProductItem';

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => (
  <div className="mt-10 sm:ml-10 lg:col-span-2">
    <ul className="md:pt-7 space-y-12 sm:grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
      {products.map((product: Product, key: number) => {
        const { slug } = product || {};
        return (
          <li key={key}>
            <ProductItem key={`featured-product-${slug}`} product={product} addToCart={false} />
          </li>
        );
      })}
    </ul>
  </div>
);

export default ProductGrid;

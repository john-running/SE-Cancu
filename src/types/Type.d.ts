declare namespace Type {
  type ComponentProps<T> = import('@uniformdev/canvas-react')<T>;
  type ComponentInstance = import('@uniformdev/canvas').ComponentInstance;
  type RootComponentInstance = import('@uniformdev/canvas').RootComponentInstance;
  type ComponentParameterEnhancer<T, T2> = import('@uniformdev/canvas').ComponentParameterEnhancer<T, T2>;

  interface Product {
    id: number;
    sku: string;
    name: string;
    description: string;
    price: number;
    categories: number[];
    // synthetic fields
    variantId: number;
    brandId: number | null;
    salePrice: number;
    dateModified: number;
    totalSold: number;
    thumbnailStandardUrl: string;
    images?: {
      id: number;
      sort_order: number;
      url_zoom: string;
      image_url: string | null;
      url_standard: string;
    }[];
  }

  interface ProductsLayoutProps extends Global.LayoutProps {
    prefetchedProducts: Product[];
    prefetchedTotal: number;
    key: string;
  }

  interface CloudinaryImage {
    src: string;
    width: string;
    height: string;
  }

  type Accordion = ComponentProps<{
    heading: string;
    subHeading: string;
    FAQs: AccordionItem[];
  }>;

  type AccordionItem = ComponentProps<{
    question: string;
    answer: string;
  }>;

  type CallToActionProps = ComponentProps<{
    title: string;
    text: string;
    textAlign: 'default' | 'left';
    callToActionTitle?: string;
    callToActionLink?: string;
    question?: string;
  }>;

  interface CMSProps {
    entry: {
      fields: object;
    };
  }

  interface IconProps {
    width?: number;
    height?: number;
    className?: string;
  }

  interface EmailCallToActionProps<> {
    content: EmailCallToAction;
  }

  interface EmailCallToAction extends Contentful.EmailCallToAction {
    image?: Enhancers.Image;
  }

  interface EnhanceCategoriesBrandsParams {
    composition: Type.RootComponentInstance;
    context: any;
    currentCategoryId: number;
  }

  interface EnhanceCategoriesArticle {
    composition: Type.RootComponentInstance;
    context: any;
    slug: string;
    preview: boolean;
  }

  interface EnhanceCategoriesArticles {
    composition: Type.RootComponentInstance;
    context: any;
    preview: boolean;
  }

  interface EnhanceProductDetails {
    composition: Type.RootComponentInstance;
    context: any;
    productId: number;
  }
}

import { ComponentType } from 'react';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-react';
import { capitalizeFirstLetter } from '@/utils/stringUtil';
import Container from '@/components/Container';
import FeatureItem from '@/components/FeatureItem';
import FeaturesGrid from '@/components/FeaturesGrid';
import CallToActionDefault from '@/components/CallToActionDefault';
import CallToActionMini from '@/components/CallToActionMini';
import HeroBoxed from '@/components/HeroBoxed';
import HeroFullWidth from '@/components/HeroFullWidth';
import SectionTwoColumns from '@/components/SectionTwoColumns';
import ContactForm from '@/components/ContactForm';
import ContactSidebar from '@/components/ContactSidebar';
import SignUpNewsLetter from '@/components/SignUpNewsLetter';
import Accordion from '@/components/Accordion';
import AccordionItem from '@/components/AccordionItem';
import ProfileComponent from '@/components/ProfileComponent';
import PopUp from '@/components/PopUp';
import CallToActionAdvanced from '@/components/CallToActionAdvanced';
import AboutProduct from '@/components/AboutProduct';
import AboutProductItem from '@/components/AboutProductItem';
import FeaturedCallout from '@/components/FeaturedCallout';
import Divider from '@/components/Divider';
import RichText from '@/components/RichText';
import {
  Article,
  ArticleListItem,
  ArticlesList,
  ArticlesListNavigation,
  SpotlightList,
  SpotlightListItem,
} from '../components/Articles';
import Header from '@/components/Header';
import HeaderNavigationLink from '@/components/HeaderNavigationLink';
import HeaderNavigationMenu from '@/components/HeaderNavigationMenu';
import NavigationMenuLink from '@/components/NavigationMenuLink';
import Footer from '@/components/Footer';
import Promo from '@/components/Promo';
import Localization from '@/components/Localization';
import MainContainer from '@/components/MainContainer';
import FeaturedArticlesListNav from '@/components/Articles/FeaturedArticleListNav';
import ImageBanner from '@/components/ImageBanner';
import ArticleImage from '@/components/ArticleImage';
import ProductsSectionContainer from '@/components/commercelayer/ProductsSectionContainer';
import ProductDetailPageContainer from '@/components/commercelayer/ProductDetailPageContainer';
import FeaturedProducts from '@/components/commercelayer/FeaturedProducts';
import ProductPromo from '@/components/commercelayer/ProductPromo';
import ProductsCarousel from '@/components/products/ProductsCarousel';
import CartPromotion from '@/components/commercelayer/CartPromotion';
import Banner from '@/components/commercelayer/Banner';
import ProductInfo from '@/components/ProductInfo';
import AddToCart from '@/components/AddToCart';
import ProductDescription from '@/components/ProductDescription';
import RelatedProducts from '@/components/RelatedProducts';
import ProductImageGallery from '@/components/ProductImageGallery';
import FeaturedProduct from '@/components/FeaturedProduct';
import CanvasInstantSearch from '@/components/algolia/CanvasInstantSearch';
import CanvasRefinementListWrapper from '@/components/algolia/CanvasRefinementListWrapper';
import CanvasRefinementList from '@/components/algolia/CanvasRefinementList';
import CanvasSearchBox from '@/components/algolia/CanvasSearchBox';
import CanvasPagination from '@/components/algolia/CanvasPagination';
import CanvasHits from '@/components/algolia/CanvasHits';

const ComponentsMap: Record<string, ComponentType<any>> = {
  container: Container,
  hero: HeroBoxed,
  heroBoxed: HeroBoxed,
  heroFullWidth: HeroFullWidth,
  callToAction: CallToActionDefault,
  callToActionContentful: CallToActionDefault,
  callToActionMini: CallToActionMini,
  callToActionAdvanced: CallToActionAdvanced,
  featureItem: FeatureItem,
  featuresGrid: FeaturesGrid,
  sectionTwoColumns: SectionTwoColumns,
  contactForm: ContactForm,
  contactSidebar: ContactSidebar,
  signUpNewsletter: SignUpNewsLetter,
  accordion: Accordion,
  accordionItem: AccordionItem,
  featuredCallout: FeaturedCallout,
  featuredCalloutImageLeft: FeaturedCallout,
  featuredCalloutImageRight: FeaturedCallout,
  featuredProduct: FeaturedProduct,
  featuredProductImageLeft: FeaturedProduct,
  featuredProductImageRight: FeaturedProduct,
  profileComponent: ProfileComponent,
  popUp: PopUp,
  aboutProduct: AboutProduct,
  aboutProductItem: AboutProductItem,
  divider: Divider,
  richText: RichText,
  articleContent: Article,
  featuredArticlesList: FeaturedArticlesListNav,
  featuredArticlesListDefault: ArticlesList,
  featuredArticlesListNavigation: ArticlesListNavigation,
  articlesListDefault: ArticlesList,
  articlesList: ArticlesList,
  articlesListNavigation: ArticlesListNavigation,
  spotlightList: SpotlightList,
  spotlightItem: ArticleListItem,
  spotlightItemDefault: ArticleListItem,
  spotlightItemHighlighted: SpotlightListItem,
  spotlightItemTile: ArticleListItem,
  navigationLinks: Header,
  navigationItem: HeaderNavigationLink,
  navigationMenu: HeaderNavigationMenu,
  navigationMenuLink: NavigationMenuLink,
  topNavigation: Header,
  footer: Footer,
  promo: Promo,
  $localization: Localization,
  mainContainer: MainContainer,
  imageBanner: ImageBanner,
  articleImage: ArticleImage,
  articleImageDefault: ArticleImage,
  articleImageGradientBackground: ArticleImage,
  articleImagePrimaryTextColor: ArticleImage,
  productContainer: ProductsSectionContainer,
  productDetailPageContainer: ProductDetailPageContainer,
  featuredProducts: ProductsCarousel,
  featuredProductsDark: ProductsCarousel,
  productCollection: ProductsCarousel,
  productCollectionDark: ProductsCarousel,
  productPromo: ProductPromo,
  cartPromotion: CartPromotion,
  banner: Banner,
  productInfo: ProductInfo,
  addToCart: AddToCart,
  productDescription: ProductDescription,
  relatedProducts: RelatedProducts,
  productImageGallery: ProductImageGallery,
  'algolia-instantSearch': CanvasInstantSearch,
  refinementListWrapper: CanvasRefinementListWrapper,
  'algolia-refinementList': CanvasRefinementList,
  'algolia-searchBox': CanvasSearchBox,
  'algolia-pagination': CanvasPagination,
  'algolia-hits': CanvasHits,
};

const appRenderer = (component: Type.ComponentInstance): ComponentType<Type.ComponentProps<any>> | null => {
  const { variant } = component;
  const componentName = variant ? `${component.type}${capitalizeFirstLetter(variant)}` : component.type;
  return ComponentsMap[componentName] || DefaultNotImplementedComponent;
};

export default appRenderer;

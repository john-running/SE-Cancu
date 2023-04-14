import { ComponentType } from 'react';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-react';
import { capitalizeFirstLetter } from '@/utils/stringUtil';
import HeaderNavigationLink from '@/components/HeaderNavigationLink';
import HeaderNavigationMenu from '@/components/HeaderNavigationMenu';
import NavigationMenuLink from '@/components/NavigationMenuLink';

const ComponentsMap: Record<string, ComponentType<any>> = {
  navigationItem: HeaderNavigationLink,
  navigationMenu: HeaderNavigationMenu,
  navigationMenuLink: NavigationMenuLink,
};

const topNavRenderer = (component: Type.ComponentInstance): ComponentType<Type.ComponentProps<any>> | null => {
  const { variant } = component;
  const componentName = variant ? `${component.type}${capitalizeFirstLetter(variant)}` : component.type;
  return ComponentsMap[componentName] || DefaultNotImplementedComponent;
};

export default topNavRenderer;

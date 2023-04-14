import React, { createContext, useContext, useMemo, ReactElement } from 'react';

interface Props {
  brands: Global.BrandFull[];
  categories: Global.CategoryShort[];
}

const MenuContext = createContext<Props>({
  brands: [],
  categories: [],
});

export const useMenuContext = () => useContext(MenuContext);

export const MenuContextProvider: React.FC<{
  children: ReactElement | ReactElement[];
  brands?: [];
  categories?: [];
}> = ({ children, brands = [], categories = [] }) => {
  const value = useMemo(() => ({ brands, categories }), [brands, categories]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

import React, { createContext, useContext, useMemo, ReactElement } from 'react';

interface Context {
  prefetchedProducts: Global.Product[];
  prefetchedTotal: number;
}

interface Props extends Context {
  children: ReactElement | ReactElement[];
}

const SearchResultContext = createContext<Context>({
  prefetchedProducts: [],
  prefetchedTotal: 0,
});

export const useSearchProviderContext = () => useContext(SearchResultContext);

export const SearchResultProvider: React.FC<Props> = ({ children, prefetchedProducts, prefetchedTotal }) => {
  const value = useMemo(() => ({ prefetchedProducts, prefetchedTotal }), [prefetchedProducts, prefetchedTotal]);

  return <SearchResultContext.Provider value={value}>{children}</SearchResultContext.Provider>;
};

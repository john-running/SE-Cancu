import React, { createContext } from 'react';

const DefaultIndexContext = createContext<string | undefined>(undefined);

const CanvasAlgoliaProvider = ({ defaultIndexName, children }: { defaultIndexName: string; children: any }) => {
  return <DefaultIndexContext.Provider value={defaultIndexName}>{children}</DefaultIndexContext.Provider>;
};

export function useDefaultIndexName() {
  return React.useContext(DefaultIndexContext);
}

export default CanvasAlgoliaProvider;

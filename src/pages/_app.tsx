import React from 'react';
import getConfig from 'next/config';
import { UniformContext } from '@uniformdev/context-react';
import { UniformAppProps } from '@uniformdev/context-next';
import createUniformContext from '../context/createUniformContext';
import { MenuContextProvider } from '../context/MenuProvider';

import '@/styles/globals.scss';
import '@/styles/theme.scss';

const {
  serverRuntimeConfig: { uniformContextOutputType },
} = getConfig();

const clientContext = createUniformContext();

export const App: Next.NextPage = ({ Component, pageProps, serverUniformContext }: UniformAppProps) => (
  <UniformContext
    context={serverUniformContext ?? clientContext}
    outputType={process.env.NODE_ENV === 'development' ? 'standard' : uniformContextOutputType}
  >
    <MenuContextProvider {...pageProps}>
      <Component {...pageProps} />
    </MenuContextProvider>
  </UniformContext>
);

export default App;

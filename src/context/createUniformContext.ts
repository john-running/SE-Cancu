import { Context, ManifestV2, enableContextDevTools, enableDebugConsoleLogDrain } from '@uniformdev/context';
import { NextCookieTransitionDataStore } from '@uniformdev/context-next';
import { enableGoogleGtagAnalytics } from '@uniformdev/context-gtag';
import manifest from './manifest.json';

const createUniformContext = (serverContext?: Next.NextPageContext) => {
  const context = new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins: [enableContextDevTools(), enableGoogleGtagAnalytics(), enableDebugConsoleLogDrain('debug')],
  });

  return context;
};

export default createUniformContext;

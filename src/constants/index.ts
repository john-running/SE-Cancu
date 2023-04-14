export const Routes = {
  Articles: 'articles',
  Article: 'article',
  TopNav: 'topnav',
};

export const FormStatusMap = {
  INITIALIZED: 'INITIALIZED',
  SUBMITTING: 'SUBMITTING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const Validation = {
  NAME: {
    empty: "Name can't be empty",
  },
  EMAIL: {
    empty: "Email can't be empty",
    re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    invalid: 'Please provide valid Email',
  },
  COMPANY: {
    empty: "Company can't be empty",
  },
  MESSAGE: {
    empty: "Message can't be empty",
  },
};

export const PROXY_REQUEST_OPTIONS: RequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const NoImageSrc = '/img/no-image.jpg';

export const corsConfig = {
  // Options
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: [
    'http://localhost:3000',
    'https://javadrip.coffee',
    'https://javadrip-dev.netlify.app',
    'https://javadrip-starter.netlify.app',
    'https://unistore-dev.netlify.app',
    'https://javadrip-prod.netlify.app',
    'https://javadrip-enablement.netlify.app',
    'https://jd-dxca-demo.netlify.app',
    'https://canary-fake-commerce-mesh-integration.netlify.app',
    /.+--javadrip-dev\.netlify\.app$/,
    /.+--unistore-dev\.netlify\.app$/,
    /.+--unistoredemo\.netlify\.app$/,
    /.+--3000\.local\.webcontainer\.io$/,
  ],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const countryLangConfig = new Map<string, string[]>();
countryLangConfig.set('us', ['en-us', 'it-it']);
//countryLangConfig.set('ca', ['en-ca', 'fr-ca']);
countryLangConfig.set('it', ['en-us', 'it-it']);

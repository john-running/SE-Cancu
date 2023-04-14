/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const config = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['res.cloudinary.com', 'images.ctfassets.net', 'cdn.sanity.io'],
    deviceSizes: [320, 420, 768, 1024, 1280],
  },
  publicRuntimeConfig: {
    appVersion: process.env.npm_package_version,
    hostName: process.env.VERCEL_URL || 'javadrip.coffee',
    sanityProjectId: process.env.SANITY_PROJECT_ID,
    sanityDataset: process.env.SANITY_DATASET,
    cms: process.env.NEXT_PUBLIC_CMS,
  },
  serverRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET || 'javadrip',
    uniformContextOutputType: process.env.UNIFORM_CONTEXT_OUTPUT_TYPE || 'standard',
    algoliaAppId: process.env.ALGOLIA_APP_ID,
    algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    algoliaIndex: process.env.ALGOLIA_INDEX,
    contentfulSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    contentfulEnvironment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
    contentfulCdaToken: process.env.NEXT_PUBLIC_CONTENTFUL_CDA_ACCESS_TOKEN,
    contentfulCpaToken: process.env.NEXT_PUBLIC_CONTENTFUL_CPA_ACCESS_TOKEN,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    JSCOV: 0,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_TOKEN: process.env.SANITY_TOKEN,
    BUILD_LANGUAGES: process.env.BUILD_LANGUAGES,
    CL_CLIENT_ID: process.env.CL_CLIENT_ID,
    CL_ENDPOINT: process.env.CL_ENDPOINT,
  },
};

module.exports = config;

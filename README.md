# Uniform and CommerceLayer PoC

Built with Next.js, powered by Uniform and CommerceLayer. Two brands are enabled with these keys:

## Requirements:

- [Node.js](https://nodejs.org/en/download/) 16.10.0+

## Running locally

1. Depending on the desired brand, take `.env.example` and turn it into `.env` file.
2. Add the proper value of the `UNIFORM_API_KEY` env var in `.env` file
3. Add Contentful env var values in `.env` file.
   ```
   NEXT_PUBLIC_CONTENTFUL_SPACE_ID=
   NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=
   NEXT_PUBLIC_CONTENTFUL_CDA_ACCESS_TOKEN=
   NEXT_PUBLIC_CONTENTFUL_CPA_ACCESS_TOKEN=
   ```
4. `npm install --legacy-peer-deps`
5. `npm run dev`

## Production build

1. `npm run build`.

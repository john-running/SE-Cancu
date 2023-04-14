declare namespace Next {
  type NextPage<T = any> = import('next').NextPage<T>;
  type GetStaticPaths = import('next').GetStaticPaths;
  type GetStaticProps<T> = import('next').GetStaticProps<T>;
  type NextApiRequest = import('next').NextApiRequest;
  type NextApiResponse = import('next').NextApiResponse;
  type NextApiHandler = import('next').NextApiHandler;
  type NextPageContext = import('next').NextPageContext;
}

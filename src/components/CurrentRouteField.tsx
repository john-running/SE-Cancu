import React from 'react';
import { useRouter } from 'next/router';

const CurrentRouteField = () => {
  const router = useRouter();
  return <input type="hidden" name="page" value={router?.asPath && router.asPath !== '/' ? router.asPath : 'Home'} />;
};

export default CurrentRouteField;

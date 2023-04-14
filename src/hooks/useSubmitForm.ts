import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FormikHelpers } from 'formik';
import { encode } from '../utils';
import { FormStatusMap } from '@/constants';

const useSubmitForm = <Values>({ formName }: { formName: string }) => {
  const router = useRouter();

  return useCallback(
    (data: Values, formik: FormikHelpers<Values>): Promise<Response> =>
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': formName,
          ...data,
          page: router?.asPath && router.asPath !== '/' ? router.asPath : 'Home',
        }),
      })
        .then(response => {
          formik.setStatus(FormStatusMap.SUCCESS);
          return response;
        })
        .catch(error => {
          console.error(`${formName}: ${error}`);
          formik.setStatus(FormStatusMap.ERROR);
          return Promise.reject(new Error(`${formName}: ${error}`));
        }),
    [formName, router.asPath]
  );
};

export default useSubmitForm;

import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useMemo } from 'react';
import useSubmitForm from '@/hooks/useSubmitForm';
import { FormStatusMap, Validation } from '@/constants';

enum FormFieldsMap {
  NAME = 'name',
  COMPANY = 'company',
  EMAIL = 'email',
  MESSAGE = 'message',
}

interface Values {
  [FormFieldsMap.NAME]: string;
  [FormFieldsMap.EMAIL]: string;
  [FormFieldsMap.COMPANY]: string;
  [FormFieldsMap.MESSAGE]: string;
}

type InputFocus = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface OnSubmitWithFocusOnElementWithError {
  event: React.FormEvent<HTMLFormElement>;
  formikErrors: FormikErrors<any>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  formikFields: any;
}

const onSubmitWithFocusOnElementWithError = ({
  event,
  formikErrors,
  handleSubmit,
  formikFields,
}: OnSubmitWithFocusOnElementWithError) => {
  const form = event.target as HTMLFormElement;
  const firstField = Object.keys(formikFields)[0];
  const errorFields = Object.keys(formikErrors);
  if (errorFields.length || !formikFields[firstField]) {
    const inputName = errorFields[0];
    const inputFocus = form.querySelector(`[name="${inputName || firstField}"]`) as InputFocus;
    inputFocus?.focus();
  }
  handleSubmit(event);
};

const useConfiguredFormik = () => {
  const formName = 'contact-form';
  const onSubmit = useSubmitForm<Values>({
    formName,
  });

  const formik = useFormik<Values>({
    initialValues: {
      [FormFieldsMap.NAME]: '',
      [FormFieldsMap.EMAIL]: '',
      [FormFieldsMap.COMPANY]: '',
      [FormFieldsMap.MESSAGE]: '',
    },
    onSubmit,
    initialStatus: FormStatusMap.INITIALIZED,
    validationSchema: Yup.object().shape({
      [FormFieldsMap.NAME]: Yup.string().required(Validation.NAME.empty),
      [FormFieldsMap.EMAIL]: Yup.string().email(Validation.EMAIL.invalid).required(Validation.EMAIL.empty),
      [FormFieldsMap.MESSAGE]: Yup.string().required(Validation.MESSAGE.empty),
    }),
  });

  const isFormSubmitted = useMemo(
    () => [FormStatusMap.SUCCESS, FormStatusMap.ERROR].includes(formik.status),
    [formik.status]
  );

  const onSubmitCustom = (event: React.FormEvent<HTMLFormElement>) =>
    onSubmitWithFocusOnElementWithError({
      event,
      handleSubmit: formik.handleSubmit,
      formikErrors: formik.errors,
      formikFields: formik.values,
    });

  const resetFieldError = (field: FormFieldsMap | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    formik.setFieldError(typeof field === 'string' ? field : field?.target?.name || '', '');

  return {
    ...formik,
    formName,
    isFormSubmitted,
    FormFieldsMap,
    resetFieldError,
    handleSubmit: onSubmitCustom,
  };
};

export default useConfiguredFormik;

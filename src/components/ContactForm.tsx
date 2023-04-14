import React from 'react';
import Image from '@/components/_atoms/Image';
import HiddenInput from '@/components/_atoms/HiddenInput';
import useConfiguredFormik from '@/hooks/useConfiguredFormik';
import Input from '@/components/_atoms/Input';
import ButtonAction from '@/components/_atoms/ButtonAction';
import { FormStatusMap } from '@/constants';
import { NoImageSrc } from '@/constants';

type Props = {
  successfulSubmitText?: string;
  errorSubmitText?: string;
  submitButtonText?: string;
  errorSubmitImage?: Type.CloudinaryImage;
  successfulSubmitImage?: Type.CloudinaryImage;
};

const ContactForm: React.FC<Props> = ({
  successfulSubmitText,
  errorSubmitText,
  submitButtonText,
  successfulSubmitImage,
  errorSubmitImage,
}) => {
  const {
    FormFieldsMap,
    isSubmitting,
    isFormSubmitted,
    status,
    formName,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    resetFieldError,
  } = useConfiguredFormik();

  const FormCopies = React.useMemo(
    () => ({
      [FormStatusMap.INITIALIZED]: {},
      [FormStatusMap.SUCCESS]: { title: successfulSubmitText },
      [FormStatusMap.ERROR]: { title: errorSubmitText },
    }),
    [errorSubmitText, successfulSubmitText]
  );

  const submitImage = FormCopies[status].title === successfulSubmitText ? successfulSubmitImage : errorSubmitImage;

  return (
    <div className="flex flex-col sm:flex-row lg:pl-20">
      {isFormSubmitted ? (
        <div className="flex gap-x-8 flex-col sm:flex-row items-start sm:items-center">
          <Image
            src={submitImage?.src || NoImageSrc}
            width={submitImage?.width}
            height={submitImage?.height}
            alt="submit-image"
          />
          <p className="font-extrabold text-3xl lg:text-4xl pt-4 sm:pt-0 sm:max-w-sm">{FormCopies[status].title}</p>
        </div>
      ) : (
        <form
          id={formName}
          // eslint-disable-next-line react/no-unknown-property
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          data-netlify="true"
          method="POST"
          className="grid grid-cols-1 row-gap-6 md:row-gap-3 col-gap-8 w-full"
        >
          <HiddenInput formName={formName} />
          <Input
            id="name"
            name={FormFieldsMap.NAME}
            label="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={resetFieldError}
            errorMessage={touched[FormFieldsMap.NAME] && errors[FormFieldsMap.NAME]}
            className="mb-2"
          />
          <Input
            id="email"
            name={FormFieldsMap.EMAIL}
            type="email"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={resetFieldError}
            errorMessage={touched[FormFieldsMap.EMAIL] && errors[FormFieldsMap.EMAIL]}
            className="mb-2"
          />
          <Input
            id="company"
            name={FormFieldsMap.COMPANY}
            label="Company"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={resetFieldError}
            errorMessage={touched[FormFieldsMap.COMPANY] && errors[FormFieldsMap.COMPANY]}
            className="mb-2"
          />
          <Input
            id="message"
            name={FormFieldsMap.MESSAGE}
            label="Tell us a little about why you are contacting us"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={resetFieldError}
            errorMessage={touched[FormFieldsMap.MESSAGE] && errors[FormFieldsMap.MESSAGE]}
            inputClassName="h-48"
            rows={1}
          />
          <ButtonAction type="submit" styleType="primary" className="text-sm max-w-full sm:max-w-max mt-5">
            <span>{isSubmitting ? 'Submitting' : submitButtonText}</span>
          </ButtonAction>
        </form>
      )}
    </div>
  );
};

export default ContactForm;

import React from 'react';
import Container from '@/components/Container';
import ButtonLink from '@/components/_atoms/ButtonLink';
import withCMS from '@/utils/withCMS';

const CallToActionAdvanced: React.FC<Type.CallToActionProps> = ({
  title,
  text,
  callToActionTitle,
  callToActionLink,
  question,
}) => (
  <Container>
    <div className="md:w-9/12 m-auto text-center pt-5 pb-10">
      {title && <p className="font-bold text-2xl">{title}</p>}
      <p className="pt-4">{text}</p>
      <p className="pt-6 md:pt-11 font-bold">{question}</p>
      {callToActionTitle && callToActionLink && (
        <ButtonLink text={callToActionTitle} href={callToActionLink} className="mt-8 md:mt-5 !py-3 mx-auto !text-sm" />
      )}
    </div>
  </Container>
);

export default withCMS(CallToActionAdvanced);

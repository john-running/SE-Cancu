import React from 'react';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';
import ButtonLink from '@/components/_atoms/ButtonLink';
import withCMS from '@/utils/withCMS';

const CallToActionDefault: React.FC<Type.CallToActionProps> = ({
  title,
  text,
  callToActionTitle,
  callToActionLink,
}) => (
  <Container paddingTop={PaddingSize.Large} paddingBottom={PaddingSize.Large}>
    <div className="md:w-9/12 m-auto flex flex-col items-center">
      {title && <p className="md:text-center font-bold text-4xl">{title}</p>}
      <p className="md:text-center mt-6">{text}</p>
      {callToActionTitle && callToActionLink && (
        <ButtonLink text={callToActionTitle} href={callToActionLink} className="mt-8" />
      )}
    </div>
  </Container>
);

export default withCMS(CallToActionDefault);

import React from 'react';
import ButtonLink from '@/components/_atoms/ButtonLink';

const CallToActionMini: React.FC<Type.CallToActionProps> = ({ title, text, callToActionTitle, callToActionLink }) => (
  <>
    {title && <p className="font-bold text-4xl">{title}</p>}
    {text && <p className="mt-3.5" dangerouslySetInnerHTML={{ __html: text }} />}
    {callToActionTitle && callToActionLink && (
      <ButtonLink href={callToActionLink} text={callToActionTitle} className="mt-7" />
    )}
  </>
);

export default CallToActionMini;

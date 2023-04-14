import React from 'react';
import ButtonLink from '@/components/_atoms/ButtonLink';

interface Props {
  ctaText: string;
  ctaLink: string;
}

const NavigationMenuLink: React.FC<Props> = ({ ctaText, ctaLink }) => (
  <ButtonLink href={ctaLink} text={ctaText} styleType="primary" className="text-sm !px-5 !py-2" />
);

export default NavigationMenuLink;

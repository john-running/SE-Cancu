import React from 'react';
import Image from '@/components/_atoms/Image';
import Link from '@/components/_atoms/Link';

interface Props {
  icon: Type.CloudinaryImage;
  title: string;
  text: string;
  link?: string;
  textLink?: string;
}

const FeatureItem: React.FC<Props> = ({ icon, title, text, textLink = '', link = '' }) => (
  <div className="md:w-full">
    {Boolean(icon.src) && (
      <div className="relative">
        <div className="w-[80px] h-[80px] relative">
          <Image src={icon.src} width={80} height={80} objectFit="contain" alt={`feature-${title}-image`} />
        </div>

        <div className="w-24 h-1 bg-metallic_bronze mt-6 mb-7" />
      </div>
    )}
    <p className="font-semibold text-xl mb-2.5">{title}</p>
    <p className="mb-2.5">{text}</p>
    {Boolean(link && textLink) && <Link href={link} title={textLink} />}
  </div>
);

export default FeatureItem;

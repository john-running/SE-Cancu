import React from 'react';
import Image from '@/components/_atoms/Image';

type BaseProps = Type.ComponentProps<{
  title: string;
  subtitle?: string;
  titleAi: string;
  subtitleAi?: string;
  buttonCopy?: string;
  buttonUrl?: {
    path: string;
  };
  backgroundImage: string;
}>;

const HeroFullWidth: React.FC<BaseProps> = ({ titleAi, title, backgroundImage }) => {
  return (
    <div className="relative">
      {backgroundImage?.src ? (
        <Image
          className="absolute w-full h-full"
          src={backgroundImage?.src}
          layout="fill"
          alt="hero-image"
          objectFit="cover"
          priority
        />
      ) : null}
      <div className="relative flex items-center justify-center px-4 py-56 z-30">
        <p className="text-white text-3xl md:text-5xl font-bold text-center max-w-[600px]">{title ?? titleAi?.text}</p>
      </div>
    </div>
  );
};

export default HeroFullWidth;

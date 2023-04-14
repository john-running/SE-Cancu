import React from 'react';
import Image from '@/components/_atoms/Image';
import ButtonLink from '@/components/_atoms/ButtonLink';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';

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
  dealImage?: string;
  dealImageWidth?: string;
  dealImageHeight?: string;
}>;

const HeroBoxed: React.FC<BaseProps> = ({
  title,
  titleAi,
  subtitle,
  subtitleAi,
  buttonCopy = '',
  backgroundImage,
  dealImage,
  dealImageWidth,
  dealImageHeight,
  buttonUrl,
}) => {
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
      <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None} className="pt-40">
        <div className="bg-black_transparent md:bg-metallic_bronze relative md:-bottom-11 ml-auto w-full md:max-w-[658px] p-12 md:pl-24 md:pr-7 md:py-20">
          <p className="font-bold text-3xl md:text-4xl lg:text-5xl text-white">{title ?? titleAi?.text}</p>
          <p className="mt-7 font-extrabold text-white">{subtitle ?? subtitleAi?.text}</p>
          {buttonCopy && buttonUrl?.path && (
            <ButtonLink text={buttonCopy} href={buttonUrl.path} className="lg:w-1/2 mt-9 text-sm" />
          )}
          {dealImage && (
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/3">
              <Image src={dealImage} width={dealImageWidth || 113} height={dealImageHeight || 113} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default HeroBoxed;

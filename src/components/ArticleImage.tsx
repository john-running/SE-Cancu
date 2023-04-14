import React, { useContext } from 'react';
import { CompositionContext } from '@/containers/CommonContainer';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';
import Image from '@/components/_atoms/Image';

type ArticleImagePrimaryProps = {
  article: Articles.Article;
  component: {
    variant: string;
  };
};

const ArticleImage: React.FC<ArticleImagePrimaryProps> = ({ article, component }) => {
  const composition = useContext(CompositionContext);

  if (!(article || composition?.parameters?.articleContent?.value)) {
    return (
      <Container paddingBottom={PaddingSize.Large} paddingTop={PaddingSize.Large}>
        <h1 className="text-4xl md:text-5xl font-extrabold pb-6">No article selected</h1>
        <p className="text-2xl pb-3">Your article will be shown here</p>
      </Container>
    );
  }

  const { title, thumbnail } = article || composition?.parameters?.articleContent?.value;
  const { variant } = component || {};

  return (
    <div className="relative">
      {thumbnail?.src ? (
        <Image
          className="absolute w-full h-full"
          src={thumbnail?.src}
          layout="fill"
          alt="hero-image"
          objectFit="cover"
          priority
        />
      ) : null}
      <div
        className={`relative flex items-center justify-center px-4 py-56 z-30 ${
          variant === 'gradientBackground' ? 'bg-gradient-to-r from-theme_strong' : ''
        }`}
      >
        <p
          className={`text-${
            variant === 'primaryTextColor' ? 'theme_strong' : 'white'
          } text-3xl md:text-5xl font-bold text-center max-w-[600px]`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default ArticleImage;

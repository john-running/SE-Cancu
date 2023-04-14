import React from 'react';
import Image from '@/components/_atoms/Image';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';
import Link from './_atoms/Link';

type ImageBannerProps = Type.ComponentProps<{
  asset: {
    src: string;
    alt?: string;
  };
  cta: {
    title: string;
    text: string;
    textAlign: 'default' | 'left';
    callToActionTitle?: string;
    callToActionLink?: string;
    question?: string;
  };
}>;

const ImageBanner: React.FC<ImageBannerProps> = props => {
  const { asset, cta } = props;
  const { src, alt } = asset || {};
  const { title, text, callToActionTitle, callToActionLink, question } = cta || {};
  return (
    <div className="relative bg-gray-900">
      <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        {src ? (
          <Image className="h-full w-full object-cover" src={src} layout="fill" alt={alt} objectFit="cover" priority />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-theme_strong mix-blend-multiply"
        />
      </div>
      <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2 className="text-lg font-semibold text-gray-300">{question}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</p>
          <div className="mt-3 text-lg text-gray-300" dangerouslySetInnerHTML={{ __html: text }} />
          {callToActionLink && callToActionTitle ? (
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href={callToActionLink}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  {callToActionTitle}
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
    // <div className="relative pb-16">
    //   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
    //   <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    //     <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
    //       <div className="absolute inset-0">
    //         {src ? (
    //           <Image
    //             className="h-full w-full object-cover"
    //             src={src}
    //             layout="fill"
    //             alt={alt}
    //             objectFit="cover"
    //             priority
    //           />
    //         ) : null}
    //         <div className="absolute inset-0 bg-theme_strong mix-blend-multiply" />
    //       </div>
    //       <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
    //         <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
    //           <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ImageBanner;

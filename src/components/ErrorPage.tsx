import React from 'react';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';
import Image from '@/components/_atoms/Image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  errorName: string;
  title?: string;
  message?: string;
  imageSrc: string;
}

const ErrorPage: React.FC<Props> = ({ errorName, title = '', message = '', imageSrc }) => (
  <>
    <div className="min-h-[calc(100vh-166px)]">
      <Header />
      <Container paddingTop={PaddingSize.Large} paddingBottom={PaddingSize.Large}>
        <div className="flex flex-col md:flex-row gap-x-28">
          <div className="md:max-w-md pb-5 md:pb-0">
            <p className="font-extrabold text-2xl pb-5">{errorName}</p>
            {title && <p className="font-extrabold text-3xl md:text-5xl md:leading-13 pb-5 md:pb-10">{title}</p>}
            {message && <p className="text-2xl">{message}</p>}
          </div>
          <div>
            <Image src={imageSrc} width={588} height={658} alt="error-image" unoptimized />
          </div>
        </div>
      </Container>
    </div>
    <Footer />
  </>
);

export default ErrorPage;

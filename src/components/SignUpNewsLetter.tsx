import React from 'react';
import Image from '@/components/_atoms/Image';
import Container from '@/components/Container';
import ButtonAction from '@/components/_atoms/ButtonAction';
import Input from '@/components/_atoms/Input';

interface Props {
  title: string;
  subtitle: string;
  backgroundImage?: Type.CloudinaryImage;
}

const SignUpNewsLetter: React.FC<Props> = ({ title, subtitle, backgroundImage }) => (
  <Container>
    <div className="text-white relative bg-black">
      {backgroundImage?.src && (
        <Image src={backgroundImage?.src} alt="newsletter-img" layout="fill" className="absolute" objectFit="cover" />
      )}
      <div className="flex justify-between md:items-center flex-col md:flex-row px-12 lg:px-24 py-10 lg:py-20">
        <div className="lg:pb-0 pb-2 relative">
          <p className="font-extrabold text-4xl sm:text-5xl pb-5 lg:max-w-xs">{title}</p>
          <p className="text-xl sm:text-2xl">{subtitle}</p>
        </div>
        <div className="flex justify-center flex-col lg:items-start">
          <div className="flex gap-x-7 flex-col lg:flex-row text-white">
            <Input id="name" label="Name" />
            <Input id="email" label="Email" />
          </div>
          <ButtonAction styleType="primary" className="mt-3.5 lg:max-w-max max-w-full">
            Subscribe
          </ButtonAction>
        </div>
      </div>
    </div>
  </Container>
);

export default SignUpNewsLetter;

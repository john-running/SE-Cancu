import React from 'react';
import Link from 'next/link';
import { UniformSlot } from '@uniformdev/canvas-react';
import Container from '@/components/Container';
import ButtonAction from '@/components/_atoms/ButtonAction';

interface Props {
  title: string;
  termsTitle: string;
  termsDescription?: string;
  termsLink: string;
}

const ProfileComponent: React.FC<Props> = ({ termsDescription = '', termsLink, termsTitle, title }) => (
  <Container>
    <div className="border-b">
      <h1 className="font-bold text-3xl sm:text-5xl pb-5 sm:pb-8">{title}</h1>
    </div>
    <UniformSlot name="items" />
    <div className="flex flex-col lg:flex-row justify-between mt-8">
      <div className="basis-8/12 lg:pr-4">
        <p className="font-extrabold text-2xl pb-4">{termsTitle}</p>
        {Boolean(termsDescription) && <p>{termsDescription}</p>}
      </div>
      <div className="basis-4/12 md:text-end lg::ml-4">
        <div className="flex-row flex gap-x-7 pt-10 md:pt-3 pb-5">
          <ButtonAction styleType="primary" className="basis-1/2 text-sm !px-2">
            I ACCEPT
          </ButtonAction>
          <ButtonAction styleType="primary" className="basis-1/2 text-sm !px-2">
            DO NOT ACCEPT
          </ButtonAction>
        </div>
        <Link href={termsLink}>
          <span className="text-black cursor-pointer underline">Privacy and Terms and Conditions</span>
        </Link>
      </div>
    </div>
  </Container>
);

export default ProfileComponent;

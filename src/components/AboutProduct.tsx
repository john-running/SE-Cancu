import React from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import Container from '@/components/Container';

interface Props {
  title: string;
  subtitle?: string;
}

const AboutProduct: React.FC<Props> = ({ title, subtitle = '' }) => (
  <Container>
    <div className="lg:max-w-3xl mx-auto pb-8 md:pb-16">
      <p className="font-extrabold text-3xl pb-2 lg:text-center">{title}</p>
      {Boolean(subtitle) && <p className="lg:text-center">{subtitle}</p>}
    </div>
    <UniformSlot name="items" />
  </Container>
);

export default AboutProduct;

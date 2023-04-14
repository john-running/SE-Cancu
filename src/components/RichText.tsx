import React from 'react';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';

const RichText: React.FC<any> = ({ text }) => (
  <Container paddingTop={PaddingSize.Large} paddingBottom={PaddingSize.Large}>
    <div className="md:w-9/12 m-auto">
      <div className="md:text-center mt-6" dangerouslySetInnerHTML={{ __html: text.rteValue }} />
    </div>
  </Container>
);

export default RichText;

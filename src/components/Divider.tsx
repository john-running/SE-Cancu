import React from 'react';
import Container, { PaddingSize } from '@/components/_atoms/BaseContainer';

const Divider = () => (
  <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None}>
    <div className="border-t" />
  </Container>
);

export default Divider;

import { FC } from 'react';
import { ComponentProps, UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';
import Container from '../components/_atoms/BaseContainer';
import { withContent } from '../hocs/withContent';

type Props = ComponentProps<{
  content?: {
    heading: string;
    subHeading: string;
  };
}>;

const Accordion: FC<Props> = ({ content }) => {
  const { heading, subHeading } = content || {};
  return (
    <Container>
      <p className="text-3xl font-extrabold pb-4">{heading}</p>
      <p className="text-xl pb-10">{subHeading}</p>
      <UniformSlot name="items" />
    </Container>
  );
};

registerUniformComponent({
  type: 'accordion',
  component: withContent(Accordion),
});

export default Accordion;

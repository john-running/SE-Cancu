import { ComponentType } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';

interface ContentProps {
  content?: { [name: string]: unknown };
}

export function withContent<T>(BaseComponent: ComponentType<ComponentProps<T>>): ComponentType<ComponentProps<T>> {
  return function wrapper({ content = {}, ...props }: ComponentProps<T & ContentProps>) {
    const concatProps = { ...content, ...props } as ComponentProps<T>;
    return <BaseComponent {...concatProps} />;
  };
}

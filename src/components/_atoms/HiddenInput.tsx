import React from 'react';
import CurrentRouteField from '@/components/CurrentRouteField';

interface Props {
  formName: string | ReadonlyArray<string> | number;
}

const HiddenInput: React.FC<Props> = ({ formName }) => (
  <>
    <input type="hidden" name="form-name" value={formName} />
    <CurrentRouteField />
    <p className="hidden">
      <span>
        Don&apos;t fill this out if you&apos;re human:
        <input name="bot-field" />
      </span>
    </p>
  </>
);

export default HiddenInput;

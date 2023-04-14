import { UniformComposition, UniformSlot } from '@uniformdev/canvas-react';
import { CANVAS_LOCALE_TAG_PARAM, CANVAS_LOCALIZATION_SLOT, ComponentInstance } from '@uniformdev/canvas';
import { useRouter } from 'next/router';

const Localization = ({ component }: { component: ComponentInstance }) => {
  const router = useRouter();
  const language = router.query.language || 'en-us';

  const slotData = component.slots?.[CANVAS_LOCALIZATION_SLOT];

  if (!slotData?.length) {
    return null;
  }

  const variant = slotData.find(c => c.parameters?.[CANVAS_LOCALE_TAG_PARAM]?.value === language);

  if (!variant) {
    return null;
  }

  return (
    <UniformComposition
      data={{
        ...component,
        slots: {
          content: [variant],
        },
      }}
    >
      <UniformSlot name="content" />
    </UniformComposition>
  );
};

export default Localization;

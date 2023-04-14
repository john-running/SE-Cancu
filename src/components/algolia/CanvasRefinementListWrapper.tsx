import React, { useState } from 'react';
import { registerUniformComponent, UniformSlot } from '@uniformdev/canvas-react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';
import classnames from 'classnames';

const CanvasRefinementListWrapper = () => {
  const [listVisibility, setListVisibility] = useState<boolean>(false);

  const {
    results: { nbHits },
  } = useInstantSearch();

  const toggleVisibility = () => setListVisibility(prevState => !prevState);

  return (
    <div className="lg:bg-[#f9f9fa] max-w-xs lg:relative absolute top-20 lg:top-0 right-0">
      <div className="hidden lg:block">
        <p className="pl-8 pr-2.5 py-2.5 font-bold text-sm">{`${nbHits} products found`}</p>
        <UniformSlot name="content" />
      </div>
      <div className="block lg:hidden bg-white border border-[#dee1ec] rounded w-60 z-50 mt-2">
        <button onClick={toggleVisibility} className="w-full">
          <div className="pl-2 py-2 pr-16 relative text-left">
            <span className="font-extrabold text-lg capitalize text-slate-700">Filters</span>
            <em className={classnames('collapsedArrow !top-3', { '!rotate-45': listVisibility })}></em>
          </div>
        </button>
      </div>
      {listVisibility && (
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-auto z-50 lg:hidden">
            <UniformSlot name="content" />
          </div>
        </div>
      )}
    </div>
  );
};

registerUniformComponent({
  type: 'refinmentListWrapper',
  component: CanvasRefinementListWrapper,
});

export default CanvasRefinementListWrapper;

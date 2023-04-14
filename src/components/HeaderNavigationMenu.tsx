import React, { useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { UniformSlot } from '@uniformdev/canvas-react';
import useClickOutside from '@/hooks/useClickOutside';
import HeaderNavigationLink from '@/components/HeaderNavigationLink';
import { checkIfCurrentRoute } from '../utils';

interface Props {
  title: string;
  link: { path: string };
  leftColumnsCount: number;
}

const HeaderNavigationMenu: React.FC<Props> = ({ title, link, leftColumnsCount }) => {
  const router = useRouter();
  const wrapperRef = useRef(null);
  const [isOpened, setOpened] = useState(false);
  const isPreviewMode = !!router.query.is_incontext_editing_mode;

  const isCurrentRoute = useMemo(() => checkIfCurrentRoute(link.path, router.asPath), [router.asPath, link]);

  const toggleMenu = useCallback(() => setOpened(prevIsOpened => !prevIsOpened), []);

  useClickOutside({ ref: wrapperRef, callback: toggleMenu, skipClickEventTargetId: link.path });

  return (
    <div>
      <div className="block lg:hidden text-center m-3">
        <HeaderNavigationLink attachHeaderClass={false} link={link.path} title={title} />
      </div>
      <button
        id={link.path}
        className={classNames(
          'hidden lg:block header_footer_container--header_items hover:opacity-30 text-center header-navigation-item',
          isOpened || isCurrentRoute ? 'opacity-30' : 'opacity-100'
        )}
        onClick={toggleMenu}
        onMouseEnter={() => {
          if (!isPreviewMode) {
            return;
          }

          setOpened(true);
        }}
      >
        {title}
      </button>
      {isOpened && (
        <div
          className="absolute top-[79px] right-8 w-auto z-50"
          onMouseLeave={() => {
            if (!isPreviewMode) {
              return;
            }

            setOpened(false);
          }}
        >
          <div ref={wrapperRef} className="bg-white p-10 shadow animate-fade">
            <div className="flex gap-8">
              {/* for tailwind styles columns-1 columns-2 columns-3 */}
              <div className={`columns-${leftColumnsCount}`}>
                <UniformSlot name="left" />
              </div>
              <UniformSlot name="right" />
            </div>
            <div className="flex gap-8 mt-4">
              <UniformSlot name="bottom" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderNavigationMenu;

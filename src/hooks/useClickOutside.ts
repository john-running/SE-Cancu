import { useEffect, RefObject } from 'react';

interface Props {
  ref: RefObject<HTMLElement>;
  callback: () => void;
  skipClickEventTargetId?: string;
}

const useClickOutside = ({ ref, callback, skipClickEventTargetId }: Props) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && event.target && !ref.current.contains(event.target as Node)) {
        if (event.target.id !== skipClickEventTargetId) callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref, skipClickEventTargetId]);
};

export default useClickOutside;

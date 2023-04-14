import React, { useCallback, useState } from 'react';
import Image from '@/components/_atoms/Image';
import IconCross from '@/components/_atoms/IconCross';

interface Props {
  title: string;
  description: string;
  image: Type.CloudinaryImage;
}

const PopUp: React.FC<Props> = ({ title, image, description }) => {
  const [popUp, setPopUp] = useState(true);

  const popUpToggle = useCallback((): void => setPopUp(prevPopUp => !prevPopUp), []);
  if (!popUp) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-12 grid-rows-4 sm:grid-rows-3 md:grid-rows-1 p-4 border-swimmers_pool border-2 mt-8 content-center bg-alabaster">
      {image?.src ? (
        <div className="lg:pl-4 md:self-center row-start-1">
          <Image src={image?.src} width="40px" height="40px" objectFit="contain" />
        </div>
      ) : null}
      <div className="py-4 md:col-span-10 col-span-2 row-start-2 row-end-5 md:row-start-1 md:row-end-1">
        <p className="font-extrabold text-2xl pb-2">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <div className="justify-self-end self-start row-start-1">
        <button onClick={popUpToggle}>
          <IconCross className="fill-black stroke-0 cursor-pointer hover:stroke-1" width={12} height={12} />
        </button>
      </div>
    </div>
  );
};

export default PopUp;

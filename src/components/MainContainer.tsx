import React from 'react';

type MainContainerProps = Type.ComponentProps<{
  backgroundImage: string;
  backgroundRepeat?: string;
  backgroundPosition?: string;
}>;

const MainContainer: React.FC<MainContainerProps> = ({ backgroundImage, backgroundRepeat, backgroundPosition }) => (
  <div
    style={{
      position: 'absolute',
      bottom: '30px',
      width: '1000px',
      height: '1000px',
      zIndex: '-1',
      backgroundImage: backgroundImage?.src ? `url(${backgroundImage.src})` : '',
      backgroundRepeat: backgroundRepeat ? backgroundRepeat : 'no-repeat',
      backgroundPosition: backgroundPosition ? backgroundPosition : 'left -20px bottom 100px',
      left: '-20px',
    }}
  ></div>
);

export default MainContainer;

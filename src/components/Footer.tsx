import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type FooterProps = Type.ComponentProps<{
  logo: string;
  subline?: string;
}>;

const Footer: React.FC<FooterProps> = ({ logo, subline }) => {
  return (
    <footer className="bg-theme_strong">
      <div className="header_footer_container flex lg:flex-row flex-col items-center lg:justify-between py-6 lg:py-11">
        <div className="flex flex-col items-center lg:items-start pb-4 lg:pb-0">
          {logo?.src ? (
            <div className="w-48 pb-2">
              <Link href="/" passHref>
                <div className="cursor-pointer">
                  <Image src={logo?.src} width="190" height="46" priority={true} loading="eager" />
                </div>
              </Link>
            </div>
          ) : null}
          <p
            className="text-white font-bold text-center lg:text-start"
            dangerouslySetInnerHTML={{ __html: subline }}
          ></p>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-white font-bold">Powered by</p>{' '}
          <Link legacyBehavior href="/" passHref className="inline-flex">
            <Image src="/img/uniform-logo.svg" alt="footer-logo" width={192} height={40} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

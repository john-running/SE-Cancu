import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

const ContactSidebar: React.FC<Props> = ({ title, subtitle }) => (
  <div className="lg:max-w-md">
    <p className="lg:text-5xl text-3xl lg:leading-[3.5rem] font-bold pb-6 lg:pb-12">{title}</p>
    <p className="text-2xl">{subtitle}</p>
  </div>
);

export default ContactSidebar;

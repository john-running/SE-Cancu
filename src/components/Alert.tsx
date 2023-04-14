import React from 'react';
import {
  XCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/20/solid';

import Link from './_atoms/Link';

type AlertProps = Type.ComponentProps<{
  text?: string;
  type: string;
  icon?: string;
  ctaTitle?: string;
  ctaLink?: string;
}>;

const Alert: React.FC<AlertProps> = ({ text, type, ctaTitle, ctaLink, icon }) => {
  const color = getAlertColorByType(type);
  return (
    <div className={`rounded-md p-4 bg-${color}-50`}>
      <div className="flex">
        <div className="flex-shrink-0">{getIconComponentByName(icon, color)}</div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className={`text-sm text-${color}-700`}>{text}</p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            {ctaLink && ctaTitle ? (
              <Link
                href={ctaLink}
                className={`whitespace-nowrap font-medium text-${color}-700 hover:text-${color}-600`}
              >
                {ctaTitle}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
};

const getAlertColorByType = (type: string) => {
  if (type === 'Warning') {
    return 'yellow';
  } else if (type === 'Error') {
    return 'red';
  } else if (type === 'Success') {
    return 'green';
  } else if (type === 'Info') {
    return 'blue';
  }
  return 'white';
};

const getIconComponentByName = (iconName: string, color: string) => {
  let iconType = InformationCircleIcon;
  if (iconName === 'XCircleIcon') {
    iconType = XCircleIcon;
  } else if (iconName === 'ExclamationTriangleIcon') {
    iconType = ExclamationTriangleIcon;
  } else if (iconName === 'CheckCircleIcon') {
    iconType = CheckCircleIcon;
  }

  return React.createElement(iconType, { className: `h-5 w-5 text-${color}-400`, ariaHidden: 'true' });
};

export default Alert;

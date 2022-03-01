import { FC, memo } from 'react';

import { useClass } from '@services';

import styles from './Warn.scss';

export const Warn: FC<ISvgIcon> = ({
  className,
  fill,
  height,
  stroke,
  strokeWidth,
  width,
  ...otherProps
}) => {
  return (
    <svg
      className={useClass(['feather', 'feather-alert-circle', styles.Warn, className], [className])}
      xmlns="http://www.w3.org/2000/svg"
      width={width || '24'}
      height={height || '24'}
      viewBox="0 0 24 24"
      fill={fill || 'none'}
      stroke={stroke || 'currentColor'}
      strokeWidth={strokeWidth || '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );
};

Warn.displayName = 'WarnIcon';

export default memo(Warn);

/* eslint-disable max-len */
import { FC, memo } from 'react';

import { useClass } from '@services';

import styles from './Delete.scss';

const Delete: FC<ISvgIcon> = ({
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
      className={useClass(['feather', 'feather-trash-2', styles.Delete, className], [className])}
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
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
};

Delete.displayName = 'DeleteIcon';

export default memo(Delete);

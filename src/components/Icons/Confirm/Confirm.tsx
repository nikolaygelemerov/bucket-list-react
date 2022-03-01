import { FC, memo } from 'react';

import { useClass } from '@services';

import colors from '@styles/shared/_variables.scss';

const Confirm: FC<ISvgIcon> = memo(
  ({ className, fill, height, stroke, strokeWidth, width, ...otherProps }) => {
    return (
      <svg
        className={useClass(['feather feather-check-circle', className], [className])}
        xmlns="http://www.w3.org/2000/svg"
        width={width || '20'}
        height={height || '20'}
        viewBox="0 0 24 24"
        fill={fill || 'none'}
        stroke={stroke || colors.color14_success}
        strokeWidth={strokeWidth || '2'}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...otherProps}
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    );
  }
);

Confirm.displayName = 'ConfirmIcon';

export default memo(Confirm);

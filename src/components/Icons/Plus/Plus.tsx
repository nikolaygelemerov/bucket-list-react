import { FC, memo } from 'react';

import { useClass } from '@services';

import styles from './Plus.scss';

const Plus: FC<ISvgIcon> = memo(
  ({ className, fill, height, stroke, strokeWidth, width, ...otherProps }) => {
    return (
      <>
        <svg
          className={useClass(['feather feather-plus', styles.Plus, className], [className])}
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
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </>
    );
  }
);

Plus.displayName = 'PlusIcon';

export default memo(Plus);

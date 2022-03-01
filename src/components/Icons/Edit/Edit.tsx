import { FC, memo } from 'react';

import { useClass } from '@services';

import styles from './Edit.scss';

export const Edit: FC<ISvgIcon> = ({
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
      className={useClass(['feather', 'feather-edit', styles.Edit, className], [className])}
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );
};

Edit.displayName = 'EditIcon';

export default memo(Edit);

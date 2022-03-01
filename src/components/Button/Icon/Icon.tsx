import { FC, memo } from 'react';

import { useClass } from '@services';

import { IButtonIconProps } from '../type-definitions';

import styles from './Icon.scss';

const Icon: FC<IButtonIconProps> = memo(
  ({ children, className, onClick, title, type = 'button' }) => {
    return (
      <button
        aria-label="button"
        className={useClass([styles.Container, className], [className])}
        onClick={onClick}
        title={title}
        type={type}
      >
        {children}
      </button>
    );
  }
);

Icon.displayName = 'IconButton';

export default memo(Icon);

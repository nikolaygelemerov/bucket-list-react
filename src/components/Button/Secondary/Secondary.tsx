import { FC, memo } from 'react';

import { useClass } from '@services';

import { IButtonProps } from '../type-definitions';

import styles from './Secondary.scss';

const Secondary: FC<IButtonProps> = memo(
  ({ className, disabled, onClick, text, title, type = 'button' }) => {
    return (
      <button
        className={useClass([styles.Container, className], [className])}
        disabled={disabled}
        onClick={onClick}
        title={title}
        type={type}
      >
        {text}
      </button>
    );
  }
);

Secondary.displayName = 'SecondaryButton';

export default memo(Secondary);

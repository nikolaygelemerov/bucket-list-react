import { FC, memo } from 'react';

import { useClass } from '@services';

import { IButtonProps } from '../type-definitions';

import styles from './Primary.scss';

const Primary: FC<IButtonProps> = memo(
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

Primary.displayName = 'PrimaryButton';

export default memo(Primary);

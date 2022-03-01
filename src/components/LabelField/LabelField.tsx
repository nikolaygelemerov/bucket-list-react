import { FC, memo } from 'react';

import styles from './LabelField.scss';

interface ILabel {
  id: string;
  label?: string;
}

const LabelField: FC<ILabel> = ({ id, label }) => (
  <label className={styles.Container} htmlFor={id}>
    {label}
  </label>
);
export default memo(LabelField);

LabelField.displayName = 'LabelField';

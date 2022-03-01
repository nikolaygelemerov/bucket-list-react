import { FC, memo, useState } from 'react';

import LabelField from '@components/LabelField/LabelField';
import { useClass } from '@services';

import styles from './Input.scss';

interface IInputProps {
  autoComplete?: 'on' | 'off';
  disabled?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
}

const Input: FC<IInputProps> = ({
  autoComplete = 'off',
  disabled,
  id,
  label,
  onChange,
  placeholder,
  type = 'text',
  value
}) => {
  const [focused, setFocused] = useState(false);

  const inputClass = useClass(
    [styles.Input, focused && styles.Focus, disabled && styles.Disabled],
    [focused, disabled]
  );

  return (
    <div className={styles.Container}>
      <LabelField id={id} label={label} />
      <input
        autoComplete={autoComplete}
        className={inputClass}
        disabled={disabled}
        id={id}
        onBlur={() => setFocused(false)}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        placeholder={placeholder || label}
        type={type}
        value={value}
      />
    </div>
  );
};

Input.displayName = 'Input';

export default memo(Input);

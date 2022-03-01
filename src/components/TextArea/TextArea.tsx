import { FC, memo, useState } from 'react';

import LabelField from '@components/LabelField/LabelField';
import { useClass } from '@services';

import styles from './TextArea.scss';

interface ITextAreaProps {
  autoComplete?: 'on' | 'off';
  disabled?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

const TextArea: FC<ITextAreaProps> = ({
  autoComplete = 'off',
  disabled,
  id,
  label,
  onChange,
  placeholder,
  value
}) => {
  const [focused, setFocused] = useState(false);

  const textAreaClass = useClass(
    [styles.TextArea, focused && styles.Focus, disabled && styles.Disabled],
    [focused, disabled]
  );

  return (
    <div className={styles.Container}>
      <LabelField id={id} label={label} />
      <textarea
        autoComplete={autoComplete}
        className={textAreaClass}
        disabled={disabled}
        id={id}
        onBlur={() => setFocused(false)}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        placeholder={placeholder || label}
        value={value}
      />
    </div>
  );
};

TextArea.displayName = 'TextArea';

export default memo(TextArea);

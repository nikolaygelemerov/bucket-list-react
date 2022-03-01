import { FC, memo, useCallback, useState } from 'react';

import { Button, LabelField } from '@components';
import { CARD_TYPES, useClass, useUpdate } from '@services';
import colors from '@styles/shared/_variables.scss';

import styles from './CardTypes.scss';

const buildSelected = (types: (keyof TCard)[]) => {
  return CARD_TYPES.reduce((accum, el) => {
    if (types.indexOf(el) !== -1) {
      accum[el] = true;
    }

    return accum;
  }, {} as { [key: string]: boolean });
};

const CardTypes: FC<{ onChange: (types: (keyof TCard)[]) => void; types: (keyof TCard)[] }> = ({
  onChange,
  types
}) => {
  const [selected, setSelected] = useState(buildSelected(types));

  const onClick = useCallback((type) => {
    setSelected((prevState) => ({ ...prevState, [type]: !prevState[type] }));
  }, []);

  useUpdate(() => {
    onChange(Object.keys(selected).filter((key) => selected[key]) as (keyof TCard)[]);
  }, [selected]);

  return (
    <>
      <LabelField id="types" label="Types" />
      <div className={styles.Container}>
        {CARD_TYPES.map((type) => (
          <Button.Icon
            key={type}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            className={useClass(
              [styles.CardTypeBtn, selected[type] && styles.Selected],
              [selected[type]]
            )}
            onClick={() => onClick(type)}
          >
            <span
              className={styles.CardType}
              style={{ backgroundColor: colors[`color_type_${type}`] }}
            >
              {type}
            </span>
          </Button.Icon>
        ))}
      </div>
    </>
  );
};

CardTypes.displayName = 'CardTypes';

export default memo(CardTypes);

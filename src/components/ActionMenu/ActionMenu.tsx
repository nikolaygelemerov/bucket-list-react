import { FC, memo, ReactNode, useRef, useState } from 'react';

import * as Button from '@components/Button';
import { useClass, useIsMounted, useOnOutsideClick } from '@services';

import styles from './ActionMenu.scss';

interface IActionMenu {
  items: ReactNode[];
}

const ActionMenu: FC<IActionMenu> = ({ items }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const isMounted = useIsMounted();

  const [isOpen, setIsOpen] = useState(false);

  const listClasses = useClass(
    [styles.List, isOpen && styles.Open, !isOpen && styles.Close],
    [isOpen]
  );

  useOnOutsideClick({ callback: () => isOpen && setIsOpen(false), element: ref });

  return (
    <div className={styles.Container}>
      <Button.Icon onClick={() => setIsOpen(true)}>
        <span className={styles.Dots}>
          <span className={styles.Dot} />
          <span className={styles.Dot} />
          <span className={styles.Dot} />
        </span>
      </Button.Icon>
      {isMounted.current ? (
        <div className={listClasses} ref={ref}>
          {items.map((item, index) => (
            <p key={index} className={styles.ListItem}>
              {item}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

ActionMenu.displayName = 'ActionMenu';

export default memo(ActionMenu);

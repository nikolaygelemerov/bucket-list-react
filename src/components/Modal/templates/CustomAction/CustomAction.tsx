import { FC, memo } from 'react';

import * as Button from '@components/Button';
import { useClass } from '@services';

import { IModalCustomActionProps } from '../../type-definitions';

import styles from './CustomAction.scss';

const CustomAction: FC<IModalCustomActionProps> = memo(
  ({
    addBtnTxt,
    btnGroupClassName,
    children,
    close,
    disableCloseOnConfirm,
    headerIcon,
    headerTxt,
    hideCancel,
    hideConfirm,
    onCancel,
    onConfirm
  }) => {
    const btnGroupClasses = useClass(
      [styles.ButtonsGroup, btnGroupClassName, (hideCancel || hideConfirm) && styles.Center],
      [btnGroupClassName, hideCancel, hideConfirm]
    );

    return (
      <div className={styles.Container}>
        <div className={styles.Header}>
          {headerIcon ? headerIcon : null}
          {headerTxt ? <h1 className={styles.HeaderTxt}>{headerTxt}</h1> : null}
        </div>
        <div>{children}</div>
        {hideCancel && hideConfirm ? null : (
          <div className={btnGroupClasses}>
            {hideCancel ? null : (
              <Button.Secondary
                onClick={() => {
                  close();
                  onCancel && onCancel();
                }}
                text="Cancel"
              />
            )}
            {hideConfirm ? null : (
              <Button.Primary
                onClick={() => {
                  !disableCloseOnConfirm && close();
                  onConfirm && onConfirm();
                }}
                text={addBtnTxt || 'Confirm'}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

export default memo(CustomAction);

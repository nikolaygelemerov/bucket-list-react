import { FC, memo, useMemo } from 'react';
import ReactDOM from 'react-dom';

import { useUpdateOnly } from '@services';

import { IModalInlineProps } from './type-definitions';

import { useModal } from './context';
import { Container } from './components';

const ModalInline: FC<IModalInlineProps> = ({ children, id }) => {
  const {
    modalsToShow,
    orderList,
    actions: { setModal }
  } = useModal();

  const modalEl = document.querySelector('#modal') as HTMLElement;

  const modal = useMemo(() => {
    return modalsToShow[id];
  }, [id, modalsToShow]);

  useUpdateOnly(() => {
    if (orderList.length) {
      orderList.forEach(({ id }) => {
        setModal({ id });
      });
    }
  }, [orderList]);

  return (
    <>
      {modalEl && modal
        ? ReactDOM.createPortal(
            <Container {...modal} id={id}>
              {children}
            </Container>,
            modalEl
          )
        : null}
    </>
  );
};

export default memo(ModalInline);

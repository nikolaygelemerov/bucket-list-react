import { FC, memo, useContext } from 'react';
import ReactDOM from 'react-dom';

import { useUpdateOnly } from '@services';

import { ModalContext } from './context';
import { Container } from './components';

const ModalArena: FC = () => {
  const {
    modalsToShow,
    orderList,
    actions: { setModal }
  } = useContext(ModalContext);

  const modalEl = document.querySelector('#modal') as HTMLElement;

  useUpdateOnly(() => {
    if (orderList.length) {
      orderList.forEach(({ id }) => {
        setModal({ id });
      });
    }
  }, [orderList]);

  return (
    <>
      {Object.keys(modalsToShow).map((modalName) => {
        const { id, inline, ...otherProps } = modalsToShow[modalName];

        return modalEl && !inline
          ? ReactDOM.createPortal(<Container key={modalName} id={id} {...otherProps} />, modalEl)
          : null;
      })}
    </>
  );
};

export default memo(ModalArena);

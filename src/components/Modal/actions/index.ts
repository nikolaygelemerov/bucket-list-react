import { Dispatch, SetStateAction } from 'react';

import { IModalContext, IModal } from '../type-definitions';

export const setModal: (
  modal: IModal,
  setState: Dispatch<SetStateAction<IModalContext>>
) => void = ({ id }, setState) => {
  setState((prevState) => {
    let modalsToShow = { ...prevState.modalsToShow };
    const orderList = [...prevState.orderList];

    const modalIndex = orderList.findIndex((modal) => modal.id === id);
    const modal = orderList[modalIndex];

    const toDeleteList = Object.keys(modalsToShow).reduce<string[]>((accum, modalId) => {
      if (orderList.findIndex((modal) => modal.id === modalId) === -1) {
        accum.push(modalId);
      }

      return accum;
    }, []);

    toDeleteList.forEach((modalId) => {
      delete modalsToShow[modalId];
    });

    if (orderList.length === 0) {
      modalsToShow = {};
    } else if (modal && modal.forceShow === true) {
      modalsToShow = {};
      modalsToShow[id] = modal;
    } else if (
      modalIndex === 0 ||
      (orderList[modalIndex - 1] && orderList[modalIndex - 1].overShow === true)
    ) {
      modalsToShow[id] = modal;
    }

    return {
      ...prevState,
      modalsToShow
    };
  });
};

export const showModalById: (
  modal: IModal,
  setState: Dispatch<SetStateAction<IModalContext>>
) => void = (modalToShow, setState) => {
  setState((prevState) => {
    const { clearPreceding, forceShow, id, overShow } = modalToShow;
    let orderList = [...prevState.orderList];

    if (orderList.find((modal) => modal.id === id)) {
      return prevState;
    } else if (forceShow || overShow) {
      orderList.unshift(modalToShow);
    } else if (clearPreceding) {
      orderList = [modalToShow];
    } else {
      orderList.push(modalToShow);
    }

    return { ...prevState, orderList };
  });
};

export const hideModalById: (
  modal: IModal,
  setState: Dispatch<SetStateAction<IModalContext>>
) => void = (modalToHide, setState) => {
  setState((prevState) => {
    const { id } = modalToHide;

    const orderList = [...prevState.orderList];
    const modalToHideIndex = orderList.findIndex((modal) => modal.id === id);

    if (modalToHideIndex === -1) {
      return prevState;
    }

    orderList.splice(modalToHideIndex, 1);

    return { ...prevState, orderList };
  });
};

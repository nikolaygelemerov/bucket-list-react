import { createContext, ReactNode, useContext } from 'react';

import { IModalContext } from './type-definitions';
import { useModalContextValue } from './hooks';
import ModalArena from './ModalArena';

const initialState: IModalContext = {
  actions: {},
  modalsToShow: {},
  orderList: []
};

export const ModalContext = createContext<IModalContext>(initialState);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { value } = useModalContextValue(initialState);

  return (
    <ModalContext.Provider value={value}>
      <ModalArena />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): IModalContext => useContext(ModalContext);

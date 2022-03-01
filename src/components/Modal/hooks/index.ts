import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import { IModal, IModalContext, TModalAction } from '../type-definitions';

import * as actions from '../actions';

type ModalStateAction = (modal: IModal, setState: Dispatch<SetStateAction<IModalContext>>) => void;

export const useModalContextValue = (
  initialState: IModalContext
): {
  value: IModalContext;
} => {
  const [value, setValue] = useState(initialState);

  const newActions = useMemo(() => {
    return Object.keys(actions).reduce<{ [key: string]: TModalAction }>((accum, actionName) => {
      accum[actionName] = (param: IModal) => {
        (
          actions as {
            [key: string]: ModalStateAction;
          }
        )[actionName](param, setValue);
      };

      return accum;
    }, {});
  }, []);

  const newValue = useMemo(() => ({ ...value, actions: newActions }), [newActions, value]);

  return { value: newValue };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  DependencyList,
  EffectCallback,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useReducer
} from 'react';

interface IState {
  [key: string]: unknown;
}

interface IAction {
  type: unknown;
  payload: unknown;
}

interface IActionsValue {
  [key: string]: (payload: unknown) => void;
}

type TReducer = (prevState: IState, action: IAction) => IState;

export const useContextReducer = ({
  actionTypes,
  initialState,
  reducer
}: {
  actionTypes: { [key: string]: unknown };
  initialState: any;
  reducer: any;
}): {
  value: {
    state: any;
    actions: any;
  };
} => {
  const [state, dispatch] = useReducer(reducer as TReducer, initialState as IState);

  const newActions = useMemo(
    () =>
      Object.keys(actionTypes).reduce((accum, actionName) => {
        accum[actionName] = (payload: unknown) => {
          dispatch({ payload, type: actionTypes[actionName] });
        };

        return accum;
      }, {} as IActionsValue),

    [actionTypes]
  );

  const newValue = useMemo(() => ({ state, actions: newActions }), [newActions, state]);

  return { value: newValue };
};

export const useLastDiffValue = <T>(
  value: T,
  comparator?: ({ prevValue, newValue }: { prevValue: T; newValue: T }) => boolean
): T | undefined => {
  const valueList = useRef<T[]>([]);

  valueList.current.unshift(value);

  const lastDiffValue = valueList.current.find((listValue) =>
    comparator ? comparator({ prevValue: listValue, newValue: value }) : listValue !== value
  );

  return lastDiffValue;
};

type UpdateCallback = EffectCallback | { (): Promise<void> };

export const useUpdate = (callback: UpdateCallback, deps = [] as DependencyList) => {
  useEffect(() => {
    callback();
  }, deps);
};

export const useUpdateOnly = (callback: UpdateCallback, deps = [] as DependencyList): void => {
  const mountRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      return;
    }
    callback();
  }, deps);
};

export const useClass = (classes = [] as unknown[], deps = [] as DependencyList) =>
  useMemo<string>(() => classes.filter(Boolean).join(' '), deps);

export const useOnOutsideClick = ({
  callback,
  element
}: {
  callback: () => void;
  element: RefObject<HTMLElement>;
}): void => {
  const onDocumentClickHandler = useCallback(
    (event: MouseEvent) => {
      if (element.current) {
        if (!element.current.contains(event.target as Node)) {
          callback();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, element.current]
  );

  useEffect(() => {
    document.addEventListener('click', onDocumentClickHandler);

    return () => document.removeEventListener('click', onDocumentClickHandler);
  }, [onDocumentClickHandler]);
};

export const useIsMounted = () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
};

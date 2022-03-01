import { FC, createContext, useContext, ReactNode } from 'react';

import { useContextReducer } from '@services';

import { ActionType } from './action-types';
import { TAction } from './actions';
import { initialContextState, initialState } from './initialState';

const ACTION_TYPES = {
  addBucket: ActionType.ADD_BUCKET,
  addCard: ActionType.ADD_CARD,
  deleteBucket: ActionType.DELETE_BUCKET,
  deleteCard: ActionType.DELETE_CARD,
  editBucket: ActionType.EDIT_BUCKET,
  editCard: ActionType.EDIT_CARD,
  setDrag: ActionType.SET_DRAG,
  swapBuckets: ActionType.SWAP_BUCKETS
};

const reducer = (state: IInitialState, action: TAction): IInitialState => {
  switch (action.type) {
    case ActionType.ADD_BUCKET:
      return { ...state, buckets: [...state.buckets, action.payload] };

    case ActionType.ADD_CARD:
      const bucketToAddCardIndex = state.buckets.findIndex(
        ({ id }) => id === action.payload.bucketId
      );

      if (bucketToAddCardIndex !== -1) {
        const newBuckets = [...state.buckets];
        const newBucket = { ...newBuckets[bucketToAddCardIndex] };

        newBucket.cards = [...newBucket.cards, action.payload.card];

        newBuckets.splice(bucketToAddCardIndex, 1, newBucket);

        return { ...state, buckets: newBuckets };
      } else {
        return state;
      }

    case ActionType.DELETE_BUCKET:
      const bucketToDeleteIndex = state.buckets.findIndex(({ id }) => id === action.payload);

      if (bucketToDeleteIndex !== -1) {
        const newBuckets = state.buckets.filter(({ id }) => id !== action.payload);

        return { ...state, buckets: newBuckets };
      } else {
        return state;
      }

    case ActionType.DELETE_CARD:
      const bucketToDeleteCardIndex = state.buckets.findIndex(
        ({ id }) => id === action.payload.bucketId
      );

      if (bucketToDeleteCardIndex !== -1) {
        const newBuckets = [...state.buckets];
        const newBucket = { ...newBuckets[bucketToDeleteCardIndex] };

        newBucket.cards = newBucket.cards.filter(({ id }) => id !== action.payload.cardId);

        newBuckets.splice(bucketToDeleteCardIndex, 1, newBucket);

        return { ...state, buckets: newBuckets };
      } else {
        return state;
      }

    case ActionType.EDIT_BUCKET:
      const bucketToEditIndex = state.buckets.findIndex(({ id }) => id === action.payload.id);

      if (bucketToEditIndex !== -1) {
        const newBuckets = [...state.buckets];

        newBuckets.splice(bucketToEditIndex, 1, {
          ...newBuckets[bucketToEditIndex],
          ...action.payload
        });

        return { ...state, buckets: newBuckets };
      } else {
        return state;
      }

    case ActionType.EDIT_CARD:
      const bucketToEditCardIndex = state.buckets.findIndex(
        ({ id }) => id === action.payload.bucketId
      );

      if (bucketToEditCardIndex !== -1) {
        const cardToEditIndex = state.buckets[bucketToEditCardIndex].cards.findIndex(
          ({ id }) => id === action.payload.card.id
        );

        if (cardToEditIndex !== -1) {
          const newBuckets = [...state.buckets];
          const newBucket = { ...newBuckets[bucketToEditCardIndex] };

          newBucket.cards = [...newBucket.cards];

          newBucket.cards.splice(cardToEditIndex, 1, {
            ...newBucket.cards[cardToEditIndex],
            ...action.payload.card
          });

          newBuckets.splice(bucketToEditCardIndex, 1, newBucket);

          return { ...state, buckets: newBuckets };
        } else {
          return state;
        }
      } else {
        return state;
      }

    case ActionType.SET_DRAG:
      return {
        ...state,
        drag: {
          ...state.drag,
          bucketDraggingId: action.payload.bucketId || null,
          cardDraggingId: action.payload.cardId || null
        }
      };

    case ActionType.SWAP_BUCKETS:
      const bucketToSwapOneIndex = state.buckets.findIndex(
        ({ id }) => id === action.payload.bucketIdOne
      );

      const bucketToSwapTwoIndex = state.buckets.findIndex(
        ({ id }) => id === action.payload.bucketIdTwo
      );

      if (bucketToSwapOneIndex !== -1 && bucketToSwapTwoIndex !== -1) {
        const newBuckets = [...state.buckets];

        [newBuckets[bucketToSwapOneIndex], newBuckets[bucketToSwapTwoIndex]] = [
          newBuckets[bucketToSwapTwoIndex],
          newBuckets[bucketToSwapOneIndex]
        ];

        return { ...state, buckets: newBuckets };
      } else {
        return state;
      }

    default:
      throw new Error(`No such action`);
  }
};

export const BucketsContext = createContext(
  initialContextState as unknown as { actions: IActions; state: IInitialState }
);

export const BucketsProvider: FC<{
  children: ReactNode;
}> = ({ children }): JSX.Element => {
  const { value } = useContextReducer({
    actionTypes: ACTION_TYPES,
    initialState,
    reducer
  });

  return <BucketsContext.Provider value={value}>{children}</BucketsContext.Provider>;
};

export const useBuckets = () => useContext(BucketsContext);

import { ActionType } from '../action-types';

interface IAddBucket {
  type: ActionType.ADD_BUCKET;
  payload: IBucket;
}

interface IAddCard {
  type: ActionType.ADD_CARD;
  payload: { bucketId: TItemId; card: ICard };
}

interface IDeleteBucket {
  type: ActionType.DELETE_BUCKET;
  payload: TItemId;
}

interface IDeleteCard {
  type: ActionType.DELETE_CARD;
  payload: { bucketId: TItemId; cardId: TItemId };
}

interface IEditBucket {
  type: ActionType.EDIT_BUCKET;
  payload: IBucket;
}

interface IEditCard {
  type: ActionType.EDIT_CARD;
  payload: { bucketId: TItemId; card: ICard };
}

interface ISetDrag {
  type: ActionType.SET_DRAG;
  payload: { bucketId?: TItemId; cardId?: TItemId };
}

interface ISwapBuckets {
  type: ActionType.SWAP_BUCKETS;
  payload: { bucketIdOne: TItemId; bucketIdTwo: TItemId };
}

export type TAction =
  | IAddBucket
  | IDeleteBucket
  | IAddCard
  | IDeleteCard
  | IEditBucket
  | IEditCard
  | ISetDrag
  | ISwapBuckets;

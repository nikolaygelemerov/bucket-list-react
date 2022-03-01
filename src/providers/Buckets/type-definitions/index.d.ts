interface IInitialState {
  buckets: IBucket[];
  drag: {
    bucketDraggingId: TItemId | null;
    cardDraggingId: TItemId | null;
  };
}

interface IActions {
  addBucket: (bucket: IBucket) => void;
  addCard: ({ bucketId, card }: { bucketId: TItemId; card: ICard }) => void;
  deleteBucket: (bucketId: TItemId) => void;
  deleteCard: ({ bucketId, cardId }: { bucketId: TItemId; cardId: TItemId }) => void;
  editBucket: (bucket: IBucket) => void;
  editCard: ({ bucketId, card }: { bucketId: TItemId; card: ICard }) => void;
  setDrag: ({ bucketId, cardId }: { bucketId?: TItemId; cardId?: TItemId }) => void;
  swapBuckets: ({
    bucketIdOne,
    bucketIdTwo
  }: {
    bucketIdOne: TItemId;
    bucketIdTwo: TItemId;
  }) => void;
}

import { DragEventHandler, FC, memo, useCallback, useMemo } from 'react';

import { ActionMenu, Button, Icon, ModalTemplate, useModal } from '@components';
import { IModalTemplateProps } from '@components/Modal/type-definitions';
import { useBuckets } from '@providers';
import { useClass } from '@services';

import AddEditBucketForm from '../AddEditBucketForm/AddEditBucketForm';
import { AddEditCardForm, Cards } from './components';

import styles from './Bucket.scss';

const Bucket: FC<{
  bucket: IBucket;
}> = ({ bucket }) => {
  const { id, cards, title } = bucket;

  const {
    actions: { addCard, deleteBucket, deleteCard, setDrag, swapBuckets },
    state: {
      buckets,
      drag: { bucketDraggingId, cardDraggingId }
    }
  } = useBuckets();

  const {
    actions: { showModalById }
  } = useModal();

  const items = useMemo(() => {
    return [
      <Button.Icon
        onClick={() =>
          showModalById({
            id: `EditBucket-${id}`,
            inline: true,
            preventModalBackdropClick: true
          })
        }
      >
        <Icon.Edit />
      </Button.Icon>,
      <Button.Icon
        onClick={() =>
          showModalById({
            id: `DeleteBucket-${id}`,
            content: (props: IModalTemplateProps) => (
              <ModalTemplate.CustomAction
                {...props}
                headerIcon={<Icon.Warn width="40" height="40" />}
                headerTxt="Delete Bucket"
                onConfirm={() => deleteBucket(id)}
              />
            )
          })
        }
      >
        <Icon.Delete />
      </Button.Icon>
    ];
  }, [deleteBucket, id, showModalById]);

  const onDragStart = useCallback<DragEventHandler>(
    (e) => {
      e.dataTransfer.setData('bucketToDragId', id as string);

      setDrag({ bucketId: id });
    },
    [id, setDrag]
  );

  const onDragEnd = useCallback<DragEventHandler>(() => {
    setDrag({});
  }, [setDrag]);

  const onDragOver = useCallback<DragEventHandler>((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback<DragEventHandler>(
    (e) => {
      const bucketToDragId = e.dataTransfer.getData('bucketToDragId');
      const cardToDragId = e.dataTransfer.getData('cardToDragId');
      const bucketToRemoveFromId = e.dataTransfer.getData('bucketToRemoveFromId');

      if (cardToDragId && bucketToRemoveFromId && bucketToRemoveFromId !== bucket.id) {
        const card = buckets
          .find(({ id }) => id === bucketToRemoveFromId)
          ?.cards.find(({ id }) => id === cardToDragId);

        card &&
          addCard({
            bucketId: bucket.id,
            card
          });

        deleteCard({ bucketId: bucketToRemoveFromId, cardId: cardToDragId });
      }

      bucketToDragId && swapBuckets({ bucketIdOne: bucket.id, bucketIdTwo: bucketToDragId });
      setDrag({});
    },
    [addCard, bucket.id, buckets, deleteCard, setDrag, swapBuckets]
  );

  return (
    <>
      <li
        className={useClass(
          [
            styles.Container,
            bucketDraggingId && styles.DraggingBucket,
            cardDraggingId && styles.DraggingCard
          ],
          [bucketDraggingId, cardDraggingId]
        )}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className={styles.Header}>
          <h3>{title}</h3>
          <div>
            <ActionMenu items={items} />
          </div>
        </div>
        <Cards bucketId={id} cards={cards} />

        <div className={styles.AddCardBtnWrap}>
          <Button.Icon
            className={styles.AddCardBtn}
            onClick={() => {
              showModalById({
                id: `AddCard-${id}`,
                inline: true,
                preventModalBackdropClick: true
              });
            }}
          >
            <Icon.Plus width="20" height="20" />
            Add another card
          </Button.Icon>
        </div>
      </li>

      <AddEditCardForm bucketId={id} />
      <AddEditBucketForm bucket={bucket} />
    </>
  );
};

export default memo(Bucket);

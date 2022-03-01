import { DragEventHandler, FC, memo, useCallback, useMemo } from 'react';

import { ActionMenu, Button, Icon, ModalTemplate, useModal } from '@components';
import { IModalTemplateProps } from '@components/Modal/type-definitions';
import { useBuckets } from '@providers';
import colors from '@styles/shared/_variables.scss';

import AddEditCardForm from '../../AddEditCardForm/AddEditCardForm';

import styles from './Card.scss';

const Card: FC<{ bucketId: TItemId; card: ICard }> = ({ bucketId, card }) => {
  const { id, content, types } = card;

  const {
    actions: { deleteCard, setDrag }
  } = useBuckets();

  const {
    actions: { showModalById }
  } = useModal();

  const items = useMemo(() => {
    return [
      <Button.Icon
        onClick={() =>
          showModalById({
            id: `EditCard-${id}`,
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
            id: `deleteCard-${id}`,
            content: (props: IModalTemplateProps) => (
              <ModalTemplate.CustomAction
                {...props}
                headerIcon={<Icon.Warn width="40" height="40" />}
                headerTxt="Delete Card"
                onConfirm={() => deleteCard({ bucketId, cardId: id })}
              />
            )
          })
        }
      >
        <Icon.Delete />
      </Button.Icon>
    ];
  }, [bucketId, deleteCard, id, showModalById]);

  const onDragStart = useCallback<DragEventHandler>(
    (e) => {
      e.stopPropagation();

      e.dataTransfer.setData('cardToDragId', id as string);
      e.dataTransfer.setData('bucketToRemoveFromId', bucketId as string);

      setDrag({ cardId: id });
    },
    [bucketId, id, setDrag]
  );

  const onDragEnd = useCallback<DragEventHandler>(() => {
    setDrag({});
  }, [setDrag]);

  const onDragOver = useCallback<DragEventHandler>((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <li
        className={styles.Container}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className={styles.Header}>
          <div className={styles.CardTypesWrap}>
            {types?.map((type) => (
              <span
                key={type}
                className={styles.CardType}
                style={{ backgroundColor: colors[`color_type_${type}`] }}
              >
                {type}
              </span>
            ))}
          </div>
          <div>
            <ActionMenu items={items} />
          </div>
        </div>
        <p className={styles.Content}>{content}</p>
      </li>

      <AddEditCardForm bucketId={bucketId} card={card} />
    </>
  );
};

export default memo(Card);

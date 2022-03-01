import { FC, memo, useCallback, useMemo, useState } from 'react';

import { Icon, ModalInline, ModalTemplate, TextArea, useModal } from '@components';
import { IModalTemplateProps } from '@components/Modal/type-definitions';
import { useBuckets } from '@providers';
import { GlobalModel, useUpdate } from '@services';

import { CardTypes } from './components';

const AddEditCardForm: FC<{ bucketId: TItemId; card?: ICard }> = ({ bucketId, card }) => {
  const mode = useMemo(() => (card?.id ? 'Edit' : 'Add'), [card?.id]);

  const {
    actions: { addCard, editCard },
    state: { buckets }
  } = useBuckets();

  const {
    actions: { showModalById }
  } = useModal();

  const [formState, setFormState] = useState({
    content: card?.content || '',
    types: card?.types || []
  });

  const syncFormState = useCallback(
    () =>
      setFormState((prevState) => ({
        ...prevState,
        ...(card ? card : { content: '', types: [] })
      })),
    [card]
  );

  const hasCardWithSameContent = useMemo(() => {
    const cardContents: { [key: string]: TItemId } = buckets.reduce((accum, bucket) => {
      const bucketCardsNames = bucket.cards.reduce((innerAccum, card) => {
        innerAccum[card.content] = card.id;

        return innerAccum;
      }, {} as { [key: string]: TItemId });

      return { ...accum, ...bucketCardsNames };
    }, {});

    return !!(cardContents[formState.content] && cardContents[formState.content] !== card?.id);
  }, [buckets, card?.id, formState.content]);

  const onConfirm = useCallback(() => {
    const cardContentIsEmpty = formState.content === '';

    if (cardContentIsEmpty || hasCardWithSameContent) {
      showModalById({
        id: `warn-${card?.id}`,
        content: (props: IModalTemplateProps) => (
          <ModalTemplate.CustomAction
            {...props}
            addBtnTxt="OK"
            headerIcon={<Icon.Warn width="40" height="40" />}
            headerTxt={cardContentIsEmpty ? 'Content cannot be empty' : 'Content already exists'}
            hideCancel={true}
          />
        ),
        forceShow: true
      });
    } else {
      const action = mode === 'Add' ? addCard : editCard;
      const newCard = mode === 'Add' ? { id: GlobalModel.idGenerator() } : card;

      action({
        bucketId,
        card: { ...newCard, content: formState.content, types: formState.types } as ICard
      });
    }

    syncFormState();
  }, [
    addCard,
    bucketId,
    card,
    editCard,
    formState.content,
    formState.types,
    hasCardWithSameContent,
    mode,
    showModalById,
    syncFormState
  ]);

  useUpdate(() => {
    syncFormState();
  }, [card]);

  return (
    <ModalInline id={`${mode}Card-${mode === 'Add' ? bucketId : card?.id}`}>
      {(props: IModalTemplateProps) => (
        <ModalTemplate.CustomAction
          {...props}
          disableCloseOnConfirm={formState.content === '' || hasCardWithSameContent}
          headerIcon={<Icon.Confirm width="40" height="40" />}
          headerTxt={`${mode} Card`}
          onCancel={syncFormState}
          onConfirm={onConfirm}
        >
          <CardTypes
            onChange={(types) => setFormState((prevState) => ({ ...prevState, types }))}
            types={formState.types}
          />
          <TextArea
            id="content"
            label="Content"
            onChange={(content) => setFormState((prevState) => ({ ...prevState, content }))}
            value={formState.content}
          />
        </ModalTemplate.CustomAction>
      )}
    </ModalInline>
  );
};

export default memo(AddEditCardForm);

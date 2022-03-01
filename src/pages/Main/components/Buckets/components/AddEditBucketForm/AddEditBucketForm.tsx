import { FC, memo, useCallback, useMemo, useState } from 'react';

import { Icon, Input, ModalInline, ModalTemplate, useModal } from '@components';
import { IModalTemplateProps } from '@components/Modal/type-definitions';
import { useBuckets } from '@providers';
import { GlobalModel, useUpdate } from '@services';

const AddEditBucketForm: FC<{ bucket?: IBucket }> = ({ bucket }) => {
  const mode = useMemo(() => (bucket?.id ? 'Edit' : 'Add'), [bucket?.id]);

  const {
    actions: { addBucket, editBucket },
    state: { buckets }
  } = useBuckets();

  const {
    actions: { showModalById }
  } = useModal();

  const [formState, setFormState] = useState({ title: bucket?.title || '' });

  const syncFormState = useCallback(
    () =>
      setFormState((prevState) => ({
        ...prevState,
        ...(bucket ? bucket : { title: '' })
      })),
    [bucket]
  );

  const hasBucketWithSameTitle = useMemo(() => {
    const bucketTitles = buckets.reduce((accum, bucket) => {
      accum[bucket.title] = bucket.id;

      return accum;
    }, {} as { [key: string]: TItemId });

    return !!(bucketTitles[formState.title] && bucketTitles[formState.title] !== bucket?.id);
  }, [bucket?.id, buckets, formState.title]);

  const onConfirm = useCallback(() => {
    const bucketTitleIsEmpty = formState.title === '';

    if (bucketTitleIsEmpty || hasBucketWithSameTitle) {
      showModalById({
        id: `warn-${bucket?.id}`,
        content: (props: IModalTemplateProps) => (
          <ModalTemplate.CustomAction
            {...props}
            addBtnTxt="OK"
            headerIcon={<Icon.Warn width="40" height="40" />}
            headerTxt={bucketTitleIsEmpty ? 'Title cannot be empty' : 'Title already exists'}
            hideCancel={true}
          />
        ),
        forceShow: true
      });
    } else {
      const action = mode === 'Add' ? addBucket : editBucket;
      const newBucket = mode === 'Add' ? { id: GlobalModel.idGenerator(), cards: [] } : bucket;

      action({ ...newBucket, title: formState.title } as IBucket);
    }

    syncFormState();
  }, [
    addBucket,
    bucket,
    editBucket,
    formState.title,
    hasBucketWithSameTitle,
    mode,
    showModalById,
    syncFormState
  ]);

  useUpdate(() => {
    syncFormState();
  }, [bucket]);

  return (
    <ModalInline id={mode === 'Add' ? 'AddBucket' : `EditBucket-${bucket?.id}`}>
      {(props: IModalTemplateProps) => (
        <ModalTemplate.CustomAction
          {...props}
          disableCloseOnConfirm={formState.title === '' || hasBucketWithSameTitle}
          headerIcon={<Icon.Confirm width="40" height="40" />}
          headerTxt={`${mode} Bucket`}
          onCancel={syncFormState}
          onConfirm={onConfirm}
        >
          <Input
            id="title"
            label="Title"
            onChange={(title) => setFormState((prevState) => ({ ...prevState, title }))}
            value={formState.title}
          />
        </ModalTemplate.CustomAction>
      )}
    </ModalInline>
  );
};

AddEditBucketForm.displayName = 'AddEditBucketForm';

export default memo(AddEditBucketForm);

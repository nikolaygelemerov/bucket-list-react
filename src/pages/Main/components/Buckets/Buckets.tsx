import { FC, memo, useRef } from 'react';

import { Button, Icon, useModal } from '@components';
import { useBuckets } from '@providers';
import { useLastDiffValue, useUpdateOnly } from '@services';

import { AddEditBucketForm, Bucket } from './components';

import styles from './Buckets.scss';

const Buckets: FC = () => {
  const {
    state: { buckets }
  } = useBuckets();

  const {
    actions: { showModalById }
  } = useModal();

  const prevBucketsLength = useLastDiffValue(buckets.length);

  const bucketsWrapRef = useRef<null | HTMLDivElement>(null);
  const bucketsRef = useRef<null | HTMLUListElement>(null);

  useUpdateOnly(() => {
    if (prevBucketsLength === buckets.length - 1) {
      if (bucketsWrapRef.current && bucketsRef.current) {
        bucketsWrapRef.current.scrollLeft = bucketsRef.current.scrollWidth;
      }
    }
  }, [prevBucketsLength]);

  return (
    <>
      <div className={styles.AddBucketBtnWrap}>
        <Button.Icon
          className={styles.AddBucketBtn}
          onClick={() => {
            showModalById({
              id: `AddBucket`,
              inline: true,
              preventModalBackdropClick: true
            });
          }}
        >
          <Icon.Plus width="20" height="20" />
          Add another bucket
        </Button.Icon>
      </div>

      <AddEditBucketForm />

      <div className={styles.BucketsWrap} ref={bucketsWrapRef}>
        <ul className={styles.Buckets} ref={bucketsRef}>
          {buckets.map((bucket) => (
            <Bucket key={bucket.id} bucket={bucket} />
          ))}
        </ul>
      </div>
    </>
  );
};

Buckets.displayName = 'Buckets';

export default memo(Buckets);

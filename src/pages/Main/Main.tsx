import { FC, memo } from 'react';

import { Buckets } from './components';

import styles from './Main.scss';

const Main: FC = () => {
  return (
    <section className={styles.Container}>
      <Buckets />
    </section>
  );
};

export default memo(Main);

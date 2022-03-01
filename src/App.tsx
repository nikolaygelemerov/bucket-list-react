import { FC, memo } from 'react';

import { ModalProvider } from '@components';
import { Main } from '@pages';
import { BucketsProvider } from '@providers';

import styles from './App.scss';

const App: FC = () => {
  return (
    <ModalProvider>
      <BucketsProvider>
        <main className={styles.App}>
          <Main />
        </main>
      </BucketsProvider>
    </ModalProvider>
  );
};

export default memo(App);

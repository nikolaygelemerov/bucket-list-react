import { FC, memo } from 'react';

import Card from './Card/Card';

import styles from './Cards.scss';

const Cards: FC<{ bucketId: TItemId; cards: ICard[] }> = ({ bucketId, cards }) => {
  return (
    <ul className={styles.Container}>
      {cards.map((card) => (
        <Card key={card.id} bucketId={bucketId} card={card} />
      ))}
    </ul>
  );
};

Cards.defaultProps = {
  cards: []
};

Cards.displayName = 'Cards';

export default memo(Cards);

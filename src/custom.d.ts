declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

type TItemId = string | number;

interface IBucket {
  id: TItemId;
  title: string;
  cards: ICard[];
}

type TCard = {
  Achieved: 'Achieved';
  Missed: 'Missed';
  Next: 'Next';
  Planning: 'Planning';
  Progress: 'Progress';
  Risk: 'Risk';
  Tip: 'Tip';
  Track: 'Track';
};

interface ICard {
  id: TItemId;
  content: string;
  types?: (keyof TCard)[];
}

interface ISvgIcon {
  className?: string;
  dataTest?: string;
  fill?: string;
  height?: string;
  stroke?: string;
  strokeWidth?: string;
  width?: string;
}

/* eslint-disable max-len */
import { GlobalModel } from '@services';

export const initialState: IInitialState = {
  buckets: [
    {
      id: GlobalModel.idGenerator(),
      title: 'Goal 1: Grow Customers By 25%',
      cards: [
        {
          id: GlobalModel.idGenerator(),
          content: 'Trello Tip: Set S. M. A. R. T Goals (Click for more info)',
          types: ['Tip']
        },
        {
          id: GlobalModel.idGenerator(),
          content: 'Current Progress Towards "Grow Customers By 25%"',
          types: ['Risk']
        },
        {
          id: GlobalModel.idGenerator(),
          content: 'Launch customer referral email program',
          types: ['Next']
        },
        {
          id: GlobalModel.idGenerator(),
          content:
            'Trello Tip: Cards can summarize specific projects and efforts that your team is working on to reach the goal.',
          types: ['Tip']
        }
      ]
    },
    {
      id: GlobalModel.idGenerator(),
      title: 'Goal 2: Reduce Office Supply Costs By 15%',
      cards: [
        {
          id: GlobalModel.idGenerator(),
          content: 'Trello Tip: Card labels! What do they mean? (Click for more info)',
          types: ['Achieved', 'Next', 'Risk', 'Missed', 'Progress', 'Track', 'Tip', 'Planning']
        },
        {
          id: GlobalModel.idGenerator(),
          content: 'Current Progress Towards "Reduce Office Supply $$ By 15%"',
          types: ['Track']
        },
        {
          id: GlobalModel.idGenerator(),
          content: 'Reduce total team printing volume by 20%',
          types: ['Progress']
        },
        {
          id: GlobalModel.idGenerator(),
          content: 'Negotiate loyalty discount with supplier for new fiscal year',
          types: ['Achieved']
        }
      ]
    },
    {
      id: GlobalModel.idGenerator(),
      title: 'Goal Template',
      cards: [
        {
          id: GlobalModel.idGenerator(),
          content: 'Current Progress Towards Goal',
          types: ['Track']
        },
        {
          id: GlobalModel.idGenerator(),
          content:
            'Trello Tip: Try these 5 team-building exercises for setting goals! (Click for more info)',
          types: ['Tip']
        }
      ]
    },
    {
      id: GlobalModel.idGenerator(),
      title: 'Done (Q1 2019)',
      cards: [
        {
          id: GlobalModel.idGenerator(),
          content: 'Trello Tip: Put finished projects and closed goals here',
          types: ['Tip']
        },
        {
          id: GlobalModel.idGenerator(),
          content: 'Hire 5 new people for 2019',
          types: ['Achieved']
        }
      ]
    },
    {
      id: GlobalModel.idGenerator(),
      title: 'Done (Q4 2018)',
      cards: [
        {
          id: GlobalModel.idGenerator(),
          content:
            'Trello Tip: Create new "Done" lists for each quarter to build a history of accomplished goals',
          types: ['Tip']
        }
      ]
    }
  ],
  drag: {
    bucketDraggingId: null,
    cardDraggingId: null
  }
};

export const initialContextState = {
  actions: {
    addBucket: () => {
      throw new Error('No Buckets Provider');
    },
    addCard: () => {
      throw new Error('No Buckets Provider');
    },
    deleteBucket: () => {
      throw new Error('No Buckets Provider');
    },
    deleteCard: () => {
      throw new Error('No Buckets Provider');
    },
    editBucket: () => {
      throw new Error('No Buckets Provider');
    },
    editCard: () => {
      throw new Error('No Buckets Provider');
    }
  } as unknown as IActions,
  state: initialState
};

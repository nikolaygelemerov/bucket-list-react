import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TModalId = any;

export type TModalIds = {
  addBucket: 'addBucket';
  addCard: 'addCard';
  deleteBucket: 'deleteBucket';
  deleteCard: 'deleteCard';
  editBucket: 'editBucket';
  editCard: 'editCard';
};

export interface IModal {
  children?: TChildren;
  clearPreceding?: boolean;
  containerClass?: string;
  content?: ReactNode;
  contentClass?: string;
  forceShow?: boolean;
  hasCloseIcon?: boolean;
  id: TModalId;
  inline?: boolean;
  onClose?: () => void;
  overShow?: boolean;
  preventModalBackdropClick?: boolean;
}

export interface IModalTemplateProps extends Omit<IModal, 'onClose'> {
  close: () => void;
}

export type TModalAction = (modal: IModal) => void;

export interface IModalContext {
  actions: { [key: string]: TModalAction };
  modalsToShow: { [key: string]: IModal };
  orderList: IModal[];
}

export interface IModalCustomActionProps extends IModalTemplateProps {
  addBtnTxt?: string;
  btnGroupClassName?: string;
  children?: ReactNode;
  disableCloseOnConfirm?: boolean;
  headerIcon?: ReactNode;
  headerTxt?: string;
  hideCancel?: boolean;
  hideConfirm?: boolean;
  id: TModalId;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export interface IModalInlineProps {
  children?: ReactNode;
  id: TModalId;
}

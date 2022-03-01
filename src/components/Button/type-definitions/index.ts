import { MouseEventHandler, ReactNode } from 'react';

export interface IButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  text: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface IButtonIconProps {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

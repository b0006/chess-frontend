export type TAppearance = 'info' | 'error' | 'success' | 'warning';

export type TPlacement = 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right';

export interface IContent {
  title: string;
  description: string;
  showCloseButton?: boolean;
}

export interface IOptions {
  id?: string;
  placement?: TPlacement;
  appearance?: TAppearance;
}

export interface INotificationState extends IContent, IOptions {
  needClose?: boolean;
}

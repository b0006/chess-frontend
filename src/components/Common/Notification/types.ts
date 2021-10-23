export type Appearance = 'info' | 'error' | 'success' | 'warning';

export type Placement = 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right';

export interface IContent {
  title: string;
  description: string;
  showCloseButton?: boolean;
}

export interface IOptions {
  id?: string;
  placement?: Placement;
  appearance?: Appearance;
}

export interface INotificationState extends IContent, IOptions {
  needClose?: boolean;
}

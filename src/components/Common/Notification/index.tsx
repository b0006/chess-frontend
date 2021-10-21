import React from 'react';

import { NotificationProvider } from './NotificationContext/NotificationContext';
import { Provider as InnerProvider } from './NotificationContext/NotificationProvider';

export { useNotification } from './NotificationContext/NotificationProvider';

interface IProps {
  portalTargetSelector?: string;
}

export const Provider: React.FC<IProps> = ({ children, portalTargetSelector }) => (
  <NotificationProvider>
    <InnerProvider portalTargetSelector={portalTargetSelector}>{children}</InnerProvider>
  </NotificationProvider>
);

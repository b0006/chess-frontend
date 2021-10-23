import React from 'react';

import { NotificationProvider } from './NotificationContext/NotificationContext';
import { Provider as InnerProvider } from './NotificationContext/NotificationProvider';

export { useNotification } from './NotificationContext/NotificationProvider';

interface Props {
  portalTargetSelector?: string;
}

export const Provider: React.FC<Props> = ({ children, portalTargetSelector }) => (
  <NotificationProvider>
    <InnerProvider portalTargetSelector={portalTargetSelector}>{children}</InnerProvider>
  </NotificationProvider>
);

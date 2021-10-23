/* eslint-disable max-len */
import { observer } from 'mobx-react-lite';
import React from 'react';

import { userStore } from '../../../../mobx';

import styles from './RightContent.module.scss';

const RightContent: React.FC = observer(() => {
  const { user } = userStore;
  return <div className={styles.wrapper}>{user.profileData?.username ? user.profileData.username : 'right'}</div>;
});

export { RightContent };

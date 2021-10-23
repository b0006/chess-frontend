import React from 'react';

import { Container } from '../Container';
import { Button } from '../../Common/Button';

import { RightContent } from './RightContent';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <div className={styles.left}>
          <Button href="/" icon="home" theme="flat" />
        </div>
        <div className={styles.center}>center</div>
        <div className={styles.right}>
          <RightContent />
        </div>
      </Container>
    </header>
  );
};

export { Header };

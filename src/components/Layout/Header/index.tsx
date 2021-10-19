import React from 'react';

import { Container } from '../Container';

import RightContent from './RightContent';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <div className={styles.left}>left</div>
        <div className={styles.center}>center</div>
        <div className={styles.right}>
          <RightContent />
        </div>
      </Container>
    </header>
  );
};

export default Header;

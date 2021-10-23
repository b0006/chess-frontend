import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from '../Container';

import { RightContent } from './RightContent';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <div className={styles.left}>
          <Link to="/">Chess</Link>
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

import React from 'react';

import { Container } from '../Container';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <Container className={styles.footer} as="footer">
      Footer
    </Container>
  );
};

export { Footer };

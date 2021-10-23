import React from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';

import styles from './Layout.module.scss';

interface Props {
  title?: string;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>{children}</main>
      <Footer />
    </div>
  );
};

export { Layout };

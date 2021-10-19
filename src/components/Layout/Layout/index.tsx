import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

import styles from './Layout.module.scss';

interface IProps {
  title?: string;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

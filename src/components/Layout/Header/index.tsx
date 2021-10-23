import React from 'react';

import { Container } from '../Container';
import { Button } from '../../Common/Button';
import { useMediaBreakpoint } from '../../../hook/useMedia.hook';
import { BREAKPOINT_SM } from '../../../utils/breakpoints';

import { RightContent } from './RightContent';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const isDesktop = useMediaBreakpoint(BREAKPOINT_SM);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <div className={styles.left}>
          <Button href="/" icon="home" theme="flat" text={isDesktop ? 'Главная' : ''} />
        </div>
        <div className={styles.center}>Шахматы онлайн</div>
        <div className={styles.right}>
          <RightContent />
        </div>
      </Container>
    </header>
  );
};

export { Header };

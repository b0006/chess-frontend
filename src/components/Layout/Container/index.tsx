import React from 'react';
import cn from 'classnames';

import './styles.scss';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  as?: 'div' | 'header' | 'main' | 'footer';
}

const Container = React.forwardRef(
  ({ children, className, as = 'div', ...rest }: IProps, ref: React.LegacyRef<never>) => {
    const Tag = as;
    return (
      <Tag {...rest} className={cn(className, 'container')} ref={ref}>
        {children}
      </Tag>
    );
  }
);

Container.displayName = 'Container';

export { Container };

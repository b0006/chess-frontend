import React from 'react';

import { Container } from '../../components/Layout/Container';
import { LoginForm } from '../../components/Profile/LoginForm';

const SignInPage: React.FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export { SignInPage };

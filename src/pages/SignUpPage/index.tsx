import React from 'react';

import { Container } from '../../components/Layout/Container';
import { SignUpForm } from '../../components/Profile/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
};

export { SignUpPage };

import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Layout } from '../components/Layout/Layout';
import { userStore } from '../mobx';
import { LoaderMain } from '../components/Layout/LoaderMain';

interface IRouteComponentProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
  isPrivate: boolean;
  redirectAuthPath?: string;
}

const CommonRoute: React.FC<IRouteComponentProps> = observer(
  ({ component: Component, isPrivate, redirectAuthPath = '/sign-in', ...rest }) => {
    const { isInitLoading, user } = userStore;
    if (isInitLoading) {
      return <LoaderMain />;
    }

    if (isPrivate && !user.isAuth) {
      return <Redirect to={redirectAuthPath} />;
    }

    return (
      <Route
        {...rest}
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    );
  }
);

export { CommonRoute };

import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Layout } from '../components/Layout/Layout';
import { userStore } from '../mobx';
import { LoaderMain } from '../components/Layout/LoaderMain';

interface IRouteComponentProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
  redirectAuthPath?: string;
}

const PublicRoute: React.FC<IRouteComponentProps> = observer(({ component: Component, redirectAuthPath, ...rest }) => {
  const { isInitLoading, user } = userStore;
  if (isInitLoading) {
    return <LoaderMain />;
  }

  if (redirectAuthPath && user.isAuth) {
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
});

const PrivateRoute: React.FC<IRouteComponentProps> = observer(
  ({ component: Component, redirectAuthPath = '/sign-in', ...rest }) => {
    const { isInitLoading, user } = userStore;
    if (isInitLoading) {
      return <LoaderMain />;
    }

    return (
      <Route
        {...rest}
        render={(props) =>
          user.isAuth ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to={redirectAuthPath} />
          )
        }
      />
    );
  }
);

export { PublicRoute, PrivateRoute };

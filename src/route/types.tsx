import React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';

import { Layout } from '../components/Layout/Layout';

interface IRouteComponentProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

interface IRoutePublicProps extends IRouteComponentProps {
  isRedirectAuth?: boolean;
}

const PublicRoute: React.FC<IRoutePublicProps> = ({ component: Component, isRedirectAuth, ...rest }) => {
  // const { profile } = profileStore;
  // if (isRedirectAuth && profile.isAuth) {
  //   return <Redirect to="/" />;
  // }

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
};

// const PrivateRoute: React.FC<IRouteComponentProps> = observer(({ component: Component, ...rest }) => {
//   const { profile } = profileStore;
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         profile.isAuth ? (
//           <Layout>
//             <Component {...props} />
//           </Layout>
//         ) : (<Redirect to="/sign-in" />)
//       }
//     />
//   );
// });

export { PublicRoute };

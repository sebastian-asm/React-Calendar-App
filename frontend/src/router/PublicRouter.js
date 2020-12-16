import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRouter = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        // Solo cargará el componente si aún no hay un login
        !isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PublicRouter.protoTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PublicRouter;

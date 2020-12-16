import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRouter = ({ isAuth, component: Component, ...rest }) => {
  const { location } = rest;

  // Guardando el ultimo path de la url
  // Se actualiza cada vez que se accede a una ruta privada
  localStorage.setItem('lastPath', location.pathname);

  return (
    <Route
      {...rest}
      component={(props) =>
        // Solo cargará el componente si existe un login
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRouter.protoTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRouter;

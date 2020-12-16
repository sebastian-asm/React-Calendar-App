import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { startChecking } from '../actions/auth';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) return <h4>Espere por favor...</h4>;

  return (
    <Router>
      <div>
        <Switch>
          {/* El !! permite combertir a boolean, en este caso a true */}
          <PublicRouter
            exact
            path="/login"
            component={LoginScreen}
            isAuth={!!uid}
          />

          <PrivateRouter
            exact
            path="/"
            component={CalendarScreen}
            isAuth={!!uid}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;

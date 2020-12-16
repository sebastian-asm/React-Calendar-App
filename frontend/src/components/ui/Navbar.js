import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(startLogout());

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Calendar</span>
      <span className="text-white-50">Bienvenido/a, {name}</span>
      <button onClick={handleLogout} className="btn btn-warning">
        <i className="fas fa-sign-out-alt mr-2"></i>
        Salir
      </button>
    </div>
  );
};

export default Navbar;

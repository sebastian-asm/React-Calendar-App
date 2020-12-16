import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    loginEmail: 'belu@belu.com',
    loginPassword: '12345',
  });

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    registerName: 'belu',
    registerEmail: 'belu@belu.com',
    registerPassword: '12345',
    registerPassword2: '12345',
  });

  const { loginEmail, loginPassword } = formLoginValues;
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
  } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerPassword !== registerPassword2)
      return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');

    dispatch(startRegister(registerName, registerEmail, registerPassword));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                value={loginEmail}
                onChange={handleLoginInputChange}
                name="loginEmail"
                type="text"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                value={loginPassword}
                onChange={handleLoginInputChange}
                name="loginPassword"
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btnSubmit">
                Ingresar
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                value={registerName}
                onChange={handleRegisterInputChange}
                name="registerName"
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                value={registerEmail}
                onChange={handleRegisterInputChange}
                name="registerEmail"
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                value={registerPassword}
                onChange={handleRegisterInputChange}
                name="registerPassword"
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group">
              <input
                value={registerPassword2}
                onChange={handleRegisterInputChange}
                name="registerPassword2"
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

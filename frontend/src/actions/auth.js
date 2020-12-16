import Swal from 'sweetalert2';

import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
    const { ok, token, user, message } = await resp.json();

    // Si la respuesta es correcta se guada el token en el localStorage
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: user.uid,
          name: user.name,
        })
      );
    } else {
      Swal.fire({
        title: 'Error de autenticación',
        icon: 'error',
        text: message,
      });
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(
      'auth/new',
      { name, email, password },
      'POST'
    );
    const { ok, token, user, message } = await resp.json();

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: user._id,
          name: user.name,
        })
      );
    } else {
      Swal.fire({
        title: 'Error de registro',
        icon: 'error',
        text: message,
      });
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken('auth/renew');
    const data = await resp.json();

    if (data.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: data.user.uid,
          name: data.user.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});

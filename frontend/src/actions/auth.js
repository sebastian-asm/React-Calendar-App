import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithToken('auth', { email, password }, 'POST');
    const { ok, token, user } = await resp.json();

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
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchWithToken } from '../helpers/fetch';

// Iniciar el proceso para guardar en la db
export const startEventAddNew = (event) => {
  return async (dispatch, getState) => {
    try {
      // Leyendo del store de redux
      const { uid, name } = getState().auth;

      const resp = await fetchWithToken('events', event, 'POST');
      const data = await resp.json();

      if (data.ok) {
        event.id = data.event._id;
        event.user = {
          uid,
          name,
        };

        console.log(event);
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Proceso que guarda en la db
const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActive = () => ({
  type: types.eventClearActive,
});

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('events');
      const data = await resp.json();

      if (data.ok) dispatch(eventLoaded(data.events));
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event._id}`, event, 'PUT');
      const data = await resp.json();

      if (!data.ok) return Swal.fire('Error', data.message, 'error');

      dispatch(eventUpdated(event));
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    try {
      const { activeEvent } = getState().calendar;
      const resp = await fetchWithToken(
        `events/${activeEvent._id}`,
        {},
        'DELETE'
      );
      const data = await resp.json();

      if (!data.ok) return Swal.fire('Error', data.message, 'error');

      dispatch(eventDeleted());
    } catch (error) {
      console.log(error);
    }
  };
};

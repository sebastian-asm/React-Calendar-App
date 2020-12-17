// import moment from 'moment';

// {
//   id: new Date().getTime(),
//   title: 'Personal',
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   notes: 'Mensaje de prueba',
//   user: {
//     _id: '1',
//     name: 'Sebas',
//   },
// },

import { types } from '../types/types';

const initialState = {
  events: [],
  activeEvent: null,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };

    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
      };

    default:
      return state;
  }
};

export default calendarReducer;

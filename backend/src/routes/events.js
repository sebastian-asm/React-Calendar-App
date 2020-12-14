import { Router } from 'express';
import { check } from 'express-validator';

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/events.js';
import validateFields from '../middlewares/validate-fields.js';
import validateJwt from '../middlewares/validate-jwt.js';
// import isDate from '../helpers/isDate.js';

const eventsRouter = Router();

// Todas las peticiones necesitarán un token
eventsRouter.use(validateJwt);

eventsRouter.get('/', getEvents);

eventsRouter.post(
  '/',
  [
    check('title', 'El título es necesario').escape().trim().notEmpty(),
    check('start', 'Se necesita una fecha de inicio válida')
      .escape()
      .trim()
      .isDate(),
    check('end', 'Se necesita una fecha de termino válida')
      .escape()
      .trim()
      .isDate(),
    validateFields,
  ],
  createEvent
);

eventsRouter.put(
  '/:eventId',
  [
    check('title', 'El título es necesario').escape().trim().notEmpty(),
    check('start', 'Se necesita una fecha de inicio válida')
      .escape()
      .trim()
      .isDate(),
    check('end', 'Se necesita una fecha de termino válida')
      .escape()
      .trim()
      .isDate(),
    validateFields,
  ],
  updateEvent
);

eventsRouter.delete('/:eventId', deleteEvent);

export default eventsRouter;

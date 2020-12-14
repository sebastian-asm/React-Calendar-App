import { response, request } from 'express';

import Event from '../models/Event.js';

export const getEvents = async (req = request, res = response) => {
  try {
    const events = await Event.find().populate('user', 'name');

    res.json({
      ok: true,
      message: 'Obtenidos todos los eventos exitosamente',
      events,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Hubo un error en la petición',
      error,
    });
  }
};

export const createEvent = async (req = request, res = response) => {
  try {
    const event = new Event(req.body);
    event.user = req.uid;

    await event.save();

    res.json({
      ok: true,
      message: 'Evento creado exitosamente',
      event,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Hubo un error en la petición',
      error,
    });
  }
};

export const updateEvent = async (req = request, res = response) => {
  try {
    const { eventId } = req.params;
    const { uid } = req;
    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({
        ok: false,
        message: 'El evento no existe',
      });

    // Solo quien creo el evento lo podrá modificar
    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        message: 'No puede actualizar este evento',
      });

    const newEvent = { ...req.body, user: uid };
    const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      message: 'Evento actualizado exitosamente',
      event_update: eventUpdate,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Hubo un error en la petición',
      error,
    });
  }
};

export const deleteEvent = async (req = request, res = response) => {
  try {
    const { eventId } = req.params;
    const { uid } = req;
    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({
        ok: false,
        message: 'El evento no existe',
      });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        message: 'No puede eliminar este evento',
      });

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      message: 'Evento eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Hubo un error en la petición',
      error,
    });
  }
};

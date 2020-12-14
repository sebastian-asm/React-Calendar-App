import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { messages } from '../helpers/calendar-messages-es';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive } from '../../actions/events';
import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import AddNewEvent from '../ui/AddNewEvent';
import DeleteEvent from '../ui/DeleteEvent';

moment.locale('es'); // moment en español
const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  // Recuperando la última vista visitada, si no existe muestra el mes por defecto
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  // Abrir el modal con doble click
  const onDoubleClickEvent = () => dispatch(uiOpenModal());

  // Activar el evento del calendario
  const onSelectEvent = (event) => dispatch(eventSetActive(event));

  // Guardar en localStorage la última vista del calendario visitada
  const onView = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: 0,
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };

    return {
      style,
    };
  };

  // Haciendo click fuera del evento seleccionado, se limpiará
  const onSelectSlot = () => dispatch(eventClearActive());

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onView}
        view={lastView}
      />

      <AddNewEvent />

      {/* Si existe un evento activo se muestra el botón de eliminar */}
      {activeEvent && <DeleteEvent />}

      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;

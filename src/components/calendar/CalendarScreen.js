import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { messages } from '../helpers/calendar-messages-es';
import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';

moment.locale('es'); // moment en español
const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Personal',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Mensaje de prueba',
    user: {
      _id: '1',
      name: 'Sebas',
    },
  },
];

const CalendarScreen = () => {
  // Recuperando la última vista visitada, si no existe muestra el mes por defecto
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const onDoubleClickEvent = (e) => {
    console.log(e);
  };

  const onSelectEvent = (e) => {
    console.log(e);
  };

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
        onView={onView}
        view={lastView}
      />

      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;

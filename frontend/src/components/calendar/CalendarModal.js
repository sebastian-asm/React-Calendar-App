import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import {
  eventClearActive,
  eventStartUpdate,
  startEventAddNew,
} from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const nowDate = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = nowDate.clone().add(1, 'hours');

// Se especifíca afuera del componente para que no se ejecute
// cada vez que el componente es nuevamente renderizado
const initEvent = {
  title: '',
  notes: '',
  start: nowDate.toDate(),
  end: endDate.toDate(),
};

const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(nowDate.toDate());
  const [dateEnd, setDateEnd] = useState(endDate.toDate());
  const [titleValid, setTitleValid] = useState(true);
  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  // Efecto pendiente de los cambios del formulario
  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  // Cerrar el modal haciendo click fuera de él
  const closeModal = () => {
    dispatch(uiCloseModal());
    setFormValues(initEvent); // Se realiza limpieza del evento activo
    dispatch(eventClearActive());
  };

  const startDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const endDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones del formulario
    const mStart = moment(start);
    const mEnd = moment(end);

    if (mStart.isSameOrAfter(mEnd))
      return Swal.fire({
        title: 'Error',
        text: 'La fecha de termino debe ser mayor.',
        icon: 'error',
      });

    if (title.trim().length < 2) return setTitleValid(false);

    console.log(formValues);

    // Si existe el activeEvent se está actualizando
    // de los contrario se creará un nuevo evento
    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(startEventAddNew(formValues));
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      closeTimeoutMS={200}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>{!activeEvent ? 'Nuevo evento' : 'Editar evento'}</h1>
      <hr />
      <form onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <label>Fecha y hora de inicio</label>
          <DateTimePicker
            onChange={startDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora de termino</label>
          <DateTimePicker
            onChange={endDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Título y notas</label>
          <input
            value={title}
            onChange={handleInputChange}
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            values={notes}
            onChange={handleInputChange}
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="3"
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-info btn-block">
          <i className="fas fa-save mr-2"></i>
          <span>Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;

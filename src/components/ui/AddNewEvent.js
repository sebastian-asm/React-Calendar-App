import { useDispatch } from 'react-redux';
import { eventClearActive } from '../../actions/events';

import { uiOpenModal } from '../../actions/ui';

const AddNewEvent = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
    dispatch(eventClearActive()); // Limpiar el modal con datos previos
  };

  return (
    <button onClick={handleOpenModal} className="btn btn-success fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};

export default AddNewEvent;

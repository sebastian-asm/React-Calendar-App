import { useDispatch } from 'react-redux';

import { eventDeleted } from '../../actions/events';

const DeleteEvent = () => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(eventDeleted());

  return (
    <button onClick={handleDelete} className="btn btn-danger fab-trash">
      <i className="fas fa-trash"></i>
    </button>
  );
};

export default DeleteEvent;

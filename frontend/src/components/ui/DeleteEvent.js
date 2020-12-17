import { useDispatch } from 'react-redux';

import { eventStartDelete } from '../../actions/events';

const DeleteEvent = () => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(eventStartDelete());

  return (
    <button onClick={handleDelete} className="btn btn-danger fab-trash">
      <i className="fas fa-trash"></i>
    </button>
  );
};

export default DeleteEvent;

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Calendar</span>
      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt mr-2"></i>
        Salir
      </button>
    </div>
  );
};

export default Navbar;

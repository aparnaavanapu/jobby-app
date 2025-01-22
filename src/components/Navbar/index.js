import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Navbar = () => {
  const navigate = useNavigate();

  const logoutApp = () => {
    // Remove the JWT token cookie
    Cookies.remove('jwt_token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav className="nav-container">
      <ul className="list-container">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </li>
        <div className="home-jobs-container">
          <li>
            <Link to="/" className="home-job-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="home-job-link">
              Jobs
            </Link>
          </li>
        </div>
        <li>
          <button className="nav-logout-btn" onClick={logoutApp}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

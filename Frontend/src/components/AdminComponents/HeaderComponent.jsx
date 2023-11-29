// HeaderComponent.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faSignInAlt, faUserPlus, faInfoCircle, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
const HeaderComponent = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    toast.success("Admin Signed Out Successfully");
    logout();
    //  navigate("/login")
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="container">
        <Link className="navbar-brand" to="/admin-home">
          <FontAwesomeIcon icon={faList} /> Travel Plans
        </Link>
        <div className="collapse navbar-collapse text-light" id="navbarNav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link" to="/admin-home">
                <FontAwesomeIcon icon={faList} /> All Plans
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-plan/-1">
                <FontAwesomeIcon icon={faPlus} /> Create Plan
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope} /> Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <ul className="navbar-nav">
            {isAuthenticated() && role === 'ROLE_ADMIN' && (
              <>
                {/* Admin-specific links */}
                <li className="nav-item">
                  {/* <button className="nav-link btn btn-link" onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button> */}
                  <Link className="nav-link" to="/login" onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Logout
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && role !== 'ROLE_ADMIN' && (
              <>
                {/* User-specific links */}
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <FontAwesomeIcon icon={faUserPlus} /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;

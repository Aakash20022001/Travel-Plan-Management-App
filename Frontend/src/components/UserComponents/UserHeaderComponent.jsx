import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserHeaderComponent = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    toast.success('User Sign Out Successfully');
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/user-home">
        Travel App
      </Link>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/user-home">
              View All Travel Plans
            </Link>
          </li>
          {isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/registered-plans">
                  View Registered Plans
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user-profile">
                  View Profile
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogOut}>
                  Logout
                </button>
              </li>
            </>
          )}
          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default UserHeaderComponent;

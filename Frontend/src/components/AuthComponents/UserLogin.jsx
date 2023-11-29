import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthService from '../../services/AuthService';
import '../../styles/UserLogin.css';
import { toast } from 'react-hot-toast';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function loginUser(event) {
    event.preventDefault();

    let userRequest = {
      email: email,
      password: password,
    };

    try {
      const res = await AuthService.authenticateUser(userRequest);

      if (res.data.message === 'Email not exists') {
        toast.error('Email not exists');
      } else if (res.data.message === 'Login Success') {
        toast.success('Login success');
        login(res.data.user.user_id, res.data.token, res.data.user.role);
        if (res.data.user.role === 'ROLE_ADMIN') {
          navigate('/admin-home');
        } else if (res.data.user.role === 'ROLE_USER') {
          navigate('/user-home');
        } else {
          // Handle other roles as needed
          toast.error('Unsupported role');
        }
      } else {
        toast.error('Incorrect Email and Password not match');
      }
    } catch (err) {
      toast.error('Error logging in');
      console.error(err);
    }
  }

  return (
    <div className="login-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <form className="login-form">
              <h2>Login</h2>
              <hr />

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={loginUser}
              >
                Login
              </button>

              <div className="row mt-3">
                <div className="col-sm-6">
                  <span>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary">
                      Register here
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import '../../styles/UserRegistration.css'; 
import toast from 'react-hot-toast';

const UserRegistrationComponent = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [contactNumber, setContactNo] = useState('');
  const [gender, setGender] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); 
  const [emailFormatValid, setEmailFormatValid] = useState(true); 
  const navigate = useNavigate();

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(password === event.target.value);
  };

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);
    const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailFormatValid(emailFormatRegex.test(enteredEmail));
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleContactNoChange = (event) => {
    setContactNo(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const validateForm = () => {
    // Add your form validation logic here
    // For example, check if required fields are filled, validate email, etc.
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !city ||
      !contactNumber ||
      !gender ||
      !passwordMatch ||
      !emailFormatValid
    ) {
      return false;
    }

    // Check if passwords match and email format is valid
    return password === confirmPassword && emailFormatValid;
  };

  const registerUser = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    let UserData = {
      fullName: fullName,
      email: email,
      city: city,
      contactNumber: contactNumber,
      password: password,
      gender: gender,
    };

    AuthService.createUser(UserData).then((res) => {
      toast.success('Registration successful');
      navigate('/login');
    })
    .catch((error) => {
        console.error('Error registering user:', error);
        toast.error('Error in registration. Please try again.');
    });
  };

  const cancel = (event) => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h3>User Registration</h3>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Enter Full Name"
                  value={fullName}
                  onChange={handleFullNameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email ID:</label>
                <input
                  type="email"
                  className={`form-control ${emailFormatValid ? '' : 'is-invalid'}`}
                  id="email"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {!emailFormatValid && (
                  <div className="invalid-feedback">Please enter a valid email address</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className={`form-control ${passwordMatch ? '' : 'is-invalid'}`}
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {!passwordMatch && (
                  <div className="invalid-feedback">Passwords do not match</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  className={`form-control ${passwordMatch ? '' : 'is-invalid'}`}
                  id="confirmPassword"
                  placeholder="Enter Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {!passwordMatch && (
                  <div className="invalid-feedback">Passwords do not match</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Enter Current City"
                  value={city}
                  onChange={handleCityChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact_no">Contact Number:</label>
                <input
                  type="number"
                  className="form-control"
                  id="contact_no"
                  placeholder="Enter Contact Number"
                  value={contactNumber}
                  onChange={handleContactNoChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  className="form-control"
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button className="btn btn-success" onClick={registerUser}>
                Register
              </button>
              <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationComponent;

// UserProfileComponent.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserService from '../../services/UserService';

const UserProfileComponent = () => {
  const { userId } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (userId) {
      UserService.getUserDetails(userId)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [userId]);

  return (
    <div>
      <h2 className="text-center">User Profile</h2>
      {userDetails && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{userDetails.full_name}</h5>
            <p className="card-text"><strong>Email:</strong> {userDetails.email}</p>
            <p className="card-text"><strong>Contact Number:</strong> {userDetails.contact_number}</p>
            <p className="card-text"><strong>City:</strong> {userDetails.city}</p>
            <p className="card-text"><strong>Gender:</strong> {userDetails.gender}</p>
            {/* Add more user details as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileComponent;

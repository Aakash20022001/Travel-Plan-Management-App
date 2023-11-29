import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminService from '../../services/AdminService';

const ViewUsersComponent = () => {
  const { id } = useParams();
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const fetchRegisteredUsers = () => {
      AdminService.getRegisteredUsers(id)
        .then((response) => {
          setRegisteredUsers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching registered users:', error);
        });
    };

    fetchRegisteredUsers();
  }, [id]);

  return (
    <div>
      <h2 className='text-center'>Registered Users</h2>
      {registeredUsers.length > 0 ? (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>City</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {registeredUsers.map((user) => (
              <tr key={user.user_id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.contactNumber}</td>
                <td>{user.city}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center'>No users have been registered yet.</p>
      )}
    </div>
  );
};

export default ViewUsersComponent;

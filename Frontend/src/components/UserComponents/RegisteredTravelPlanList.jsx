// RegisteredTravelPlanList.js
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function RegisteredTravelPlanList() {
  const [travelPlans, setTravelPlans] = useState([]);
  const { userId } = useAuth(); // Use userId from AuthContext

  const fetchTravelPlans = () => {
    UserService.getUserById(userId)
      .then((response) => {
        setTravelPlans(response.data.registeredTravelPlans);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  };

  const handleDeregister = (travelPlanId) => {
    // Display confirmation prompt
    const confirmDeregister = window.confirm('Are you sure you want to deregister from this travel plan?');
    
    // If user confirms, proceed with deregistration
    if (confirmDeregister) {
      UserService.deregisterUserFromTravelPlan(userId, travelPlanId)
        .then(() => {
          // Refresh travel plans after deregistration
          fetchTravelPlans();
        })
        .catch((error) => {
          console.error('Error deregistering user:', error);
        });
    }
  };

  useEffect(() => {
    // Fetch travel plans on component mount
    fetchTravelPlans();
  }, []);

  return (
    <div>
      <h2 className='text-center'>Registered Travel Plans</h2>
      {travelPlans.length === 0 ? (
        <p className='text-center'>You have not registered for any plan yet. <Link to='/user-home'>Register for plans</Link>.</p>
      ) : (
        <div className='row'>
          {travelPlans.map((travelPlan) => (
            <div className='col-md-4 mt-3 mb-4' key={travelPlan.id}>
              <div className='card'>
                <img
                  src={travelPlan.imageUrl}
                  className='card-img-top'
                  alt='Travel Plan'
                />
                <div className='card-body'>
                  <h5 className='card-title'>
                    {travelPlan.origin}{' '}
                    <FontAwesomeIcon icon={faArrowRight} /> {travelPlan.destination}
                  </h5>
                  <p className='card-text'>{travelPlan.description}</p>
                  <p className='card-text'>
                    <strong>Start Date:</strong> {travelPlan.startDate}
                  </p>
                  <p className='card-text'>
                    <strong>End Date:</strong> {travelPlan.endDate}
                  </p>
                  <p className='card-text'>
                    <strong>Budget:</strong> {travelPlan.budget}
                  </p>
                  <div className='btn-group'>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDeregister(travelPlan.id)}
                    >
                      Deregister
                    </button>
                    <button
                      className='btn btn-info ml-3'
                      onClick={() => console.log('View clicked')}
                    >
                      <FontAwesomeIcon icon={faEye} /> View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

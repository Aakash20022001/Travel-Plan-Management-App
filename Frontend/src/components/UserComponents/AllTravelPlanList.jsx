import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

export default function AllTravelPlanList() {
  const [allTravelPlans, setAllTravelPlans] = useState([]);
  const [registeredTravelPlans, setRegisteredTravelPlans] = useState([]);
  const { userId, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchAllTravelPlans = () => {
    UserService.getAllTravelPlans()
      .then((response) => {
        const formattedData = response.data.map((travelPlan) => ({
          ...travelPlan,
          start_date: new Date(travelPlan.start_date).toLocaleDateString('en-GB'),
          end_date: new Date(travelPlan.end_date).toLocaleDateString('en-GB'),
        }));
  
        setAllTravelPlans(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching all travel plans:', error);
      });
  };

  const fetchRegisteredTravelPlans = () => {
    if (!userId) {
      return;
    }
    UserService.getUserById(userId)
      .then((response) => {
        setRegisteredTravelPlans(response.data.registeredTravelPlans);
      })
      .catch((error) => {
        console.error('Error fetching registered travel plans:', error);
      });
  };

  const handleRegister = (travelPlanId, isRegistered) => {
    if (isAuthenticated()) {
      const confirmRegister = window.confirm(
        `Are you sure you want to ${
          isRegistered ? 'deregister from' : 'register for'
        } this travel plan?`
      );
      if (!confirmRegister) {
        return;
      }
    } else {
      const confirmLoginOrRegister = window.confirm(
        'You are not logged in. Do you want to log in or register?'
      );
      if (confirmLoginOrRegister) {
        navigate('/login');
      } else {
        navigate('/register');
      }
      return;
    }

    const registerPromise = isRegistered
      ? UserService.deregisterUserFromTravelPlan(userId, travelPlanId)
      : UserService.registerUserToTravelPlan(userId, travelPlanId);

    registerPromise
      .then(() => {
        fetchAllTravelPlans();
        fetchRegisteredTravelPlans();
        toast.success(
          `Successfully ${
            isRegistered ? 'deregistered from' : 'registered for'
          } the travel plan.`
        );
      })
      .catch((error) => {
        console.error('Error registering/deregistering user:', error);
        toast.error('Error occurred. Please try again.');
      });
  };

  const isRegistered = (travelPlanId) => {
    return registeredTravelPlans.some((plan) => plan.id === travelPlanId);
  };

  const handleViewDetails = (travelPlanId) => {
    // Redirect to the view details page for the specific travel plan
    navigate(`/view-plan/${travelPlanId}`);
  };

  useEffect(() => {
    fetchAllTravelPlans();
    fetchRegisteredTravelPlans();
  }, [userId]);

  return (
    <div>
      <h2 className='text-center'>All Travel Plans</h2>
      <Toaster />
      <div className='row'>
        {allTravelPlans.map((travelPlan) => (
          <div className='col-md-4 mt-3' key={travelPlan.id}>
            <div className='card'>
              <img
                src={travelPlan.image_url}
                className='card-img-top'  width={348}
                height={232}
                alt='Travel Plan'
              />
              <div className='card-body'>
                <h5 className='card-title'>
                  {travelPlan.origin} <FontAwesomeIcon icon={faArrowRight} />{' '}
                  {travelPlan.destination}
                </h5>
                <p className='card-text'>{travelPlan.description}</p>
                <p className='card-text'>
                  <strong>Start Date:</strong> {travelPlan.start_date}
                </p>
                <p className='card-text'>
                  <strong>End Date:</strong> {travelPlan.end_date}
                </p>
                <p className='card-text'>
                  <strong>Budget:</strong> {travelPlan.budget}
                </p>
                <div className='btn-group mt-2'>
                  {isRegistered(travelPlan.id) ? (
                    <button
                      className='btn btn-danger'
                      onClick={() => handleRegister(travelPlan.id, true)}
                    >
                      Deregister
                    </button>
                  ) : (
                    <button
                      className='btn btn-success'
                      onClick={() => handleRegister(travelPlan.id, false)}
                    >
                      Register
                    </button>
                  )}
                  <button
                    className='btn btn-info ml-2'
                    onClick={() => handleViewDetails(travelPlan.id)}
                  >
                    <FontAwesomeIcon icon={faEye} /> View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
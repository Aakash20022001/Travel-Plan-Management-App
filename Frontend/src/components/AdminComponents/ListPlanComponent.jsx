import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminService from '../../services/AdminService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { toast, Toaster } from 'react-hot-toast';

export default function ListPlanComponent() {
  const [travelplans, setTravelPlans] = useState([]);
  const navigate = useNavigate();

  const addPlan = () => {
    navigate('/add-plan/-1');
  };

  const deletePlan = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this travel plan?');

    if (confirmDelete) {
      AdminService.deletePlan(id)
        .then((res) => {
          setTravelPlans((prevPlans) =>
            prevPlans.filter((travelPlan) => travelPlan.id !== id)
          );
          toast.success('Travel plan deleted successfully.');
        })
        .catch((error) => {
          console.error('Error deleting travel plan:', error);
          toast.error('Error deleting travel plan. Please try again.');
        });
    }
  };

  const editPlan = (id) => {
    navigate(`/add-plan/${id}`);
  };

  const viewPlan = (id) => {
    navigate(`/view-users/${id}`);
  };

  useEffect(() => {
    const fetchData = () => {
      AdminService.getAllPlans()
        .then((response) => {
          setTravelPlans(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='text-center'>Travel Plans</h2>
      <Toaster />
      <div className='row'>
        <button className='btn btn-primary' onClick={addPlan}>
          Add Plan
        </button>
      </div>
      <div className='row'>
        {travelplans.map((travelPlan) => (
          <div className='col-md-4 mt-3' key={travelPlan.id}>
            <div className='card'>
              <img
                src={travelPlan.imageUrl}
                className='card-img-top'  width={348}
                height={232}
                alt='Travel Plan'
              />
              <div className='card-body'>
                <h5 className='card-title'>
                  {travelPlan.origin} <FontAwesomeIcon icon={faArrowRight} /> {travelPlan.destination}
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
                    onClick={() => editPlan(travelPlan.id)}
                    className='btn btn-info'
                  >
                    <FontAwesomeIcon icon={faEdit} /> Update
                  </button>
                  <button
                    onClick={() => deletePlan(travelPlan.id)}
                    className='btn btn-danger'
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
                  <button
                    onClick={() => viewPlan(travelPlan.id)}
                    className='btn btn-info'
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

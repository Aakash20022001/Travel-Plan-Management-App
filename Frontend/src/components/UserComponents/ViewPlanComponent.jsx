import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminService from '../../services/AdminService';
import '../../styles/PlanDetails.css';

const ViewPlanComponent = () => {
  const { id } = useParams();
  const [travelPlan, setTravelPlan] = useState(null);

  useEffect(() => {
    const fetchTravelPlan = () => {
      AdminService.getPlanById(id)
        .then((response) => {
          setTravelPlan(response.data);
        })
        .catch((error) => {
          console.error('Error fetching travel plan:', error);
        });
    };

    fetchTravelPlan();
  }, [id]);

  if (!travelPlan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container travel-plan-details">
      <div className="col-md-12">
        <section className="panel travel-plan-panel">
          <div className="panel-body travel-plan-body">
            <div className="col-md-6">
              <div className="travel-plan-img-details">
                <img src={travelPlan.imageUrl} alt={travelPlan.origin} />
              </div>
            </div>
            <div className="col-md-6">
              <h4 className="travel-plan-d-title">
                {travelPlan.origin} to {travelPlan.destination}
              </h4>
              <p>{travelPlan.description}</p>
              <div className="travel-plan-meta">
                <span className="travel-plan-info">
                  <strong>Start Date:</strong> {travelPlan.startDate}
                </span>
                <span className="travel-plan-info">
                  <strong>End Date:</strong> {travelPlan.endDate}
                </span>
                {/* <span className="travel-plan-info">
                  <strong>Budget:</strong> ${travelPlan.budget}
                </span> */}
              </div>
              <div className="m-bot15">
                <strong>Estimated Cost: </strong> <span className="travel-plan-price">${travelPlan.budget}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewPlanComponent;

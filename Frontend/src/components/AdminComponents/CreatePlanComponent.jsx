import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminService from '../../services/AdminService';
import { toast, Toaster } from 'react-hot-toast';

const CreatePlanComponent = () => {
    //step 2
    const { id } = useParams();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [imageurl, setImageURL] = useState('');
    const navigate = useNavigate();
    const handleOriginChange = (event) => {
        setOrigin(event.target.value);
    };
    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleBudgetChange = (event) => {
        setBudget(event.target.value);
    };
    const handleImageUrlChange = (event) => {
        setImageURL(event.target.value);
    };
    //step 3
    useEffect(() => {
        // Fetch employee data when the component mounts
        //step 4
        if (!id||id === "-1") {
            return ;
        } 
        else {
            const fetchTravelPlanData = async () => {
                try {
                    const response = await AdminService.getPlanById(id);
                    const travelplan = response.data;

                    // Set the state with the fetched employee data
                    setOrigin(travelplan.origin);
                    setDestination(travelplan.destination);
                    setStartDate(travelplan.startDate);
                    setEndDate(travelplan.endDate);
                    setDescription(travelplan.description);
                    setBudget(travelplan.budget);
                    setImageURL(travelplan.imageUrl);

                } catch (error) {
                    console.error('Error fetching travel data:', error);
                }
            };

            fetchTravelPlanData();
        }
    }, [id]);

    const saveTravelPlan = async(event) => {
        event.preventDefault();
        let travelPlanData = {
            origin : origin,
            destination: destination,
            startDate:startdate,
            endDate: enddate,
            description:description,
            budget:budget,
            imageUrl:imageurl
        };
        try {
            if (!id || id === "-1") {
              await AdminService.createPlan(travelPlanData);
              navigate('/admin-home/');
              toast.success('Travel plan created successfully!');
            } else {
              await AdminService.updatePlan(travelPlanData, id);
              navigate("/admin-home/");
              toast.success('Travel plan updated successfully!');
            }
          } catch (error) {
            console.error('Error:', error);
            toast.error('Error saving travel plan. Please try again.');
          }

    };
    const cancel = (event) => {
        navigate('/admin-home');
    };
    const getTitle = (event) => {
        if (id === "-1") {
            return <h3 className="text-center">Add New Travel Plan</h3>
        }
        else {
            return <h3 className="text-center">Update Existing Travel Plan</h3>
        }
    };
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="Origin">Origin City:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="origin"
                                        placeholder="Enter origin City name"
                                        value={origin}
                                        onChange={handleOriginChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="destination">Destination City:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="destination"
                                        placeholder="Enter destination city name"
                                        value={destination}
                                        onChange={handleDestinationChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startdate">Start Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="startdate"
                                        placeholder="Enter Start Date"
                                        value={startdate}
                                        onChange={handleStartDateChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="enddate">End Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="enddate"
                                        placeholder="Enter End Date"
                                        value={enddate}
                                        onChange={handleEndDateChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        type="text"
                                        rows="3"
                                        className="form-control"
                                        id="description"
                                        placeholder="Enter Description"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="budget">Budget:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="budget"
                                        placeholder="Enter Budget"
                                        value={budget}
                                        onChange={handleBudgetChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="budget">Image URL:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageurl"
                                        placeholder="Enter Image URL"
                                        value={imageurl}
                                        onChange={handleImageUrlChange}
                                    />
                                    </div>
                                <button className='btn btn-success' onClick={saveTravelPlan}>Save</button>
                                <button className='btn btn-danger' onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default CreatePlanComponent;

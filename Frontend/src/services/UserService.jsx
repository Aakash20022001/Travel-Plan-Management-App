// UserService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8088/api/v1/users'; // Replace with your actual API base URL
// const {userid}
const UserService = {
  getAllTravelPlans: () => axios.get(`${BASE_URL}/travelplans`),
  registerUserToTravelPlan: (userId, travelPlanId) =>
    axios.post(`${BASE_URL}/${userId}/register/${travelPlanId}`),
  deregisterUserFromTravelPlan: (userId, travelPlanId) =>
    axios.post(`${BASE_URL}/${userId}/deregister/${travelPlanId}`),
  getUserById: (userId) => axios.get(`${BASE_URL}/${userId}`),
};

export default UserService;

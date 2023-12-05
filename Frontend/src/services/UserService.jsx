// UserService.js
import axios from 'axios';

const BASE_URL_NODE = 'http://54.82.26.152:3300/api/v1/users';
const BASE_URL_SPRINGBOOT = 'http://54.82.26.152:8088/api/v1/users' // Replace with your actual API base URL
// const {userid}
const UserService = {
  getAllTravelPlans: () => axios.get(`${BASE_URL_NODE}/travelplans`),
  getUserDetails: (userId) => axios.get(`${BASE_URL_NODE}/user/${userId}`),
  registerUserToTravelPlan: (userId, travelPlanId) =>
    axios.post(`${BASE_URL_SPRINGBOOT}/${userId}/register/${travelPlanId}`),
  deregisterUserFromTravelPlan: (userId, travelPlanId) =>
    axios.post(`${BASE_URL_SPRINGBOOT}/${userId}/deregister/${travelPlanId}`),
  getUserById: (userId) => axios.get(`${BASE_URL_SPRINGBOOT}/${userId}`),
};

export default UserService;

import axios from 'axios';

const TravelPlan_API_BASE_URL="http://54.82.26.152:8088/api/v1/travelplans";

class AdminService{

    getAllPlans(){
        return axios.get(TravelPlan_API_BASE_URL);
    }
    createPlan(travelPlan){
        return axios.post(TravelPlan_API_BASE_URL,travelPlan)
    }
    getPlanById(travelPlanId){
         return axios.get(TravelPlan_API_BASE_URL+'/'+travelPlanId)
    }
    updatePlan(travelPlan,travelPlanId){
        return axios.put(TravelPlan_API_BASE_URL+'/'+travelPlanId,travelPlan)
    }
    deletePlan(travelPlanId){
        return axios.delete(TravelPlan_API_BASE_URL+'/'+travelPlanId)
    }
    getRegisteredUsers(travelPlanId) {
        return axios.get(TravelPlan_API_BASE_URL+'/'+travelPlanId+'/users');
      }
}
export default new AdminService()

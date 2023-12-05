import axios from 'axios';

const TravelPlanUser_API_BASE_URL="http://54.82.26.152:8088/api/v1/users";
class AuthService{
    getAllUser(){
        return axios.get(TravelPlanUser_API_BASE_URL);
    }
createUser(UserData){
    return axios.post(TravelPlanUser_API_BASE_URL+"/save", UserData)
}
authenticateUser(UserRequest){
    return axios.post(TravelPlanUser_API_BASE_URL+"/login", UserRequest)
}
}
export default new AuthService();
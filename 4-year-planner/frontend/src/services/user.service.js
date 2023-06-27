import axios from "axios";
import { getCurrentUser } from '../utils/currentUser';

function authHeader() {
    const token = localStorage.getItem("userToken");
    if (token) {
        return { 'x-access-token': token };
    } else {
        return {};
    }
}


let URL = process.env.REACT_APP_SERVER_URL + "/api/user/"

class UserService {

    static logoutAndRouteToStart = function() {console.log("Something has gone wrong this should now happen!!")};

    async getPlanner() {
        try{
            let res = await axios.get(URL + "getUserPlanner", { headers: authHeader() });
            return res;
        } catch (err) {
            if (err.response.status === 401) { // Token is expired, log out
                this.logoutAndRouteToStart();
            }
        }
        return null;
    }

    async setPlanner(planner) {
        try {
            let res = axios.post(URL + "setUserPlanner", { planner: planner }, { headers: authHeader() });
            return res;
        } catch (err) {
            if (err.response.status === 401) { // Token is expired, log out
                this.logoutAndRouteToStart();
            }
        }
        
        return null;
    }

}


export default new UserService();

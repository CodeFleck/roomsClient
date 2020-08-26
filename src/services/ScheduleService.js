import axios from "axios";
import authHeader from "./AuthHeader";
import { properties } from '../properties';

const API_URL = `http://${properties.SERVER_IP}:${properties.PORT}/api/schedule/`;

const ScheduleService = {
    generateSchedule: () => {
        return axios.get(API_URL, { headers: authHeader() })
        .catch((error) => {
            console.log(error);
        });
    }
};
export default ScheduleService;
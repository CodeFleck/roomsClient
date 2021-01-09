import axios from "axios";
import authHeader from "./AuthHeader";
import { properties } from '../properties';

const API_URL = `http://${properties.SERVER_IP}:${properties.PORT}/api/schedule/`;

const ScheduleService = {
    generateSchedule: dayName => {
        return axios.get(API_URL+ dayName, { headers: authHeader() })
        .catch((error) => {
            console.log(error);
        });
    },

    emailSchedule: async () => {
        try {
            return axios.post(API_URL + "email-schedule", null, { headers: authHeader() });
        } catch (error) {
            console.log(error);
        }
    }
};
export default ScheduleService;
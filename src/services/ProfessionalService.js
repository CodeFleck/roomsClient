import axios from "axios";
import authHeader from "./AuthHeader";
import { properties } from '../properties';

const API_URL = `http://${properties.SERVER_IP}:${properties.PORT}/api/professionals/`;

const ProfessionalService = {
  getAllProfessionals: () => {
    return axios.get(API_URL, { headers: authHeader() }).catch((error) => {
      console.log(error);
    });
  },

  createProfessional: professional => {
    return axios
      .post(API_URL, professional, { headers: authHeader() })
      .catch((error) => {
        console.log(error);
      });
  },

  deleteProfessional: id => {
    return axios
      .delete(API_URL + id, { headers: authHeader() })
      .catch((error) => {
        console.log(error);
      });
  },

  getProfessionalById : id => {
    return axios.get(API_URL + id, { headers: authHeader() })
    .catch(error => {
      console.log(error);
    });
  },

  updateProfessional : professional => {
    return axios
    .put(API_URL + professional.id, professional, { headers: authHeader() })
    .catch((error) => {
      console.log(error);
    })
  },

  updateAttribute : professional => {
    return axios
    .patch(API_URL + professional.id, professional, { headers: authHeader() })
    .catch((error) => {
      console.log(error);
    })
  }
};
export default ProfessionalService;

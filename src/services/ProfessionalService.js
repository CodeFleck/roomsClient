import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/professionals/";

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
};
export default ProfessionalService;

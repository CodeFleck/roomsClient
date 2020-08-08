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

  //   CriaAutor : autor => {
  //     return fetch('http://localhost:8000/api/autor', {method: 'POST', headers: {'content-type': 'application/json'}, body: autor})
  //     .then(res => ApiService.TrataErros(res))
  //     .then(res => res.json());
  // },
  // ListaNomes: () =>{
  //     return fetch('http://localhost:8000/api/autor/nome')
  //     .then(res => ApiService.TrataErros(res))
  //     .then(res => res.json());;
  // },
  // ListaLivros: () => {
  //     return fetch('http://localhost:8000/api/autor')
  //     .then(res => ApiService.TrataErros(res))
  //     .then(res => res.json());;
  // },
  // RemoveAutor: id => {
  //     return fetch(`http://localhost:8000/api/autor/${id}`, {method: 'DELETE', headers: { 'content-type' : 'application/json'},})
  //     .then(res => ApiService.TrataErros(res))
  //     .then(res => res.json());;
  // },
  // TrataErros : res =>{
  //     if(!res.ok){

  //         throw Error(res.responseText);
  //     }
  //     return res;
  // }
};
export default ProfessionalService;

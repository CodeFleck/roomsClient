import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/professionals/";

const ProfessionalService = {
  getAllProfessionals : () => {
    return axios.get(API_URL, { headers: authHeader() })
    .catch( error => {
      console.log(error);
    })
  } 



// const ProfessionalService = {
//   getAllProfessionals: () => {
//     return fetch(API_URL, { headers: authHeader() }).then((response) => {
//       response.json().then((data) => {
//         console.log(data);
//       });
//     });
//   },

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

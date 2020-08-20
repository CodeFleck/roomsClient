import axios from "axios";
import authHeader from "./AuthHeader";
import { properties } from '../properties';

const API_URL = `http://${properties.SERVER_IP}:${properties.PORT}/api/rooms/`;

const RoomService = {
  getAllRooms: () => {
    return axios.get(API_URL, { headers: authHeader() })
    .catch((error) => {
      console.log(error);
    });
  },

  createRoom: room => {
    return axios
      .post(API_URL, room, { headers: authHeader() })
      .catch((error) => {
        console.log(error);
      });
  },

  deleteRoom: id => {
    return axios
      .delete(API_URL + id, { headers: authHeader() })
      .catch((error) => {
        console.log(error);
      });
  },

  getRoomById : id => {
    return axios.get(API_URL + id, { headers: authHeader() })
    .catch(error => {
      console.log(error);
    });
  },

  updateRoom : room => {
    return axios
    .put(API_URL + room.id, room, { headers: authHeader() })
    .catch((error) => {
      console.log(error);
    })
  },

  updateAttribute : room => {
    return axios
    .patch(API_URL + room.id, room, { headers: authHeader() })
    .catch((error) => {
      console.log(error);
    })
  }
};
export default RoomService;

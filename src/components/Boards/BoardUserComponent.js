import React, { Component } from "react";
import UserService from "../../services/UserService";
import ScheduleService from "../../services/ScheduleService";
import ProfessionalService from "../../services/ProfessionalService";
import RoomService from "../../services/RoomService";
import "./BoardUserCss.css";
import ScheduleTable from "../DataTable/ScheduleTable";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      mondayRooms: [],
      tuesdayRooms: [],
      wednesdayRooms: [],
      thursdayRooms: [],
      fridayRooms: [],
      saturdayRooms: [],
      totalNumberOfProfessionals: "",
      totalNumberOfRooms: ""
    };
  }

  componentDidMount() {
    this.fetchNumberOfRoomsAndProfessionals();
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: Array.of(response.data),
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  generateSchedule = () => {
    this.fetchNumberOfRoomsAndProfessionals();
    let totalProfessionals = this.state.totalNumberOfProfessionals;
    let totalRooms = this.state.totalNumberOfRooms;

    if (totalRooms >= totalProfessionals) {
      ScheduleService.generateSchedule()
        .then((res) => {
          if (res.status === 200) {
            this.setState({ mondayRooms: [...res.data] });
            this.setState({ tuesdayRooms: [...res.data] });
            this.setState({ wednesdayRooms: [...res.data] });
            this.setState({ thursdayRooms: [...res.data] });
            this.setState({ fridayRooms: [...res.data] });
            this.setState({ saturdayRooms: [...res.data] });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("there are more professionals than rooms!");

    }
  };

  fetchNumberOfRoomsAndProfessionals = () => {
    ProfessionalService.getAllProfessionals()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ totalNumberOfProfessionals: res.data.length });
        }
      })
      .catch((err) => console.log(err));
    RoomService.getAllRooms()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ totalNumberOfRooms: res.data.length });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="clearfix scheduleTop">
          <div className="float-left">
            <h3>Agenda</h3>
          </div>
          <div className="float-right">
            <button
              type="button"
              onClick={this.generateSchedule}
              className="btn btn-primary"
            >
              Gerar escala
            </button>
          </div>
        </div>
        <ScheduleTable
          mondayRooms={this.state.mondayRooms}
          tuesdayRooms={this.state.tuesdayRooms}
          wednesdayRooms={this.state.wednesdayRooms}
          thursdayRooms={this.state.thursdayRooms}
          fridayRooms={this.state.fridayRooms}
          saturdayRooms={this.state.saturdayRooms}
        />
      </div>
    );
  }
}

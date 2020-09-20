import React, { Component } from "react";
import UserService from "../../services/UserService";
import ScheduleService from "../../services/ScheduleService";
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
    };
  }

  componentDidMount() {
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
    ScheduleService.generateSchedule()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ mondayRooms: [...res.data] });
        }
      })
      .catch((err) => console.log(err));
    ScheduleService.generateSchedule()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ tuesdayRooms: [...res.data] });
        }
      })
      .catch((err) => console.log(err));
    ScheduleService.generateSchedule()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ wednesdayRooms: [...res.data] });
        }
      })
      .catch((err) => console.log(err));
    ScheduleService.generateSchedule()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ thursdayRooms: [...res.data] });
        }
      })
      .catch((err) => console.log(err));
    ScheduleService.generateSchedule()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ fridayRooms: [...res.data] });
        }
      })
      .catch((err) => console.log(err));
    ScheduleService.generateSchedule()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ saturdayRooms: [...res.data] });
        }
      })
      .catch((err) => console.log(err));
  };

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
              class="btn btn-primary"
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

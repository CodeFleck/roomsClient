import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import UserService from "../../services/UserService";
import ScheduleService from "../../services/ScheduleService";
import "./BoardUserCss.css"
import ScheduleTable from "../DataTable/ScheduleTable";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
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

  generateSchedule() {
    ScheduleService.generateSchedule()
      .then((res) => {
        if (res.status === 200) {
          console.log(JSON.stringify(res.data));
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
          <Button
            onClick={this.generateSchedule}
            variant="contained"
            color="primary"
            disableElevation
          >
            Gerar escala
          </Button>
        </div>
      </div>
      <ScheduleTable />
      </div>
    );
  }
}

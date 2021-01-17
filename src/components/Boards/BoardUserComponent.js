import React, { Component } from "react";
import UserService from "../../services/UserService";
import ScheduleService from "../../services/ScheduleService";
import ProfessionalService from "../../services/ProfessionalService";
import RoomService from "../../services/RoomService";
import "./BoardUserCss.css";
import ScheduleTable from "../DataTable/ScheduleTable";
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton'
import { SnackbarContent } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

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
      totalNumberOfRooms: "",
      snackBarOpen: false,
      snackBarMessage: "Não há salas suficientes!",
      emailSnackBarOpen: false,
      emailSnackBarMessage: "Agenda enviada por email!"
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

  snackBarClose = (event) => {
    this.setState({snackBarOpen:false});
  }

  emailSnackBarClose = (event) => {
    this.setState({emailSnackBarOpen:false});
  }

  generateSchedule = () => {
    this.fetchNumberOfRoomsAndProfessionals();
    let totalProfessionals = this.state.totalNumberOfProfessionals;
    let totalRooms = this.state.totalNumberOfRooms;

    if (totalRooms >= totalProfessionals) {
      ScheduleService.generateSchedule("Segunda")
        .then((res) => {
          if (res.status === 200) {
            this.setState({ mondayRooms: [...res.data] });
          }
        })
        .catch((err) => console.log(err));

      ScheduleService.generateSchedule("Terça")
        .then((res) => {
          if (res.status === 200) {
            this.setState({ tuesdayRooms: [...res.data] });
          }
        })
        .catch((err) => console.log(err));

      ScheduleService.generateSchedule("Quarta")
        .then((res) => {
          if (res.status === 200) {
            this.setState({ wednesdayRooms: [...res.data] });
          }
        })
        .catch((err) => console.log(err));

      ScheduleService.generateSchedule("Quinta")
        .then((res) => {
          if (res.status === 200) {
            this.setState({ thursdayRooms: [...res.data] });
          }
        })
        .catch((err) => console.log(err));
        
      ScheduleService.generateSchedule("Sexta")
        .then((res) => {
          if (res.status === 200) {
            this.setState({ fridayRooms: [...res.data] });
          }
        })
        .catch((err) => console.log(err)); 
        
      ScheduleService.generateSchedule("Sábado")
        .then((res) => {
          if (res.status === 200) {
            this.setState({ saturdayRooms: [...res.data] });
          }
        })
        .catch((err) => console.log(err));  

    } else {
      this.setState({snackBarOpen:true})
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

  exportSchedule = () => {
    ScheduleService.emailSchedule();
    this.setState({emailSnackBarOpen:true})
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
            <button
              type="button"
              onClick={this.exportSchedule}
              className="btn btn-primary emailBtn"
            >
              <EmailIcon />
            </button>
            <SnackBar
              anchorOrigin={{vertical:'top', horizontal:'center'}}
              open={this.state.snackBarOpen}
              autoHideDuration= {3000}
              onClose={this.snackBarClose}
              action={[<IconButton 
                key="close"
                arial-label="Close"
                color="inherit"
                onClick={this.snackBarClose}>x</IconButton>]}
                >
                <SnackbarContent style={{backgroundColor:'#f44336'}} message={<span id="client-snackbar">{this.state.snackBarMessage}</span>} />
                </SnackBar>
                <SnackBar
              anchorOrigin={{vertical:'top', horizontal:'center'}}
              open={this.state.emailSnackBarOpen}
              autoHideDuration= {3000}
              onClose={this.emailSnackBarClose}
              action={[<IconButton 
                key="close"
                arial-label="Close"
                color="inherit"
                onClick={this.emailSnackBarClose}>x</IconButton>]}
                >
                <SnackbarContent style={{backgroundColor:'#4caf50'}} message={<span id="client-email-snackbar">{this.state.emailSnackBarMessage}</span>} />
                </SnackBar>
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

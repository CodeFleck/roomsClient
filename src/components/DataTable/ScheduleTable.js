import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./ScheduleTable.css";

class ScheduleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnList: [],
      rooms: [],
    };
  }

  useStyles = () =>
    makeStyles({
      table: {
        minWidth: 650,
      },
    });

  render() {
    const classes = this.useStyles();
    const monday = [...this.props.mondayRooms];
    const tuesday = [...this.props.tuesdayRooms];
    const wednesday = [...this.props.wednesdayRooms];
    const thursday = [...this.props.thursdayRooms];
    const friday = [...this.props.fridayRooms];
    const saturday = [...this.props.saturdayRooms];
    console.log(JSON.stringify(monday));
    return (
      <div className="container-fluid">
        <div className="row labelSpecialRoom">
          <div className="bg-info labelBox"></div>
          <p>Sala especial</p>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Segunda</TableCell>
                <TableCell align="center">Terça</TableCell>
                <TableCell align="center">Quarta</TableCell>
                <TableCell align="center">Quinta</TableCell>
                <TableCell align="center">Sexta</TableCell>
                <TableCell align="center">Sábado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="scheduleRow">
                <TableCell>
                  {monday.map((room) =>
                    room.specialtyRoom ? (
                      <div
                        className="bg-info"
                        key={room.id}
                        align="center"
                        component="th"
                      >
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    ) : (
                      <div key={room.id} align="center" component="th">
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    )
                  )}
                </TableCell>
                <TableCell>
                  {tuesday.map((room) =>
                    room.specialtyRoom ? (
                      <div
                        className="bg-info"
                        key={room.id}
                        align="center"
                        component="th"
                      >
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    ) : (
                      <div key={room.id} align="center" component="th">
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    )
                  )}
                </TableCell>
                <TableCell>
                  {wednesday.map((room) =>
                    room.specialtyRoom ? (
                      <div
                        className="bg-info"
                        key={room.id}
                        align="center"
                        component="th"
                      >
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    ) : (
                      <div key={room.id} align="center" component="th">
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    )
                  )}
                </TableCell>
                <TableCell>
                  {thursday.map((room) =>
                    room.specialtyRoom ? (
                      <div
                        className="bg-info"
                        key={room.id}
                        align="center"
                        component="th"
                      >
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    ) : (
                      <div key={room.id} align="center" component="th">
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    )
                  )}
                </TableCell>
                <TableCell>
                  {friday.map((room) =>
                    room.specialtyRoom ? (
                      <div
                        className="bg-info"
                        key={room.id}
                        align="center"
                        component="th"
                      >
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    ) : (
                      <div key={room.id} align="center" component="th">
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    )
                  )}
                </TableCell>
                <TableCell>
                  {saturday.map((room) =>
                    room.specialtyRoom ? (
                      <div
                        className="bg-info"
                        key={room.id}
                        align="center"
                        component="th"
                      >
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    ) : (
                      <div key={room.id} align="center" component="th">
                        {room.roomName} - {room.professional.name.toString()}
                      </div>
                    )
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default ScheduleTable;

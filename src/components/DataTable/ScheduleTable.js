import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class ScheduleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnList: [],
      rooms: [],
    };
  }

  useStyles = () => makeStyles({
    table: {
      minWidth: 650,
    },
  });

  render() {
    const classes = this.useStyles();
    const schedule = [...this.props.rooms];

    return (
      <div className="container-fluid">
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
          {schedule.map((room) => (
            <TableRow key={room.id}>
              <TableCell align="center" component="th" scope="row">
                {room.roomName} - {room.professional.name.toString()}
              </TableCell>
              <TableCell align="center">{room.roomName} - {room.professional.name.toString()}</TableCell>
              <TableCell align="center">{room.roomName} - {room.professional.name.toString()}</TableCell>
              <TableCell align="center">{room.roomName} - {room.professional.name.toString()}</TableCell>
              <TableCell align="center">{room.roomName} - {room.professional.name.toString()}</TableCell>
              <TableCell align="center">{room.roomName} - {room.professional.name.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    );
  }
}
export default ScheduleTable;

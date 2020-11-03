import React, { Component } from "react";
import RoomService from "../../services/RoomService";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import AddIcon from "@material-ui/icons/Add";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class RoomTable extends Component {
  constructor(props) {
    super(props);

    const MOCK_DATE = "2015-03-25T03:00:00Z";

    this.state = {
      rooms: [],
      model: {
        id: "",
        roomName: "",
        unit: "",
        openat: new Date(MOCK_DATE).toString(),
        closeat: new Date(MOCK_DATE).toString(),
        specialtyRoom: false,
      },
      editRoom: {},
      editing: false,
      editModeSwitch: false
    };
  }

  seEditModeOn(id) {
    this.setState({ editing: true });
    RoomService.getRoomById(id)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ editRoom: res.data });
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    RoomService.getAllRooms()
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            rooms: [...this.state.rooms, ...res.data],
          });
        }
      })
      .catch((err) => console.log(err));
  }

  handleRequireSpecialRoom = () => {
    const { model } = this.state;
    model.specialtyRoom = Boolean(!model.specialtyRoom);
    this.setState({ model });
  };

  handleRequireSpecialRoomForInsideEditMode = () => {
    const { editRoom } = this.state;
    editRoom.specialtyRoom = Boolean(
      !this.state.editModeSwitch
    );
    console.log(editRoom.specialtyRoom);
    this.setState({ editRoom });
    this.setState({ editModeSwitch: Boolean(!this.state.editModeSwitch) });
  };

  handleRequireSpecialRoomEdit = (id, specialtyRoom) => {
    const { editRoom } = this.state;
    editRoom.specialtyRoom = Boolean(!specialtyRoom);
    editRoom.id = id;
    this.setState({ editRoom });
    RoomService.updateAttribute(editRoom)
      .then((res) => {
        if (res.status === 200) {
          let copyOfRooms = [...this.state.rooms];
          let index = copyOfRooms.findIndex(
            (x) => x.id === editRoom.id
          );
          let room = copyOfRooms.find(
            (x) => x.id === editRoom.id
          );
          room.specialtyRoom =
            editRoom.specialtyRoom;
          copyOfRooms.splice(index, 1, room);
          this.setState({
            rooms: [...copyOfRooms],
          });
        }
      })
      .catch((err) => console.log(err));
      const MOCK_DATE = "2015-03-25T03:00:00Z";
      let empty = {
        id: "",
        roomName: "",
        unit: '',
        openat: new Date(MOCK_DATE).toString(),
        closeat: new Date(MOCK_DATE).toString(),
        specialtyRoom: false,
      };
      this.setState({ editRoom: empty });
  };

  setNewInputValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
  };

  setTimeValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.toString();
    this.setState({ model });
  };

  editTimeValues = (e, id, field) => {
    const { editRoom } = this.state;
    editRoom[field] = e.toString();
    this.setState({ editRoom });
  };

  save = () => {
    if (!this.state.editing) {
      let data = {
        roomName: this.state.model.roomName,
        unit: this.state.model.unit,
        openat: this.state.model.openat,
        closeat: this.state.model.closeat,
        specialtyRoom: this.state.model.specialtyRoom,
      };

      RoomService.createRoom(data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              rooms: [...this.state.rooms, res.data],
            });
          }
        })
        .catch((err) => console.log(err));
      const MOCK_DATE = "2015-03-25T03:00:00Z";
      let empty = {
        id: "",
        roomName: "",
        unit: "",
        openat: new Date(MOCK_DATE).toString(),
        closeat: new Date(MOCK_DATE).toString(),
        specialtyRoom: false,
      };
      this.setState({ model: empty });
    } else {
      this.update();
    }
    this.setState({ editing: false });
  };

  update() {
    let data = {
      id: this.state.editRoom.id,
      roomName: this.state.editRoom.roomName, 
      unit: this.state.editRoom.unit,
      openat: this.state.editRoom.openat,
      closeat: this.state.editRoom.closeat,
      specialtyRoom: this.state.editRoom.specialtyRoom,
    };

    RoomService.updateRoom(data)
      .then((res) => {
        if (res.status === 200) {
          let copyOfRooms = [...this.state.rooms];
          let index = copyOfRooms.findIndex(
            (x) => x.id === res.data.id
          );
          copyOfRooms.splice(index, 1, res.data);
          this.setState({
            rooms: [...copyOfRooms],
          });
        }
      })
      .catch((err) => console.log(err));
    const MOCK_DATE = "2015-03-25T00:00:00Z";
    let empty = {
      id: "",
      roomName: "",
      unit: "",
      openat: new Date(MOCK_DATE).toString(),
      closeat: new Date(MOCK_DATE).toString(),
      specialtyRoom: false,
    };
    this.setState({ editRoom: empty });
  }

  delete = (id) => {
    RoomService.deleteRoom(id).catch((err) => console.log(err));
    var array = [...this.state.rooms];
    var index = array.indexOf(array.find((p) => p.id === id));
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ rooms: array });
    }
  };

  edit = (e, id, type) => {
    const { editRoom } = this.state;
    editRoom[id] = id;
    editRoom[type] = e.target.value;
    this.setState({ editRoom });
  };

  getTime(time) {
    if (time.toString().length > 5) {
      return time;
    } else {
      var d = new Date();
      d.setHours(time.substring(0, 2), time.substring(4, 5), 0);
      return d;
    }
  }

  render() {
    return (
      <Paper>
        <div className="addInfo">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TextField
              autoFocus={true}
              variant="standard"
              className="TextField"
              label="Sala"
              value={this.state.model.roomName}
              onChange={(e) => this.setNewInputValues(e, "roomName")}
            />
            <TextField
              variant="standard"
              className="TextField"
              label="Unidade"
              value={this.state.model.unit}
              onChange={(e) => this.setNewInputValues(e, "unit")}
            />
            <TimePicker
              label="Abre"
              value={this.state.model.openat}
              minutesStep={5}
              onChange={(e) => this.setTimeValues(e, "openat")}
            />
            <TimePicker
              label="Fecha"
              value={this.state.model.closeat}
              minutesStep={5}
              onChange={(e) => this.setTimeValues(e, "closeat")}
            />
            <Switch
              checked={this.state.model.specialtyRoom}
              onChange={(e) => this.handleRequireSpecialRoom()}
              color="primary"
              name="specialtyRoom"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <Button
              variant="text"
              color="primary"
              className="Button"
              onClick={this.save}
            >
              <SaveIcon />
            </Button>
          </MuiPickersUtilsProvider>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sala</TableCell>
              <TableCell>Unidade</TableCell>
              <TableCell>Abre</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Sala Especialidade</TableCell>
              <TableCell>Editar | Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rooms.map((item) => {
              let itemBlock = null;
              if (
                this.state.editing &&
                item.id === this.state.editRoom.id
              ) {
                itemBlock = (
                  <TableRow key={this.state.editRoom.id}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <TextField
                          label="Name"
                          value={this.state.editRoom.roomName}
                          onChange={(e) => this.edit(e, item.id, "roomName")}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Unit"
                          value={this.state.editRoom.unit}
                          onChange={(e) => this.edit(e, item.id, "unit")}
                        />
                      </TableCell>
                      <TableCell>
                        <TimePicker
                          label="Início"
                          value={this.getTime(
                            this.state.editRoom.openat
                          )}
                          minutesStep={5}
                          onChange={(e) =>
                            this.editTimeValues(e, item.id, "openat")
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TimePicker
                          label="Término"
                          value={this.getTime(
                            this.state.editRoom.closeat
                          )}
                          minutesStep={5}
                          onChange={(e) =>
                            this.editTimeValues(e, item.id, "closeat")
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={this.state.editModeSwitch}
                          onChange={(e) =>
                            this.handleRequireSpecialRoomForInsideEditMode()
                          }
                          color="primary"
                          name="specialtyRoom"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          color="primary"
                          onClick={this.save}
                        >
                          <SaveIcon />
                        </Button>
                      </TableCell>
                    </MuiPickersUtilsProvider>
                  </TableRow>
                );
              } else {
                itemBlock = (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.roomName}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.openat}</TableCell>
                    <TableCell>{item.closeat}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.specialtyRoom}
                        onChange={() =>
                          this.handleRequireSpecialRoomEdit(
                            item.id,
                            item.specialtyRoom
                          )
                        }
                        color="primary"
                        name="specialtyRoom"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => this.seEditModeOn(item.id)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => {
                          this.delete(item.id);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
              return itemBlock;
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default RoomTable;

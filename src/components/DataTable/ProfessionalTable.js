import React, { Component } from "react";
import ProfessionalService from "../../services/ProfessionalService";
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

class ProfessionalTable extends Component {
  constructor(props) {
    super(props);

    const MOCK_DATE = "2015-03-25T03:00:00Z";

    this.state = {
      professionals: [],
      model: {
        id: "",
        name: "",
        beginat: new Date(MOCK_DATE).toString(),
        endat: new Date(MOCK_DATE).toString(),
        requiresSpecialtyRoom: false,
      },
      editProfessional: {},
      editing: false,
    };
  }

  seEditModeOn(id) {
    this.setState({ editing: true });
    ProfessionalService.getProfessionalById(id)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ editProfessional: res.data });
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    ProfessionalService.getAllProfessionals()
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            professionals: [...this.state.professionals, ...res.data],
          });
        }
      })
      .catch((err) => console.log(err));
  }

  handleRequireSpecialRoom = () => {
    const { model } = this.state;
    model.requiresSpecialtyRoom = Boolean(!model.requiresSpecialtyRoom);
    this.setState({ model });
  };

  handleRequireSpecialRoomEdit = () => {
    const { editProfessional } = this.state;
    editProfessional.requiresSpecialtyRoom = Boolean(
      !editProfessional.requiresSpecialtyRoom
    );
    this.setState({ editProfessional });
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
    const { editProfessional } = this.state;
    editProfessional[field] = e.toString();
    this.setState({ editProfessional });
  };

  save = () => {
    if (!this.state.editing) {
      var data = {
        name: this.state.model.name,
        beginat: this.state.model.beginat,
        endat: this.state.model.endat,
        requiresSpecialtyRoom: this.state.model.requiresSpecialtyRoom,
      };

      ProfessionalService.createProfessional(data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              professionals: [...this.state.professionals, res.data],
            });
          }
        })
        .catch((err) => console.log(err));
      const MOCK_DATE = "2015-03-25T03:00:00Z";
      let empty = {
        id: "",
        name: "",
        beginat: new Date(MOCK_DATE).toString(),
        endat: new Date(MOCK_DATE).toString(),
        requiresSpecialtyRoom: false,
      };
      this.setState({ model: empty });
    } else {
      var data = {
        id: this.state.editProfessional.id,
        name: this.state.editProfessional.name,
        beginat: this.state.editProfessional.beginat,
        endat: this.state.editProfessional.endat,
        requiresSpecialtyRoom: this.state.editProfessional
          .requiresSpecialtyRoom,
      };

      ProfessionalService.updateProfessional(data)
        .then((res) => {
          if (res.status === 200) {
            let copyOfProfessionals = [...this.state.professionals];
            let index = copyOfProfessionals.findIndex(x => x.id === res.data.id);
            copyOfProfessionals.splice(index, 1, res.data);
            this.setState({
              professionals: [...copyOfProfessionals],
            });
          }
        })
        .catch((err) => console.log(err));
      const MOCK_DATE = "2015-03-25T00:00:00Z";
      let empty = {
        id: "",
        name: "",
        beginat: new Date(MOCK_DATE).toString(),
        endat: new Date(MOCK_DATE).toString(),
        requiresSpecialtyRoom: false,
      };
      this.setState({ editProfessional: empty });
    }
    this.setState({ editing: false });
  };

  delete = (id) => {
    ProfessionalService.deleteProfessional(id).catch((err) => console.log(err));
    var array = [...this.state.professionals];
    var index = array.indexOf(array.find((p) => p.id === id));
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ professionals: array });
    }
  };

  edit = (e, id, type) => {
    const { editProfessional } = this.state;
    editProfessional[id] = id;
    editProfessional[type] = e.target.value;
    this.setState({ editProfessional });
  };

  getTime(time) {
    if(time.toString().length > 5) { 
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
              label="Nome"
              value={this.state.model.name}
              onChange={(e) => this.setNewInputValues(e, "name")}
            />
            <TimePicker
              label="Início"
              value={this.state.model.beginat}
              minutesStep={5}
              onChange={(e) => this.setTimeValues(e, "beginat")}
            />
            <TimePicker
              label="Término"
              value={this.state.model.endat}
              minutesStep={5}
              onChange={(e) => this.setTimeValues(e, "endat")}
            />
            <Switch
              checked={this.state.model.requiresSpecialtyRoom}
              onChange={(e) => this.handleRequireSpecialRoom()}
              color="primary"
              name="requiresSpecialtyRoom"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <Button
              variant="text"
              color="primary"
              className="Button"
              onClick={this.save}
            >
              <AddIcon />
            </Button>
          </MuiPickersUtilsProvider>
        </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Início</TableCell>
                <TableCell>Término</TableCell>
                <TableCell>Sala Especial</TableCell>
                <TableCell>Editar | Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.professionals.map((item) => {
                let itemBlock = null;
                if (
                  this.state.editing &&
                  item.id === this.state.editProfessional.id
                ) {
                  itemBlock = (
                    <TableRow key={this.state.editProfessional.id}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>
                          <TextField
                            label="Name"
                            value={this.state.editProfessional.name}
                            onChange={(e) => this.edit(e, item.id, "name")}
                          />
                        </TableCell>
                        <TableCell>
                          <TimePicker
                            label="Início"
                            value={this.getTime(this.state.editProfessional.beginat)}
                            minutesStep={5}
                            onChange={(e) => this.editTimeValues(e, item.id, "beginat")}
                          />
                        </TableCell>
                        <TableCell>
                          <TimePicker
                            label="Término"
                            value={this.getTime(this.state.editProfessional.endat)}
                            minutesStep={5}
                            onChange={(e) => this.editTimeValues(e, item.id, "endat")}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={
                              this.state.editProfessional.requiresSpecialtyRoom
                            }
                            onChange={(e) =>
                              this.handleRequireSpecialRoomEdit()
                            }
                            color="primary"
                            name="requiresSpecialtyRoom"
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
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.beginat}</TableCell>
                      <TableCell>{item.endat}</TableCell>
                      <TableCell>
                        <Switch
                          disabled
                          checked={item.requiresSpecialtyRoom}
                          onChange={() => this.handleRequireSpecialRoom()}
                          color="primary"
                          name="requiresSpecialtyRoom"
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
export default ProfessionalTable;

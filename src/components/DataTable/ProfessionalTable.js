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
import classes from "./ProfessionalTable.css";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class ProfessionalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionals: [],
      model: {
        name: "",
        beginat: new Date(),
        endat: new Date(),
        requiresSpecialtyRoom: false,
      },
    };
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

  handleRequireSpecialRoom = (e, requiresSpecialtyRoom) => {
    const { model } = this.state;
    model.requiresSpecialtyRoom = Boolean(!model.requiresSpecialtyRoom);
    this.setState({ model });
  };

  setValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
  };

  setTimeValues = (e, field) => {
    const { model } = this.state;
    model[field] = e;
    this.setState({ model });
  };

  save = () => {
    let data = {
      name: this.state.model.name,
      beginat: this.state.model.beginat,
      endat: this.state.model.endat,
      requiresSpecialtyRoom: this.state.model.requiresSpecialtyRoom,
    };
    ProfessionalService.createProfessional(data);
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
              onChange={(e) => this.setValues(e, "name")}
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
              onChange={(e) =>
                this.handleRequireSpecialRoom(e, "requiresSpecialtyRoom")
              }
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
        <div className={classes.List}>
          <Table className={classes.Table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Início</TableCell>
                <TableCell>Término</TableCell>
                <TableCell>Sala Especial</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.professionals.map((item, index) => {
                let itemBlock = null;
                if (item.editMode) {
                  itemBlock = (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <TextField
                          label="Name"
                          value={item.editItem.name}
                          onChange={(event) =>
                            this.changeEdit(event, index, "name")
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Início"
                          value={item.editItem.beginat}
                          onChange={(event) =>
                            this.changeEdit(event, index, "beginat")
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Término"
                          value={item.editItem.beginat}
                          onChange={(event) =>
                            this.changeEdit(event, index, "endat")
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Sala Especial"
                          value={item.editItem.price}
                          onChange={(event) =>
                            this.changeEdit(
                              event,
                              index,
                              "requiresSpecialtyRoom"
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          color="primary"
                          className={classes.Button}
                          onClick={() => this.save(index)}
                        >
                          <SaveIcon />
                        </Button>
                      </TableCell>
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
                          checked={item.requireSpecialRoom}
                          onChange={() =>
                            this.handleRequireSpecialRoom(item.id)
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
                          className={classes.Button}
                          onClick={() => this.change(item.id)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="text"
                          color="primary"
                          className={classes.Button}
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
        </div>
      </Paper>
    );
  }
}
export default ProfessionalTable;

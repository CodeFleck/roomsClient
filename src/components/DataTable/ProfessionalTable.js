import React from "react";
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

const handleRequireSpecialRoom = (index) => {
  console.log(index);
};

const ProfessionalTable = (props) => {
  const professionals = props.professionals;
  return (
    <Paper>
      <div className="addInfo">
        <TextField
          variant="outlined"
          className="TextField"
          label="Nome"
          // value={this.state.newItem.currentItem.name}
          onChange={(event) => props.newInput(event, "name")}
        />
        <TextField
          variant="outlined"
          className="TextField"
          label="Início"
          // value={this.state.newItem.currentItem.beginat}
          onChange={(event) => this.newInputChangeHandler(event, "beginat")}
        />
        <TextField
          variant="outlined"
          className="TextField"
          label="Término"
          // value={this.state.newItem.cuarrentItem.endat}
          onChange={(event) => this.newInputChangeHandler(event, "endat")}
        />
        <Switch
          //   checked={item.requireSpecialRoom}
          //   onChange={() => handleRequireSpecialRoom(item.id)}
          color="primary"
          name="requiresSpecialtyRoom"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Button
          variant="text"
          color="primary"
          className="Button"
          onClick={props.addItemHandler}
        >
          <AddIcon />
        </Button>
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
            {professionals.map((item, index) => {
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
                          props.changeEdit(event, index, "name")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Início"
                        value={item.editItem.beginat}
                        onChange={(event) =>
                          props.changeEdit(event, index, "beginat")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Término"
                        value={item.editItem.beginat}
                        onChange={(event) =>
                          props.changeEdit(event, index, "endat")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Sala Especial"
                        value={item.editItem.price}
                        onChange={(event) =>
                          props.changeEdit(
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
                        onClick={() => props.save(index)}
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
                        onChange={() => handleRequireSpecialRoom(item.id)}
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
                        onClick={() => props.change(item.id)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="text"
                        color="primary"
                        className={classes.Button}
                        onClick={() => {props.delete(item.id)}}
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
};

export default ProfessionalTable;

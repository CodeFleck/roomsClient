import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import ProfessionalService from "../services/ProfessionalService";
import ProfessionalTable from "./DataTable/ProfessionalTable";
import "./ManagementComponent.css";

export default class ManagementComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      professionals: [],

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

  handleSpecialRoomChange = (event) => {
    // setChecked(event.target.checked);
  };

  deleteItemHandler = (itemIndex) => {
    console.log("deleteing..." + itemIndex)
  };

  newInputChangeHandler = (event, type) => {
    console.log("NEW INPUT CHANGE HANDLER....");
  };

  addItemHandler = () => {
    console.log("GRAVANDO NOVO PROFISSIONAL....");
  };

  changeClickItemHandler = (index) => {
    console.log("CHANGE CLICK ITEM HANDLER = " + index);
  };

  changeEditInputHandler = (event, index, type) => {
    console.log("CHANGE EDIT INPUT HANDLER = " + index + type);
  };

  saveItemHandler = (index) => {
    console.log("SAVING ITEM..." + index);
  };

  render() {
    return (
      <div>
        <h3>Cadastro de Profissionais</h3>
        <br />
        <br />
        
        <ProfessionalTable
          professionals={this.state.professionals}
          addItemHandler={this.addItemHandler}
          newInput={this.newInputChangeHandler}
          delete={this.deleteItemHandler}
          change={this.changeClickItemHandler}
          changeEdit={this.changeEditInputHandler}
          save={this.saveItemHandler}
        />
      </div>
    );
  }
}

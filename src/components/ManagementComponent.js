import React, { Component } from "react";
import ProfessionalService from "../services/ProfessionalService";
import ProfessionalTable from "./DataTable/ProfessionalTable";
import "./ManagementComponent.css";
import { ThemeProvider } from "@material-ui/core";

export default class ManagementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
          change={this.changeClickItemHandler}
          changeEdit={this.changeEditInputHandler}
          save={this.saveItemHandler}
        />
      </div>
    );
  }
}

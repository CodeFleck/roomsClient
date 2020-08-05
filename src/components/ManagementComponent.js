import React, { Component } from "react";
import ProfessionalTable from "./DataTable/ProfessionalTable";
import "./ManagementComponent.css";

export default class ManagementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
          changeEdit={this.changeEditInputHandler}
          save={this.saveItemHandler}
        />
      </div>
    );
  }
}

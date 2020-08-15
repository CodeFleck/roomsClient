import React, { Component } from "react";
import ProfessionalTable from "./DataTable/ProfessionalTable";
import "./ManagementComponent.css";

export default class ManagementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
         <h3>Cadastro de Profissionais</h3> 
        <br />
        <br />
        <ProfessionalTable/>
      </div>
    );
  }
}

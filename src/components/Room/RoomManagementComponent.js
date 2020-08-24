import React, { Component } from "react";
import RoomTable from '../DataTable/RoomlTable';
import "./RoomManagementComponent.css";

export default class RoomManagementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
         {/* <h3>Cadastro de Salas</h3>  */}
        <br />
        <br />
          <RoomTable />
      </div>
    );
  }
}

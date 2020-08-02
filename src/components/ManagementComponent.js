import React, { Component } from "react";
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

  deleteItemHandler = id => {
    const { professionals } = this.state

        const professionalAtualizado = professionals.filter(professional => {
            return professional.id !== id
        })
        ProfessionalService.deleteProfessional(id)
            .then(res => {
                    this.setState({ professionals: [...professionalAtualizado] })
            })
            .catch(err => console.log(err))
  };

  handleSpecialRoomChange = (event) => {
    // setChecked(event.target.checked);
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

import React, { Component } from "react";
import AuthService from "../services/AuthService";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Usuário <strong>{currentUser.username}</strong>
          </h3>
        </header>
        <p>
        <strong>Nome:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./Token.css";

class Token extends Component {
  state = {
    token:
      "BQAmlrbCrUCrhuRLT8vjtAUpFwpIWXrxaRBB3ggJsD2PVs--rz7-6u6lYsBYCfL0gOZPhISS_q9EUKvV9tEKdiososBtee0DqdsTiq5rsoeJouo-3qNX0AzznxkD942URneHZTz0E5iT1jiIHjEJ3MUh0ifov8Y",
  };
  render() {
    return (
      <div className="Token">
        <div className="Token__content">
          <label htmlFor="token" className="style-regular-16-left-light">
            {this.props.expired
              ? "Seu Token de acesso Spotify expirou, digite novamente"
              : "Token de acesso Spotify"}
          </label>
          <input
            value={this.state.token}
            // TODO: add debounce
            onChange={this.handleOnChange}
            type="text"
            name="token"
            id="token"
            placeholder="Digite o seu TOKEN aqui"
            className="search style-bold-48-left-grey"
            maxLength="200"
          />
          <button onClick={this.handleOnClick}>Salvar</button>
        </div>
      </div>
    );
  }
  handleOnChange = (e) => {
    return this.setState({ token: e.target.value });
  };
  // TEMP
  handleOnClick = () => {
    return this.props.setToken({ token: this.state.token });
  };
}

export default Token;

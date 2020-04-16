import _ from "lodash";
import React, { Component } from "react";
import "./Token.css";

class Token extends Component {
  state = {
    token: "",
  };
  render() {
    return (
      <div className="Token">
        <div className="Token__content">
          <label htmlFor="token" className="style-regular-16-left-light">
            {this.props.expired
              ? "Seu Token de acesso Spotify expirou, digite novamente"
              : this.props.invalid
              ? "Seu Token de acesso Spotify não é válido, digite novamente"
              : "Token de acesso Spotify"}
          </label>
          <input
            value={this.state.token}
            onChange={this.onChange}
            type="text"
            name="token"
            id="token"
            placeholder="Digite o seu TOKEN aqui"
            className="search style-bold-48-left-grey"
            maxLength="200"
          />
        </div>
      </div>
    );
  }
  onChange = (e) => {
    this.setState({ token: e.target.value });
    this.debounceSetToken();
  };
  debounceSetToken = _.debounce(
    () => this.props.setToken({ token: this.state.token }),
    500
  );
}

export default Token;

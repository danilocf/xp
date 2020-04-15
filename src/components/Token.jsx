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
            TOKEN de acesso Spotify
          </label>
          <input
            value={this.state.token}
            onChange={(e) => this.setState({ token: e.target.value })}
            type="text"
            name="token"
            id="token"
            placeholder="Digite aqui o seu TOKEN"
            className="search style-bold-48-left-grey"
          />
        </div>
      </div>
    );
  }
}

export default Token;

import React, { Component } from "react";
import "./App.css";
import logoSpotify from "./assets/spotify.png";
import Token from "./components/Token";

class App extends Component {
  state = {
    token: "",
    tokenExpired: false,
    tokenInvalid: false,
  };
  render() {
    return (
      <div className="App">
        {!this.state.token.length && (
          <Token
            setToken={this.onSetToken}
            expired={this.state.tokenExpired}
            invalid={this.state.tokenInvalid}
          />
        )}
        <img src={logoSpotify} alt="" className="logo" />
        {this.state.token.length && (
          <div className="container">
            {React.Children.map(this.props.children, (child) =>
              React.cloneElement(child, {
                token: this.state.token,
                setToken: this.onSetToken,
              })
            )}
          </div>
        )}
      </div>
    );
  }
  onSetToken = ({ token, expired, invalid }) => {
    return this.setState({
      token,
      tokenExpired: expired || false,
      tokenInvalid: invalid || false,
    });
  };
}

export default App;

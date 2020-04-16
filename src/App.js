import React, { Component } from "react";
import "./App.css";
import logoSpotify from "./assets/spotify.png";
import Token from "./components/Token";

class App extends Component {
  state = {
    token: "",
    tokenExpired: false,
  };
  render() {
    return (
      <div className="App">
        {!this.state.token.length && (
          <Token setToken={this.onSetToken} expired={this.state.tokenExpired} />
        )}
        <img src={logoSpotify} alt="" className="logo" />
        <div className="container">
          {React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
              token: this.state.token,
              // FIXME:
              setToken: this.onSetToken,
            })
          )}
        </div>
      </div>
    );
  }
  onSetToken = ({ token, expired }) => {
    return this.setState({ token, tokenExpired: expired || false });
  };
}

export default App;

import React, { Component } from "react";
import "./App.css";
import logoSpotify from "./assets/spotify.png";
import Token from "./components/Token";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Token />
        <img src={logoSpotify} alt="" className="logo" />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default App;

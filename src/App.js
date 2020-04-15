import React, { Component } from "react";
import "./App.css";
import logoSpotify from "./assets/spotify.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logoSpotify} alt="" className="logo" />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default App;

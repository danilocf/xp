import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Token from "./components/token/Token";
import Home from "./views/Home";
import Album from "./views/Album";
import logoSpotify from "./assets/spotify.png";
import "./App.css";

class App extends Component {
  state = {
    token: "",
    tokenExpired: false,
    tokenInvalid: false,
  };
  render() {
    return (
      <Router>
        <div className="App">
          {!this.state.token.length && (
            <Token
              setToken={this.onSetToken}
              expired={this.state.tokenExpired}
              invalid={this.state.tokenInvalid}
            />
          )}
          <Link to="/">
            <img src={logoSpotify} alt="" className="logo" />
          </Link>
          {this.state.token.length && (
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/album/:id"
                  render={(props) => (
                    <Album
                      {...props}
                      token={this.state.token}
                      setToken={this.onSetToken}
                    />
                  )}
                />
                <Route
                  path="/"
                  render={(props) => (
                    <Home
                      {...props}
                      token={this.state.token}
                      setToken={this.onSetToken}
                    />
                  )}
                />
              </Switch>
            </div>
          )}
        </div>
      </Router>
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

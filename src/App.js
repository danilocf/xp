import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Token from "./components/token/Token";
import Player from "./components/player/Player";
import Home from "./views/Home";
import Album from "./views/Album";
import logoSpotify from "./assets/spotify.png";
import "./App.css";

class App extends Component {
  state = {
    token: "",
    tokenExpired: false,
    tokenInvalid: false,
    track: { name: "", artists: [], preview_url: "" },
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

          <div className="row">
            <div className="col">
              <Link to="/">
                <img src={logoSpotify} alt="Logo" className="logo" />
              </Link>
            </div>
            <div className="col fill">
              {!!this.state.track.preview_url.length && (
                <Player track={this.state.track} />
              )}
            </div>
          </div>

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
                      setTrack={this.onSetTrack}
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
                      setTrack={this.onSetTrack}
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

  componentDidMount() {
    this.getToken();
    this.getTrack();
  }

  getToken = () => {
    const token = localStorage.getItem("token");
    if (token) this.setState({ token });
  };

  onSetToken = ({ token, expired = false, invalid = false }) => {
    localStorage.setItem("token", expired || invalid ? "" : token);
    return this.setState({
      token,
      tokenExpired: expired,
      tokenInvalid: invalid,
    });
  };

  getTrack = () => {
    const track = JSON.parse(localStorage.getItem("track")) || "";
    if (track) this.setState({ track });
  };

  onSetTrack = (track) => {
    localStorage.setItem("track", JSON.stringify(track));
    return this.setState({
      track,
    });
  };
}

export default App;

import React, { Component } from "react";
import "./Player.css";

class Player extends Component {
  render() {
    return (
      <div className="Player">
        <p className="style-regular-18-left-grey">
          Preview:{" "}
          <b>
            {this.props.track.name} -{" "}
            {this.props.track.artists.map((i) => i.name).join(", ")}
          </b>
        </p>
        <audio id="player" controls />
      </div>
    );
  }
  play = () => {
    const player = document.getElementById("player");
    player.setAttribute("src", this.props.track.preview_url);
    player.addEventListener("loadeddata", (e) => {
      e.target.play();
    });
  };
  componentDidMount() {
    this.play();
  }
  componentDidUpdate() {
    this.play();
  }
}

export default Player;

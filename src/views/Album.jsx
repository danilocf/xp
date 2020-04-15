import React, { Component } from "react";
import tracks from "../mocks/tracks.json";

class Spotify extends Component {
  state = {
    title: "Nome do álbum grande de duas linhas",
    artist: "Nome do artista grande de duas linhas",
    tracks,
  };
  render() {
    return (
      <React.Fragment>
        {/* <a href="#">Voltar</a> */}
        <div className="row">
          <div className="col">
            <div className="album large">
              <img
                src="https://picsum.photos/300"
                alt=""
                className="album__img"
              />
              <p className="album__title style-regular-18-center-light">
                {this.state.title}
              </p>
              <p className="album__artist style-regular-14-center-grey">
                {this.state.artist}
              </p>
            </div>
          </div>
          <div className="col fill">
            <div className="list">
              {this.state.tracks.map((item, index) => (
                <div className="list__item" key={index}>
                  <div className="list__number style-regular-18-left-grey">
                    {index + 1}.
                  </div>
                  <div className="list__title style-regular-18-left-light">
                    {item.title}
                  </div>
                  <div className="list__duration style-regular-18-right-grey">
                    {item.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Spotify;

import React, { Component } from "react";
import "./Spotify.css";
import logoSpotify from "../assets/spotify.png";

class Spotify extends Component {
  state = {
    albuns: [
      {
        title: "Nome do álbum",
        artist: "Nome do artista",
      },
      {
        title: "Nome do álbum",
        artist: "Nome do artista",
      },
      {
        title: "Nome do álbum",
        artist: "Nome do artista",
      },
      {
        title: "Nome do álbum",
        artist: "Nome do artista",
      },
      {
        title: "Nome do álbum",
        artist: "Nome do artista",
      },
    ],
  };
  render() {
    return (
      <div className="Spotify">
        <img src={logoSpotify} alt="" srcset="" className="logo" />
        <div className="container">
          <label htmlFor="search" className="style-regular-16-left-light">
            Busque por artistas, álbuns ou músicas
          </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Comece a escrever..."
            className="search style-bold-48-left-grey"
          />
          <div className="albuns">
            <p className="albuns__text style-regular-24-left-light">
              Álbuns buscados recentemente
            </p>
            <div className="albuns__container">
              {this.state.albuns.map((item, index) => (
                <div className="album" key={index}>
                  <img
                    src="https://picsum.photos/170"
                    alt=""
                    srcset=""
                    className="album__img"
                  />
                  <p className="album__title style-regular-14-center-light">
                    {item.title}
                  </p>
                  <p className="album__artist style-regular-14-center-grey">
                    {item.artist}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="albuns">
            <p className="albuns__text style-regular-24-left-light">
              Álbuns buscados recentemente
            </p>
            <div className="albuns__container">
              {this.state.albuns.map((item, index) => (
                <div className="album" key={index}>
                  <img
                    src="https://picsum.photos/170"
                    alt=""
                    srcset=""
                    className="album__img"
                  />
                  <p className="album__title style-regular-14-center-light">
                    {item.title}
                  </p>
                  <p className="album__artist style-regular-14-center-grey">
                    {item.artist}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Spotify;

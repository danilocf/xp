import React, { Component } from "react";
import "./Spotify.css";
import logoSpotify from "../assets/spotify.png";

class Spotify extends Component {
  render() {
    return (
      <div className="Spotify">
        <img src={logoSpotify} alt="" srcset="" className="logo" />
        <div className="container">
          <label htmlFor="search">Busque por artistas, álbuns ou músicas</label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Comece a escrever"
          />
          <div className="albuns">
            <p>Álbuns buscados recentementes</p>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
          </div>
          <div className="albuns">
            <p>Álbuns buscados recentementes</p>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
            <div className="album">
              <img
                // src="https://picsum.photos/170"
                alt=""
                srcset=""
                className="album__img"
              />
              <p className="album__title">Nome do álbum</p>
              <p className="album__artist">Nome do artista</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Spotify;

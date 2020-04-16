import _ from "lodash";
import React, { Component } from "react";
import albuns from "../mocks/albuns.json";
import musics from "../mocks/musics.json";
import ServiceApi from "../services/ServiceApi";

class Home extends Component {
  state = {
    search: "",
    searchs: albuns,
    albuns,
    musics,
  };
  render() {
    return (
      <React.Fragment>
        <label htmlFor="search" className="style-regular-16-left-light">
          Busque por artistas, álbuns ou músicas
        </label>
        <input
          value={this.state.search}
          onChange={this.onChange}
          type="text"
          name="search"
          id="search"
          placeholder="Comece a escrever..."
          className="search style-bold-48-left-grey"
          maxLength="200"
        />
        {this.state.search.length ? (
          <React.Fragment>
            <div className="albuns">
              <p className="albuns__text style-regular-24-left-light">
                {`Álbuns encontrados para "${this.state.search}"`}
              </p>
              <div className="albuns__container">
                {this.state.albuns.length ? (
                  this.state.albuns.map((item, index) => (
                    <div className="album" key={index}>
                      <img
                        src={item.images[1].url}
                        alt=""
                        className="album__img"
                      />
                      <p className="album__title style-regular-14-center-light">
                        {item.name}
                      </p>
                      <p className="album__artist style-regular-14-center-grey">
                        {item.artists.map((i) => i.name).join(", ")}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="style-regular-18-left-grey">
                    Nenhum álbum encontrado para "{this.state.search}"
                  </p>
                )}
              </div>
            </div>

            <div className="albuns">
              <p className="albuns__text style-regular-24-left-light">
                {`Músicas encontradas para "${this.state.search}"`}
              </p>
              <div className="albuns__container">
                {this.state.musics.length ? (
                  this.state.musics.map((item, index) => (
                    <div className="album" key={index}>
                      <img
                        src={item.album.images[1].url}
                        alt=""
                        className="album__img"
                      />
                      <p className="album__title style-regular-14-center-light">
                        {item.name}
                      </p>
                      <p className="album__artist style-regular-14-center-grey">
                        {item.artists.map((i) => i.name).join(", ")}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="style-regular-18-left-grey">
                    Nenhuma música encontrado para "{this.state.search}"
                  </p>
                )}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="albuns">
            <p className="albuns__text style-regular-24-left-light">
              Álbuns buscados recentemente
            </p>
            <div className="albuns__container">
              {this.state.searchs.length ? (
                this.state.searchs.map((item, index) => (
                  <div className="album" key={index}>
                    <img
                      src="https://picsum.photos/170"
                      alt=""
                      className="album__img"
                    />
                    <p className="album__title style-regular-14-center-light">
                      {item.title}
                    </p>
                    <p className="album__artist style-regular-14-center-grey">
                      {item.artist}
                    </p>
                  </div>
                ))
              ) : (
                <p className="style-regular-18-left-grey">
                  Nenhum álbum recente encontrado...
                </p>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
  onChange = (e) => {
    this.setState({ search: e.target.value });
    this.debounceApiSearch();
  };
  debounceApiSearch = _.debounce(() => this.apiSearch(), 500);
  apiSearch = async () => {
    if (!this.state.search) return;
    try {
      const { data } = await ServiceApi.search({
        query: this.state.search,
        token: this.props.token,
      });
      this.setState({ albuns: data.albums.items, musics: data.tracks.items });
    } catch (error) {
      const message = error.response.data.error.message;
      this.props.setToken({
        token: "",
        invalid:
          message === "Invalid access token" ||
          "Only valid bearer authentication supported",
        expired: message === "The access token expired",
      });
    }
  };
}

export default Home;

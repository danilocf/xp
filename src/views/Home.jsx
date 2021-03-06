import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ServiceApi from "../services/ServiceApi";

class Home extends Component {
  state = {
    loading: true,
    offset: 0,
    lastSearch: "",
    search: "",
    searchs: [],
    albums: [],
    tracks: [],
  };

  render() {
    return (
      <React.Fragment>
        <label
          htmlFor="search"
          className="style-regular-16-left-light animated fadeIn slow"
        >
          Busque por artistas, álbuns ou músicas
        </label>
        <input
          value={this.state.search}
          onChange={this.onChange}
          type="text"
          name="search"
          id="search"
          placeholder="Comece a escrever..."
          className="search style-bold-48-left-grey animated fadeIn"
          maxLength="50"
        />

        {this.state.search.length ? (
          <React.Fragment>
            <div className="albums">
              <p className="albums__text style-regular-24-left-light">
                {`Álbuns encontrados para "${this.state.search}"`}
              </p>
              <div className="albums__container">
                {this.state.loading ? (
                  <p className="style-regular-18-left-grey">Carregando...</p>
                ) : this.state.albums.length ? (
                  this.state.albums.map((item, index) => (
                    <Link
                      to={`/album/${item.id}`}
                      className="album animated zoomIn fast"
                      key={index}
                    >
                      <img
                        src={item.images[1].url}
                        alt="Imagem do Álbum"
                        className="album__img"
                      />
                      <p className="album__title style-regular-14-center-light">
                        {item.name}
                      </p>
                      <p className="album__artist style-regular-14-center-grey">
                        {item.artists.map((i) => i.name).join(", ")}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="style-regular-18-left-grey">
                    Nenhum álbum encontrado para "{this.state.search}"
                  </p>
                )}
              </div>
            </div>

            <div className="albums">
              <p className="albums__text style-regular-24-left-light">
                {`Músicas encontradas para "${this.state.search}"`}
              </p>
              <div className="albums__container">
                {this.state.loading ? (
                  <p className="style-regular-18-left-grey">Carregando...</p>
                ) : this.state.tracks.length ? (
                  this.state.tracks.map((item, index) => (
                    <Link
                      to={`/album/${item.album.id}`}
                      className="album animated zoomIn fast"
                      key={index}
                    >
                      <img
                        src={item.album.images[1].url}
                        alt="Imagem do Álbum"
                        className="album__img"
                      />
                      <p className="album__title style-regular-14-center-light">
                        {item.name}
                      </p>
                      <p className="album__artist style-regular-14-center-grey">
                        {item.artists.map((i) => i.name).join(", ")}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="style-regular-18-left-grey">
                    Nenhum música encontrada para "{this.state.search}"
                  </p>
                )}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="albums animated fadeIn">
            <p className="albums__text style-regular-24-left-light">
              Álbuns buscados recentemente
            </p>
            <div className="albums__container">
              {this.state.searchs.length ? (
                [1, 2, 3, 4, 5].map((i, index) => {
                  const item = this.state.searchs[index] || {
                    id: "",
                    images: [{}, { url: "" }],
                    name: "",
                    artists: [],
                  };
                  return (
                    <Link
                      to={`/album/${item.id}`}
                      className={
                        item.id ? "album animated zoomIn fast" : "album hidden"
                      }
                      key={index}
                    >
                      <img
                        src={item.images[1].url}
                        alt="Imagem do Álbum"
                        className="album__img"
                      />
                      <p className="album__title style-regular-14-center-light">
                        {item.name}
                      </p>
                      <p className="album__artist style-regular-14-center-grey">
                        {item.artists.map((i) => i.name).join(", ")}
                      </p>
                    </Link>
                  );
                })
              ) : (
                <p className="style-regular-18-left-grey">
                  Nenhum álbum recente encontrado...
                </p>
              )}
            </div>
          </div>
        )}

        {!this.state.loading &&
          (!!this.state.albums.length || !!this.state.tracks.length) && (
            <div
              className="seemore style-bold-36-center-grey"
              onClick={this.apiSearch}
            >
              Ver mais
            </div>
          )}
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getSearchs();
  }

  getSearchs = () => {
    const searchs = JSON.parse(localStorage.getItem("searchs")) || [];
    if (_.isArray(searchs)) {
      this.setState({ searchs });
    }
  };

  onChange = (e) => {
    this.setState({ search: e.target.value });
    this.debounceApiSearch();
  };

  debounceApiSearch = _.debounce(() => this.apiSearch(), 500);

  apiSearch = async () => {
    if (!this.state.search) {
      this.reset();
      return;
    }
    try {
      this.setState({ loading: true });
      const { data } = await ServiceApi.search({
        token: this.props.token,
        query: this.state.search,
        offset:
          this.state.search === this.state.lastSearch
            ? this.state.offset + 5
            : 0,
      });
      const albumItems = (data.albums && data.albums.items) || [];
      const trackItems = (data.tracks && data.tracks.items) || [];
      this.setState({
        lastSearch: this.state.search,
        offset:
          this.state.search === this.state.lastSearch
            ? this.state.offset + 5
            : 0,
        albums:
          this.state.search === this.state.lastSearch
            ? [...this.state.albums, ...albumItems]
            : albumItems,
        tracks:
          this.state.search === this.state.lastSearch
            ? [...this.state.tracks, ...trackItems]
            : trackItems,
      });
    } catch (error) {
      this.reset();
      const message = error.response.data.error.message;
      this.props.setToken({
        token: "",
        invalid:
          message === "Invalid access token" ||
          "Only valid bearer authentication supported",
        expired: message === "The access token expired",
      });
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 300);
    }
  };

  reset = () => {
    this.setState({
      offset: 0,
      lastSearch: "",
      albums: [],
      tracks: [],
    });
  };
}

export default Home;

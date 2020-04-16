import _ from "lodash";
import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ServiceApi from "../services/ServiceApi";

class Album extends Component {
  state = {
    loading: false,
    error: false,
    album: {
      images: [],
      name: "",
      artists: [],
      tracks: {
        items: [
          {
            name: "Nome da música",
            duration_ms: 0,
          },
        ],
      },
    },
  };
  render() {
    return (
      <React.Fragment>
        <Link to="/" className="goback style-regular-18-left-white">
          {"<"} Voltar
        </Link>
        {this.state.loading && (
          <p className="style-regular-18-left-grey">Carregando...</p>
        )}
        {this.state.error && (
          <p className="style-regular-18-left-grey">
            Nenhum álbum encontrado com id "{this.props.match.params.id}"
          </p>
        )}
        <div className="row">
          <div className="col">
            <div className="album large">
              {this.state.album.images &&
              this.state.album.images[0] &&
              this.state.album.images[0].url &&
              this.state.album.images[0].url.length ? (
                <img
                  src={this.state.album.images[0].url}
                  alt=""
                  className="album__img"
                />
              ) : (
                <img alt="" className="album__img" />
              )}
              <p className="album__title style-regular-18-center-light">
                {this.state.album.name || "Nome do álbum"}
              </p>
              <p className="album__artist style-regular-14-center-grey">
                {this.state.album.artists && this.state.album.artists.length
                  ? this.state.album.artists.map((i) => i.name).join(", ")
                  : "Nome do artista"}
              </p>
            </div>
          </div>
          <div className="col fill">
            <div className="list">
              {this.state.album.tracks &&
                this.state.album.tracks.items.map((item, index) => (
                  <div className="list__item" key={index}>
                    <div className="list__number style-regular-18-left-grey">
                      {index + 1}.
                    </div>
                    <div className="list__title style-regular-18-left-light">
                      {item.name}
                    </div>
                    <div className="list__duration style-regular-18-right-grey">
                      {moment(item.duration_ms).format("mm:ss")}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    this.getAlbum();
  }
  getAlbum = () => {
    const searchs = localStorage.getItem("searchs")
      ? JSON.parse(localStorage.getItem("searchs"))
      : [];
    const item = searchs.find((i) => i.id === this.props.match.params.id);
    if (_.isArray(searchs) && !!item) {
      this.setState({ album: item });
    } else {
      this.apiAlbum();
    }
  };
  apiAlbum = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await ServiceApi.album({
        token: this.props.token,
        id: this.props.match.params.id,
      });
      this.saveSearch(data);
      setTimeout(() => {
        this.setState({ loading: false, album: data });
      }, 300);
    } catch (error) {
      setTimeout(() => {
        this.setState({ loading: false, error: true });
      }, 300);
      const message = error.response.data.error.message;
      const messages = [
        "Invalid access token",
        "Only valid bearer authentication supported",
        "The access token expired",
      ];
      if (messages.includes(message)) {
        this.props.setToken({
          token: "",
          invalid: message === messages[0] || message === messages[1],
          expired: message === messages[2],
        });
      }
    }
  };
  saveSearch = (data) => {
    const searchs = localStorage.getItem("searchs")
      ? JSON.parse(localStorage.getItem("searchs"))
      : [];
    let newSearch;
    const newSearchData = {
      id: data.id,
      images: data.images,
      name: data.name,
      artists: data.artists,
      tracks: {
        items: data.tracks.items.map((i) => {
          return {
            name: i.name,
            duration_ms: i.duration_ms,
          };
        }),
      },
    };
    if (_.isArray(searchs)) {
      newSearch = [...searchs];
      if (!searchs.find((i) => i.id === data.id)) {
        newSearch = [newSearchData, ...searchs.splice(0, 4)];
      }
    } else {
      newSearch = [newSearchData];
    }
    localStorage.setItem("searchs", JSON.stringify(newSearch));
  };
}

export default Album;

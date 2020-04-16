import moment from "moment";
import React, { Component } from "react";
import ServiceApi from "../services/ServiceApi";

class Spotify extends Component {
  state = {
    album: {
      images: [{ url: "" }],
      name: "",
      artists: [],
      tracks: {
        items: [],
      },
    },
  };
  render() {
    return (
      <React.Fragment>
        {/* TODO: */}
        {/* <a href="#">Voltar</a> */}
        <div className="row">
          <div className="col">
            <div className="album large">
              <img
                src={this.state.album.images[0].url}
                alt=""
                className="album__img"
              />
              <p className="album__title style-regular-18-center-light">
                {this.state.album.name}
              </p>
              <p className="album__artist style-regular-14-center-grey">
                {this.state.album.artists.map((i) => i.name).join(", ")}
              </p>
            </div>
          </div>
          <div className="col fill">
            <div className="list">
              {this.state.album.tracks.items.map((item, index) => (
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
    this.apiAlbum();
  }
  apiAlbum = async () => {
    try {
      const { data } = await ServiceApi.album({
        token: this.props.token,
        // FIXME:
        id: "78bpIziExqiI9qztvNFlQu",
      });
      this.setState({ album: data });
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

export default Spotify;

import React, { Component } from "react";
import albuns from "../mocks/albuns.json";
import musics from "../mocks/musics.json";
import ServiceApi from "../services/ServiceApi";

class Home extends Component {
  state = {
    search: "arctic monkeys",
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
          onChange={this.handleOnChange}
          type="text"
          name="search"
          id="search"
          placeholder="Comece a escrever..."
          className="search style-bold-48-left-grey"
          maxLength="200"
        />
        <button onClick={this.handleOnClick}>Salvar</button>
        {this.state.search.length ? (
          <React.Fragment>
            <div className="albuns">
              <p className="albuns__text style-regular-24-left-light">
                {`Álbuns encontrados para "${this.state.search}"`}
              </p>
              <div className="albuns__container">
                {this.state.albuns.map((item, index) => (
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
                ))}
              </div>
            </div>

            <div className="albuns">
              <p className="albuns__text style-regular-24-left-light">
                {`Músicas encontradas para "${this.state.search}"`}
              </p>
              <div className="albuns__container">
                {this.state.musics.map((item, index) => (
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
                ))}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="albuns">
            <p className="albuns__text style-regular-24-left-light">
              Álbuns buscados recentemente
            </p>
            <div className="albuns__container">
              {this.state.searchs.map((item, index) => (
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
              ))}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
  handleOnChange = (e) => {
    this.setState({ search: e.target.value });
  };
  // TEMP
  handleOnClick = async () => {
    console.log("token", this.props.token);
    try {
      const { data } = await ServiceApi.search({
        query: this.state.search,
        token: this.props.token,
      });
      console.log("data", data);
      this.setState({ albuns: data.albums.items, musics: data.tracks.items });
    } catch (error) {
      console.log("error", error);
      if (error.response.status === 401) {
        this.props.setToken({ token: "", expired: true });
      }
    }
  };
}

export default Home;

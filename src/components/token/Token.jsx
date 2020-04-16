import _ from "lodash";
import React, { Component } from "react";
// FIXME:
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as Actions from "../../store/actions";
import "./Token.css";

class Token extends Component {
  state = {
    token: "",
  };
  // FIXME:
  // render({ lala, toggleLala }) {
  render() {
    return (
      <div className="Token">
        <div className="Token__content">
          <label htmlFor="token" className="style-regular-16-left-light">
            {this.props.expired
              ? "Seu Token de acesso Spotify expirou, digite novamente"
              : this.props.invalid
              ? "Seu Token de acesso Spotify não é válido, digite novamente"
              : "Token de acesso Spotify"}
          </label>
          <input
            value={this.state.token}
            onChange={this.onChange}
            type="text"
            name="token"
            id="token"
            placeholder="Digite o seu Token aqui"
            className="search style-bold-48-left-grey"
            maxLength="200"
          />
          {/* FIXME: */}
          {/* <button onClick={() => toggleLala(lala[0])}>test</button> */}
        </div>
      </div>
    );
  }
  onChange = (e) => {
    this.setState({ token: e.target.value });
    this.debounceSetToken();
  };
  debounceSetToken = _.debounce(
    () => this.props.setToken({ token: this.state.token }),
    500
  );
}

// FIXME:
// const mapStateToProps = (state) => ({ lala: state.lala });
// const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);
// export default connect(mapStateToProps, mapDispatchToProps)(Token);
// export default connect()(Token);
export default Token;

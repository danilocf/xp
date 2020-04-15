import React, { Component } from "react";
import "./Test.css";

class Test extends Component {
  state = {
    test: "test",
    image: "https://picsum.photos/200",
    list: ["item1", "item2", "item3"],
  };
  render() {
    return (
      <React.Fragment>
        <h1>Hello {this.formatTest()}</h1>
        <input
          id="test"
          value={this.state.test}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleButtonClick}>reset</button>
        <ul>
          {this.state.list.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <img src={this.state.image} alt="" />
      </React.Fragment>
    );
  }

  handleInputChange = (e) => {
    return this.setState({ test: e.target.value });
  };

  handleButtonClick = (e) => {
    return this.setState({ test: "" });
  };

  formatTest() {
    const { test } = this.state;
    return (
      <span className={test.length > 10 ? "test" : ""}>
        {test.toUpperCase()}
      </span>
    );
  }
}

export default Test;

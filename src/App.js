import React, { Component } from "react";
import "./App.css";
import Row from "./automata/Row";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row numCells="10" />
      </div>
    );
  }
}

export default App;

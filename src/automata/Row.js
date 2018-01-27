import React, { Component } from "react";
import "./Row.css";
import Cell from "./Cell";

class Row extends Component {
  render() {
    var cs = JSON.parse(this.props.states);

    return (
      <div className="Row">
        {cs.map(cellstate => <Cell active={cellstate} />)}
      </div>
    );
  }
}

export default Row;

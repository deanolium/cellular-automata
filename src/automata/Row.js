import React, { Component } from "react";
import "./Row.css";
import Cell from "./Cell";

class Row extends Component {
  cellStates = null;

  setupRandomRow() {
    this.cellStates = [];
    for (var i = 0; i < this.props.numCells; i++) {
      this.cellStates.push(Math.floor(Math.random() * 2) === 0);
    }
  }

  componentWillMount() {
    this.setupRandomRow();
  }

  render() {
    return (
      <div className="Row">
        {this.cellStates.map(cellstate => <Cell active={cellstate} />)}
      </div>
    );
  }
}

export default Row;

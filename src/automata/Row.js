import React, { Component } from "react";
import "./Row.css";
import Cell from "./Cell";

class Row extends Component {
  render() {
    return (
      <div className="Row">
        {[...Array(100)].map(() => (
          <Cell active={Math.floor(Math.random() * 2) === 0} />
        ))}
      </div>
    );
  }
}

export default Row;

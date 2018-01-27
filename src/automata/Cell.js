import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    var activeStyle = this.props.active ? "active" : "inactive";
    return <div className={"Cell " + activeStyle} />;
  }
}

export default Cell;

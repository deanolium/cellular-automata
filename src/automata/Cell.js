import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    const activeStyle = this.props.transition
      ? this.props.active ? "active" : "inactive"
      : this.props.active ? "fast_active" : "fast_inactive";

    return <div className={"Cell " + activeStyle} />;
  }
}

export default Cell;

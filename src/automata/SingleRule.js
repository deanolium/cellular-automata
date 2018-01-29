import React, { Component } from "react";
import "./SingleRule.css";

class SingleRule extends Component {
  // Displays a given rule via small squares

  render() {
    const leftClass = this.props.left ? "active" : "inactive";
    const centerClass = this.props.center ? "active" : "inactive";
    const rightClass = this.props.right ? "active" : "inactive";
    const resultClass = this.props.result ? "active" : "inactive";

    return (
      <div
        className="ruleContainer"
        onClick={() => this.props.onClick(this.props.id, !this.props.result)}
      >
        <div className={`rulebox left ${leftClass}`} />
        <div className={`rulebox center ${centerClass}`} />
        <div className={`rulebox right ${rightClass}`} />
        <div className={`rulebox result ${resultClass}`} />
      </div>
    );
  }
}

export default SingleRule;

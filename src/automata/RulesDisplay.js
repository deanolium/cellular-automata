import React, { Component } from "react";

class RulesDisplay extends Component {
  render() {
    const ruleElements = <SingleRule />;

    return <div className="RuleList">{ruleElements}</div>;
  }
}

export default RulesDisplay;

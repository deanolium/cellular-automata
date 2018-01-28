import React, { Component } from "react";
import SingleRule from "./SingleRule";

class RulesDisplay extends Component {
  createSingleRule(ruleItemId, result) {
    // Creates a single rule based on the id

    // Check the range
    if (ruleItemId > 7 || ruleItemId < 0) {
      throw `Item Id ${ruleItemId} out of range`;
    }

    // bit test ruleItemId to get the left, center and right parts
    const left = ((1 << 2) & ruleItemId) !== 0;
    const center = ((1 << 1) & ruleItemId) !== 0;
    const right = ((1 << 0) & ruleItemId) !== 0;

    return (
      <SingleRule left={left} center={center} right={right} result={result} />
    );
  }

  generateRuleElements(id) {
    // Generates rule elements based on the given id
  }

  render() {
    // need to generate single rules
    const ruleElements = <SingleRule />;

    return <div className="RuleList">{ruleElements}</div>;
  }
}

export default RulesDisplay;

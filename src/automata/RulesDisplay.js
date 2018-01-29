import React, { Component } from "react";
import SingleRule from "./SingleRule";
import "./RulesDisplay.css";

class RulesDisplay extends Component {
  getResultsForRuleset(ruleId) {
    // returns the single rule results for the given rule id
    // lets use functional programming as it's fun

    return [...Array(8).keys()].map(x => ((1 << (7 - x)) & ruleId) !== 0);
  }

  onClick(ruleItemId, result) {
    // determine the new rule id, then call the prop'd onClick
    let newRule = this.props.rule;

    newRule = !result
      ? newRule | (1 << ruleItemId)
      : newRule ^ (1 << ruleItemId);

    // call the prop'd onClick
    this.props.onClick(newRule);
  }

  createSingleRule(ruleItemId, result) {
    // Creates a single rule based on the id

    // Check the range
    if (ruleItemId > 7 || ruleItemId < 0) {
      throw new Error(`Item Id ${ruleItemId} out of range`);
    }

    // bit test ruleItemId to get the left, center and right parts
    const left = ((1 << 2) & ruleItemId) !== 0;
    const center = ((1 << 1) & ruleItemId) !== 0;
    const right = ((1 << 0) & ruleItemId) !== 0;

    return (
      <SingleRule
        key={`ruleItem-${ruleItemId}`}
        id={ruleItemId}
        onClick={(...args) => {
          this.onClick(...args);
        }}
        left={left}
        center={center}
        right={right}
        result={result}
      />
    );
  }

  generateRuleElements(id) {
    // Generates rule elements based on the given id
  }

  render() {
    const resultTable = this.getResultsForRuleset(this.props.rule);

    const ruleElements = resultTable.map((result, i) =>
      this.createSingleRule(7 - i, result)
    );

    return <div className="RuleList">{ruleElements}</div>;
  }
}

export default RulesDisplay;

import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";

import RulesDisplay from "./RulesDisplay";
import SingleRule from "./SingleRule";

describe("Rules Display", () => {
  it("Displays eight single rules for the given rule id", () => {
    // This is really an integration test... Should fix...
    const rulesDisplay = new RulesDisplay();

    const generateSingleRule = (left, center, right, result) => (
      <SingleRule left={left} center={center} right={right} result={result} />
    );

    let expectedOutput = (
      <div>
        {generateSingleRule(true, true, true, false)}
        {generateSingleRule(true, true, false, false)}
        {generateSingleRule(true, false, true, false)}
        {generateSingleRule(true, false, false, false)}
        {generateSingleRule(false, true, true, false)}
        {generateSingleRule(false, true, false, false)}
        {generateSingleRule(false, false, true, false)}
        {generateSingleRule(false, false, false, false)}
      </div>
    );

    let wrapper = mount(<RulesDisplay rule={0} />);
    expect(wrapper.children().matchesElement(expectedOutput)).toBeTruthy();

    expectedOutput = (
      <div>
        {generateSingleRule(true, true, true, false)}
        {generateSingleRule(true, true, false, false)}
        {generateSingleRule(true, false, true, false)}
        {generateSingleRule(true, false, false, false)}
        {generateSingleRule(false, true, true, false)}
        {generateSingleRule(false, true, false, false)}
        {generateSingleRule(false, false, true, false)}
        {generateSingleRule(false, false, false, true)}
      </div>
    );

    wrapper = mount(<RulesDisplay rule={1} />);
    expect(wrapper.children().matchesElement(expectedOutput)).toBeTruthy();
  });

  it("Determines the ruleset for the given rule id", () => {
    const rulesDisplay = new RulesDisplay();

    expect(rulesDisplay.getResultsForRuleset(0)).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
    expect(rulesDisplay.getResultsForRuleset(1)).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]);
    expect(rulesDisplay.getResultsForRuleset(32)).toEqual([
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false
    ]);
    expect(rulesDisplay.getResultsForRuleset(60)).toEqual([
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      false
    ]);
  });

  it("Throws exception for out of range single rule", () => {
    const rulesDisplay = new RulesDisplay();

    expect(() => {
      rulesDisplay.createSingleRule(8, false);
    }).toThrowError("Item Id 8 out of range");

    expect(() => {
      rulesDisplay.createSingleRule(-1, false);
    }).toThrowError("Item Id -1 out of range");
  });

  it("Creates appropriate single rules", () => {
    const rulesDisplay = new RulesDisplay();

    expect(mount(rulesDisplay.createSingleRule(0, false))).toEqual(
      mount(
        <SingleRule
          id={0}
          left={false}
          center={false}
          right={false}
          result={false}
          onClick={rulesDisplay.onClick}
        />
      )
    );

    expect(mount(rulesDisplay.createSingleRule(1, false))).toEqual(
      mount(
        <SingleRule
          id={1}
          left={false}
          center={false}
          right={true}
          result={false}
          onClick={rulesDisplay.onClick}
        />
      )
    );

    expect(mount(rulesDisplay.createSingleRule(3, true))).toEqual(
      mount(
        <SingleRule
          id={3}
          left={false}
          center={true}
          right={true}
          result={true}
          onClick={rulesDisplay.onClick}
        />
      )
    );

    expect(mount(rulesDisplay.createSingleRule(7, false))).toEqual(
      mount(
        <SingleRule
          id={7}
          left={true}
          center={true}
          right={true}
          result={false}
          onClick={rulesDisplay.onClick}
        />
      )
    );
  });

  it("Gives IDs for each single rule", () => {
    var wrapper = shallow(<RulesDisplay rule={5} />);

    expect(
      wrapper.find("SingleRule").map(element => element.prop("id"))
    ).toEqual([7, 6, 5, 4, 3, 2, 1, 0]);
  });

  it("Sets onClicks for each single rule", () => {
    const wrapper = shallow(<RulesDisplay rule={5} />);
    const onClick = wrapper.instance().onClick;

    expect(onClick).toBeDefined();
    expect(
      wrapper
        .find("SingleRule")
        .reduce(
          (current, rule) => current && rule.prop("onClick") == onClick,
          true
        )
    ).toBeTruthy();
  });
});

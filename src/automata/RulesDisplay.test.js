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

    expect(
      mount(rulesDisplay.createSingleRule(0, false)).containsMatchingElement(
        <SingleRule
          id={0}
          left={false}
          center={false}
          right={false}
          result={false}
        />
      )
    ).toBeTruthy();

    expect(
      mount(rulesDisplay.createSingleRule(1, false)).containsMatchingElement(
        <SingleRule
          id={1}
          left={false}
          center={false}
          right={true}
          result={false}
        />
      )
    ).toBeTruthy();

    expect(
      mount(rulesDisplay.createSingleRule(3, true)).containsMatchingElement(
        <SingleRule
          id={3}
          left={false}
          center={true}
          right={true}
          result={true}
        />
      )
    ).toBeTruthy();

    expect(
      mount(rulesDisplay.createSingleRule(7, false)).containsMatchingElement(
        <SingleRule
          id={7}
          left={true}
          center={true}
          right={true}
          result={false}
        />
      )
    ).toBeTruthy();
  });

  it("Gives IDs for each single rule", () => {
    var wrapper = shallow(<RulesDisplay rule={5} />);

    expect(
      wrapper.find("SingleRule").map(element => element.prop("id"))
    ).toEqual([7, 6, 5, 4, 3, 2, 1, 0]);
  });

  it("Sets onClicks for each single rule", () => {
    const wrapper = shallow(<RulesDisplay rule={5} />);
    const onClick = wrapper.instance().calculateAndSendNewRule;

    expect(onClick).toBeDefined();

    expect(
      wrapper
        .find("SingleRule")
        .reduce(
          (current, rule) => current && rule.prop("onClick") !== undefined,
          true
        )
    ).toBeTruthy();
  });

  it("onClick calls the onClick prop method when called with correct new rule", () => {
    const onClick = jest.fn();

    var wrapper = shallow(<RulesDisplay rule={5} onClick={onClick} />);

    // do the click
    wrapper.instance().calculateAndSendNewRule(1, true);

    // rule 5 + bit 1 = rule 7
    expect(onClick).toHaveBeenLastCalledWith(7);

    wrapper.instance().calculateAndSendNewRule(0, false);
    // rule 5 - bit 0 = rule 4
    expect(onClick).toHaveBeenLastCalledWith(4);
  });
});

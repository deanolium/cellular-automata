import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RulesDisplay from "./RulesDisplay";
import SingleRule from "./SingleRule";

Enzyme.configure({ adapter: new Adapter() });

describe("Rules Display", () => {
  it("Displays eight single rules for the given rule id");

    expect(
      mount(<RulesDisplay rule={0} />).matchesElement(expectedOutput)
    ).toBeTruthy();
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
        <SingleRule left={false} center={false} right={false} result={false} />
      )
    );

    expect(mount(rulesDisplay.createSingleRule(1, false))).toEqual(
      mount(
        <SingleRule left={false} center={false} right={true} result={false} />
      )
    );

    expect(mount(rulesDisplay.createSingleRule(3, true))).toEqual(
      mount(
        <SingleRule left={false} center={true} right={true} result={true} />
      )
    );

    expect(mount(rulesDisplay.createSingleRule(7, false))).toEqual(
      mount(
        <SingleRule left={true} center={true} right={true} result={false} />
      )
    );
  });
});

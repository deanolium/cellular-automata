import React from "react";
import ReactDOM from "react-dom";
import SingleRule from "./SingleRule";
import { shallow, mount } from "enzyme";

describe("Single Rule Display", () => {
  it("Should run without crashing", () => {
    const ruleDisp = shallow(
      <SingleRule left={true} centre={false} right={true} result={false} />
    );
    expect(ruleDisp).toBeDefined();
  });

  it("Should display the rule and the result", () => {
    const ruleDisplay = mount(
      <SingleRule left={true} centre={false} right={true} result={false} />
    );

    // we expect to have the boxes
    expect(ruleDisplay.find("div.rulebox.left")).toHaveLength(1);
    expect(ruleDisplay.find("div.rulebox.right")).toHaveLength(1);
    expect(ruleDisplay.find("div.rulebox.center")).toHaveLength(1);
    expect(ruleDisplay.find("div.rulebox.result")).toHaveLength(1);
  });

  it("Should display the right classes for the rules and their result", () => {
    const ruleDisplay = mount(
      <SingleRule left={true} centre={false} right={true} result={false} />
    );

    expect(
      ruleDisplay.find("div.rulebox.left").hasClass("active")
    ).toBeTruthy();
    expect(
      ruleDisplay.find("div.rulebox.right").hasClass("active")
    ).toBeTruthy();
    expect(
      ruleDisplay.find("div.rulebox.center").hasClass("inactive")
    ).toBeTruthy();
    expect(
      ruleDisplay.find("div.rulebox.result").hasClass("inactive")
    ).toBeTruthy();
  });
});

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";

describe("Automata App", () => {
  it("renders without crashing", () => {
    const appWrapper = shallow(<App />);
  });

  describe("Automata Logic", () => {
    it("runs rules correctly", () => {
      const app = new App();

      //run some rules that we expect
      expect(app.checkRule(1, 0, 0, 0)).toBeTruthy();
      expect(app.checkRule(1, 0, 1, 0)).toBeFalsy();
      expect(app.checkRule(30, 1, 0, 0)).toBeTruthy();
      expect(app.checkRule(30, 1, 0, 1)).toBeFalsy();
    });

    it("generates row based on rule correctly", () => {
      const app = new App();

      const rule30 = app.generateNewRowFromRuleIdAndData.bind(app, 30);
      const rule90 = app.generateNewRowFromRuleIdAndData.bind(app, 90);

      expect(rule30([1, 1, 1])).toEqual([false, false, false]);
      expect(rule30([1, 0, 1])).toEqual([false, false, true]);
      expect(rule30([1, 0, 1, 1, 0])).toEqual([
        true,
        false,
        true,
        false,
        false
      ]);

      expect(rule90([1, 1, 1])).toEqual([false, false, false]);
      expect(rule90([1, 0, 1])).toEqual([true, false, true]);
      expect(rule90([1, 0, 1, 1, 0])).toEqual([
        false,
        false,
        true,
        true,
        false
      ]);
    });
  });

  describe("State changes", () => {
    var app;

    beforeEach(() => {
      const appwrapper = shallow(<App />);
      app = appwrapper.instance();
    });

    it("play sets play state", () => {
      app.play();
      expect(app.state.paused).toBeFalsy();
    });

    it("pause stops play state", () => {
      app.pause();
      expect(app.state.paused).toBeTruthy();
    });

    it("next stops play state and increments rule id", () => {
      app.setState({ ruleId: 20, paused: false });
      app.next();
      expect(app.state.paused).toBeTruthy();
      expect(app.state.ruleId).toEqual(21);
    });

    it("prev stops play state and decrements rule id", () => {
      app.setState({ ruleId: 20, paused: false });
      app.prev();
      expect(app.state.paused).toBeTruthy();
      expect(app.state.ruleId).toEqual(19);
    });

    it("allows rule id to be changed directly", () => {
      app.setState({ ruleId: 20, paused: false });
      expect(app.state.ruleId).toEqual(20);
      app.changeRule(12);
      expect(app.state.ruleId).toEqual(12);
    });
  });
});

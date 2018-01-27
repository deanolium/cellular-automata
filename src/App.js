import React, { Component } from "react";
import "./App.css";
import Row from "./automata/Row";
import EditableLabel from "./misc/EditableLabel";

class App extends Component {
  _rows = [];
  numCells = 100;
  numRows = 50;

  constructor() {
    super();
    this.state = {
      ruleId: 0,
      paused: true,
      funky: false
    };
  }

  setupRandomRow() {
    return [...Array(this.numCells)].map(
      () => Math.floor(Math.random() * 2) === 0
    );
  }

  checkRule(id, left, cur, right) {
    var dataBits = (left ? 4 : 0) + (cur ? 2 : 0) + (right ? 1 : 0);

    if (((1 << dataBits) & id) !== 0) {
      return true;
    } else {
      return false;
    }
  }

  generateNewRowFromRuleIdAndData(ruleId, prevData) {
    return prevData.map((cell, i) => {
      if (i === 0) {
        return this.checkRule(
          ruleId,
          prevData[prevData.length - 1],
          cell,
          prevData[i + 1]
        );
      }

      if (i === prevData.length - 1) {
        return this.checkRule(ruleId, prevData[i - 1], cell, prevData[0]);
      }

      return this.checkRule(ruleId, prevData[i - 1], cell, prevData[i + 1]);
    });
  }

  componentWillMount() {
    this._rows = [];
    this._rows[0] = this.setupRandomRow();

    setInterval(() => {
      if (!this.state.paused) {
        this.setState({
          ruleId: this.state.ruleId + 1
        });
      }
    }, 100);
  }

  pause() {
    this.setState({
      paused: true
    });
  }

  play() {
    this.setState({
      paused: false
    });
  }

  back() {
    this.setState({
      paused: true,
      ruleId: this.state.ruleId - 1
    });
  }

  next() {
    this.setState({
      paused: true,
      ruleId: this.state.ruleId + 1
    });
  }

  startFunk() {
    console.log("lots of funk");
    this.setState({
      funky: true
    });
  }

  stopFunk() {
    console.log("no funk");
    this.setState({
      funky: false
    });
  }

  rerandomize() {
    this._rows[0] = this.setupRandomRow();
    this.forceUpdate();
  }

  render() {
    var funky_btn, i;

    if (this.state.funky) {
      for (i = 1; i < this.numRows; ++i) {
        this._rows[i] = this.generateNewRowFromRuleIdAndData(
          this.state.ruleId + i - 1,
          this._rows[i - 1]
        );
      }
      funky_btn = <div onClick={this.stopFunk.bind(this)}>No Funky</div>;
    } else {
      for (i = 1; i < this.numRows; ++i) {
        this._rows[i] = this.generateNewRowFromRuleIdAndData(
          this.state.ruleId,
          this._rows[i - 1]
        );
      }
      funky_btn = <div onClick={this.startFunk.bind(this)}>Funky</div>;
    }

    //set up the controls
    var play_pause_btn = !this.state.paused ? (
      <div onClick={this.pause.bind(this)}>Pause</div>
    ) : (
      <div onClick={this.play.bind(this)}>Play</div>
    );

    return (
      <div className="App">
        <h1>
          Rule Id:
          <EditableLabel
            initialValue={this.state.ruleId}
            save={value => {
              var iValue = parseInt(value);
              this.setState({ ruleId: iValue });
            }}
          />
        </h1>
        <div className="controls">
          <div onClick={this.back.bind(this)}>Prev</div>
          {play_pause_btn}
          <div onClick={this.next.bind(this)}>Next</div>
          {funky_btn}
          <div onClick={this.rerandomize.bind(this)}>Randomize</div>
        </div>
        {this._rows.map(data => {
          return <Row states={JSON.stringify(data)} />;
        })}
      </div>
    );
  }
}

export default App;

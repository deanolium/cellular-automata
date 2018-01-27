/**
 * EditableLabel
 *
 * A React Component which displays a label text until you edit it,
 * in which case, it then turns into an input tag
 *
 * Based on the code in this codepen: https://codepen.io/dbrowne/pen/JKjKgN By David Browne
 *
 * @author David Browne
 * @author Deano License <deanolium@gmail.com>
 */
import React, { Component } from "react";
import "./EditableLabel.css";

class EditableLabel extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      text: ""
    };
  }

  componentWillMount() {
    this.setState({
      text: this.props.initialValue
    });
  }

  labelClicked() {
    this.setState({ editing: true });
  }

  textChanged() {
    this.setState({ text: this.refs.textInput.value });
  }

  inputLostFocus() {
    this.setState({ editing: false });
    this.props.save(this.state.text);
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      this.inputLostFocus();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.hasOwnProperty("initialValue"))
      this.setState({ text: newProps.initialValue });
  }

  render() {
    if (this.state.editing)
      return (
        <input
          ref="textInput"
          type="text"
          onChange={this.textChanged.bind(this)}
          onBlur={this.inputLostFocus.bind(this)}
          onKeyPress={this.keyPressed.bind(this)}
          value={this.state.text}
          autoFocus
        />
      );

    return <div onClick={this.labelClicked.bind(this)}>{this.state.text}</div>;
  }
}

export default EditableLabel;

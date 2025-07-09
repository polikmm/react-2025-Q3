import { Component } from "react";
import type { ButtonProps } from "../../types/ButtonProps";

export class Button extends Component<ButtonProps> {
  render () {
    return (<button onClick={this.props.onClick}>{this.props.text}</button>);
  }
}
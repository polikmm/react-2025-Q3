import { Component } from "react";
import type { InputFieldProps } from "../../types/InputFieldProps";

export class InputField extends Component<InputFieldProps> {
  render() {
    return (<input type="text" value={this.props.value} onChange={this.props.onChange} placeholder={this.props.placeholder}/>);
  }
}
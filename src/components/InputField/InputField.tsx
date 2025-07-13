import { Component } from 'react';
import type { InputFieldProps } from '../../types/InputFieldProps';
import styles from './styles.module.css';
export class InputField extends Component<InputFieldProps> {
  render() {
    return (
      <input
        className={styles.input}
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}

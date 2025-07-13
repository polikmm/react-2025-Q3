import { Component, type ChangeEvent } from 'react';
import { InputField } from '../InputField/InputField';
import type { SearchBarProps } from '../../types/SearchBarProps';
import { Button } from '../Button/Button';

export class SearchBar extends Component<SearchBarProps> {
  constructor(props: SearchBarProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.props.onChange(event.target.value);
  }

  handleSearch() {
    this.props.onSearch();
  }

  render() {
    return (
      <>
        <InputField
          value={this.props.value}
          onChange={this.handleInputChange}
          placeholder="ditto"
        />
        <Button onClick={this.handleSearch} text="search" />
      </>
    );
  }
}

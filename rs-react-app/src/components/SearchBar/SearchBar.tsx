import { Component, type ChangeEvent } from "react";
import { InputField } from "../InputField/InputField";
import type { SearchBarProps } from "../../types/SearchBarProps";
import type { SearchBarState } from "../../types/SearchBarState";
import { Button } from "../Button/Button";

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { query: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  };

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ query: event?.target.value });
  }

  handleSearch() {
    this.props.onSearch(this.state.query);
  }

  render() {
    return (<>
      <InputField value={this.state.query} onChange={this.handleInputChange} placeholder="ditto" />
      <Button onClick={this.handleSearch} text="search"/>
    </>
    );
  }
}
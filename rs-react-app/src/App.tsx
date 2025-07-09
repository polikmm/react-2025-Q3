import { Component } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar/SearchBar'
import type { AppState } from './types/AppState'

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      prevQuery: "",
      prevFilteredData: [],
      filteredData: []
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query: string) {



    
    this.setState({ prevQuery: query, prevFilteredData: , filteredData: });
  }

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
      </div>
    )
  }
}

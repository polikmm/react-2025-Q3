import { Component } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar/SearchBar'
import { CardList } from './components/CardList/CardList';
import { getData } from './api/getData';
import type { AppState } from './types/AppState';
import { getPokemon } from './api/getPokemon';

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      data: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  async handleSearch() {
    const prevQuery = localStorage.getItem("query");
    let data;
    if (prevQuery) {
      data = await getPokemon(prevQuery);
      this.setState({ data: [data] });
    } else {
      data = await getData();
      this.setState({ data: data });
    }
  }

  async componentDidMount() {
    await this.handleSearch()
  }

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        <CardList data={this.state.data} />
      </div>
    )
  }
}

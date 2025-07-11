import { Component, Suspense, lazy } from 'react';
import './App.css'
import { SearchBar } from './components/SearchBar/SearchBar'

import { getData } from './api/getData';
import type { AppState } from './types/AppState';
import { getPokemon } from './api/getPokemon';

const LazyComponent = lazy(() => import("./components/CardList/CardList"));
export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      data: [],
      prevQuery: "",
      query: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange(newQuery: string) {
    this.setState({ query: newQuery });
  }

  async handleSearch() {
    const query = this.state.query.trim().toLowerCase();
    localStorage.setItem("query", query);

    let data;
    if (query) {
      data = await getPokemon(query);
      this.setState({ data: [data], prevQuery: query });
    } else {
      data = await getData();
      this.setState({ data });
    }
  }

  async componentDidMount() {
    await this.handleSearch()
  }

  render() {
    return (
      <div>
        <header className='header'>
          <SearchBar
            value={this.state.query}
            onChange={this.handleQueryChange}
            onSearch={this.handleSearch}
          />
        </header>
        <Suspense fallback={<div>Загрузка компонента...</div>}>
          <LazyComponent data={this.state.data} />
        </Suspense>
      </div>
    )
  }
}

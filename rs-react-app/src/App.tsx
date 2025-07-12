import { Component, Suspense, lazy } from 'react';
import './App.css'
import { SearchBar } from './components/SearchBar/SearchBar'

import { getData } from './api/getData';
import type { AppState } from './types/AppState';
import { getPokemon } from './api/getPokemon';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Button } from './components/Button/Button';

const LazyComponent = lazy(() => import("./components/CardList/CardList"));
export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      data: [],
      prevQuery: "",
      query: "",
      error: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange(newQuery: string) {
    this.setState({ query: newQuery });
  }

  async handleSearch() {

    try {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        console.log(error)
        this.setState({ error: error.message });
      } else {
        console.error("Unknown error:", error);
        this.setState({ error: "Unknown error" });
      }
    }
  }

async componentDidMount() {
  const savedQuery = localStorage.getItem("query") || "";
  this.setState({ query: savedQuery }, async () => {
    await this.handleSearch();
  });
}

  render() {
    return (
      <ErrorBoundary>
        <header className='header'>
          <SearchBar
            value={this.state.query}
            onChange={this.handleQueryChange}
            onSearch={this.handleSearch}
          />
        </header>
        {this.state.error ? (
          <div className="error">{this.state.error}
            <Button onClick={() => this.setState({ error: "" })} text="reset error" />
          </div>

        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent
              data={this.state.data}
              handleThrowError={() => this.setState({ error: "test error" })}
            />
          </Suspense>
        )}
      </ErrorBoundary>
    )
  }
}

import { Component, Suspense, lazy } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { getData } from '../../api/getData';
import type { AppState } from '../../types/AppState';
import { getPokemon } from '../../api/getPokemon';

const LazyComponent = lazy(() => import('../CardList/CardList'));
export default class Container extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: [],
      prevQuery: '',
      query: '',
      error: '',
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
      localStorage.setItem('query', query);

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
        console.error('Error:', error.message);
        console.log(error);
        this.setState({ error: error.message });
      } else {
        console.error('Unknown error:', error);
        this.setState({ error: 'Unknown error' });
      }
    }
  }

  componentDidMount() {
    const savedQuery = localStorage.getItem('query') || '';
    this.setState({ query: savedQuery }, async () => {
      this.handleSearch();
    });
  }

  render() {
    if (this.state.error.length > 0) throw new Error();
    return (
      <div data-testid="container">
        <header className="header">
          <SearchBar
            value={this.state.query}
            onChange={this.handleQueryChange}
            onSearch={this.handleSearch}
          />
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent
            data={this.state.data}
            handleThrowError={() => this.setState({ error: 'test error' })}
          />
        </Suspense>
      </div>
    );
  }
}

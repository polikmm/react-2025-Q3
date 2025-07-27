import { Suspense, lazy, useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { getData } from '../../api/getData';
import { getPokemon } from '../../api/getPokemon';
import type { CardItem } from '../../types/CardItem';
import { Outlet, useNavigate, useParams, useMatch } from 'react-router-dom';
import { Button } from '../Button/Button';
import { useLS } from '../../customHooks/useLS';
import './style.css';

const LazyComponent = lazy(() => import('../CardList/CardList'));
export default function Main() {
  const [data, setData] = useState<CardItem[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(page || '1', 10));
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const detailsMatch = useMatch('/page/:page/details/:id');
  const [storedValue, setStoredValue] = useLS('query', '');

  useEffect(() => {
    const savedQuery = storedValue || '';
    setQuery(savedQuery);
    handleSearch(savedQuery, currentPage);
  }, []);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSearch = async (query: string, page: number = 1) => {
    setLoading(true);

    try {
      const currentQuery = query.trim().toLowerCase();
      setStoredValue(currentQuery);

      if (currentQuery) {
        const result = await getPokemon(currentQuery);
        setData([result]);
      } else {
        const result = await getData(page);
        setCurrentPage(page);
        setData(result);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error:', err.message);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <div
      className="main"
      data-testid="main"
      onClick={() => navigate(`/page/${page}`)}
    >
      <div className="leftSide">
        <header className="header">
          <SearchBar
            value={query}
            onChange={handleQueryChange}
            onSearch={() => handleSearch(query)}
          />
        </header>

        {isLoading ? (
          <div
            style={{
              minHeight: '700px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Loading...
          </div>
        ) : (
          <Suspense
            fallback={
              <div
                style={{
                  minHeight: '700px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Loading...
              </div>
            }
          >
            <LazyComponent
              data={data}
              handleThrowError={() => setError('test error')}
              onSearch={handleSearch}
              page={currentPage}
            />
          </Suspense>
        )}
      </div>
      {detailsMatch && (
        <div className="rightSide">
          <Outlet />
        </div>
      )}
      <Button
        className="author-button"
        onClick={() => navigate('/about')}
        text="about author"
      />
    </div>
  );
}

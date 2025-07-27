import { useNavigate } from 'react-router-dom';
import type { PaginationProps } from '../../types/PaginationProps';
import { Button } from '../Button/Button';
import './style.css';

export function Pagination({ onSearch, page }: PaginationProps) {
  const navigate = useNavigate();
  const handlePrevSearch = () => {
    const prevPage = Math.max(page - 1, 1);
    onSearch('', prevPage);
    navigate(`/page/${prevPage}`);
  };
  const handleNextSearch = () => {
    onSearch('', page + 1);
    navigate(`/page/${page + 1}`);
  };
  return (
    <div className="pagination" data-testid="pagination">
      <Button
        className="pagination_arrow"
        onClick={handlePrevSearch}
        text="&larr;"
      />
      <span>page {page}</span>
      <Button
        className="pagination_arrow"
        onClick={handleNextSearch}
        text="&rarr;"
      />
    </div>
  );
}

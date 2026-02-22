import '../SearchForm/searchForm.css';

function SearchForm({ searchQuery, onSearchChange }) {
  return (
    <div className="searchForm">
      <input
        type="text"
        className="searchForm__input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchForm;

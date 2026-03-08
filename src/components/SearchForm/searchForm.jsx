import '../SearchForm/searchForm.css';
import '../CommunityRecipes/communityRecipes.css';

function SearchForm({ searchQuery, onSearchChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <div className="searchForm">
      <input
        type="text"
        className="searchForm__input community-recipes__search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        // onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchForm;

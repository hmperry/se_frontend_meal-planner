import '../SearchForm/searchForm.css';
import '../CommunityRecipes/communityRecipes.css';

function SearchForm({
  searchQuery,
  onSearchChange,
  onSearch,
  placeholder = 'Search...',
}) {
  return (
    <div className="searchForm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <input
          type="text"
          className="searchForm__input community-recipes__search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button type="submit" className="searchForm__btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;

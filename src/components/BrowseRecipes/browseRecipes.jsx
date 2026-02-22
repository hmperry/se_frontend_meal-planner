import { useState } from 'react';

import PageHeading from '../PageHeading/pageHeading';
import RecipeCard from '../RecipeCard/recipeCard';
import SearchForm from '../SearchForm/searchForm';
import { defaultMeals } from '../../utils/dummyData';

import './browseRecipes.css';
import RecipeListItem from '../RecipeListItem/recipeListItem';
import ViewToggle from '../ViewToggle/viewToggle';

function BrowseRecipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('cards');

  const filteredRecipes = defaultMeals.filter((item) =>
    item.recipe.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="browse-recipes">
      <PageHeading>Browse Recipes</PageHeading>
      <div className="browse-recipes__top-info">
        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          className="browse-recipes__search"
        />
        {/* <div className="searchForm">
          { <input
          type="text"
          className="searchForm__input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />}
        </div> */}

        <ViewToggle viewType={viewType} onViewChange={setViewType} />
      </div>
      {viewType === 'cards' ? (
        <ul className="recipeCards__list-tiles">
          {filteredRecipes.map((item) => {
            return <RecipeCard key={item._id} item={item} />;
          })}
        </ul>
      ) : (
        <ul className="recipeCards__list-list">
          {filteredRecipes.map((item) => {
            return <RecipeListItem key={item._id} item={item} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default BrowseRecipes;

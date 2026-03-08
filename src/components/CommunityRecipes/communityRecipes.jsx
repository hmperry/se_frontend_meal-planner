import { useState, useEffect, useContext } from 'react';

import PageHeading from '../PageHeading/pageHeading';
import RecipeCard from '../RecipeCard/RecipeCard';
import SearchForm from '../SearchForm/searchForm';
import { defaultMeals } from '../../utils/dummyData';
import { getRecipes } from '../../utils/FatSecretAPI.js';

import './communityRecipes.css';
import RecipeListItem from '../RecipeListItem/recipeListItem';
import ViewToggle from '../ViewToggle/viewToggle';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/preloader.jsx';

function CommunityRecipes({ handleCardClick }) {
  const [viewType, setViewType] = useState('cards');

  const [isLoading, setIsLoading] = useState(false); // ✅ loading state
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // ✅ controls recipe visibility

  const {
    communitySearchQuery,
    setCommunitySearchQuery,
    communityRecipes,
    setCommunityRecipes,
  } = useContext(CurrentUserContext);

  // ✅ delay showing recipes after loading finishes
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // ✅ adjust delay in ms
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false); // ✅ hide recipes while loading
    }
  }, [isLoading]);

  useEffect(() => {
    if (!communitySearchQuery.trim()) {
      setCommunityRecipes([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
      getRecipes(communitySearchQuery)
        .then((data) => {
          setCommunityRecipes(data.recipes?.recipe || []);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to fetch recipes. Please try again.');
        })
        .finally(() => setIsLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [communitySearchQuery]); // Cleanup on query change or unmount

  // const filteredRecipes = defaultMeals.filter((item) =>
  //   item.recipe.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="community-recipes">
      <PageHeading>Community Recipes</PageHeading>
      <div className="community-recipes__top-info">
        <SearchForm
          searchQuery={communitySearchQuery}
          onSearchChange={setCommunitySearchQuery}
          className="community-recipes__search"
        />

        <ViewToggle viewType={viewType} onViewChange={setViewType} />
      </div>
      {isLoading ? (
        <Preloader className="community-recipes__preloader" />
      ) : isVisible ? (
        <>
          {error && <p className="community-recipes__status">{error}</p>}

          {viewType === 'cards' ? (
            <ul className="recipeCards__list-tiles">
              {communityRecipes.map((item) => {
                return (
                  <RecipeCard
                    key={item.recipe_id}
                    item={item}
                    onCardClick={handleCardClick}
                    appPageVariant="community"
                  />
                );
              })}
            </ul>
          ) : (
            <ul className="recipeCards__list-list">
              {communityRecipes.map((item) => {
                return <RecipeListItem key={item.recipe_id} item={item} />;
              })}
            </ul>
          )}
        </>
      ) : null}
    </div>
  );
}

export default CommunityRecipes;

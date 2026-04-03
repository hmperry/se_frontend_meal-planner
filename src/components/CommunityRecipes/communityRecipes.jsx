import { useState, useEffect, useContext, useRef } from 'react';

import PageHeading from '../PageHeading/pageHeading';
import RecipeCard from '../RecipeCard/RecipeCard';
import SearchForm from '../SearchForm/searchForm';
import { defaultMeals } from '../../utils/dummyData';
import { getRecipes, getDinners } from '../../utils/FatSecretAPI.js';

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
  const pageRef = useRef(0);
  const [hasMore, setHasMore] = useState(true);

  const [isVisible, setIsVisible] = useState(true); // ✅ controls recipe visibility

  const {
    communitySearchQuery,
    setCommunitySearchQuery,
    communityRecipes,
    setCommunityRecipes,
  } = useContext(CurrentUserContext);

  // reset page when search query changes
  useEffect(() => {
    pageRef.current = 0;
    setHasMore(true);
  }, [communitySearchQuery]);

  // Load more recipes
  const handleLoadMore = () => {
    console.log('handleLoadMore fired, page:', page);
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;
    console.log('nextPage:', nextPage, 'pageRef.current:', pageRef.current);
    // setPage(nextPage);
    setIsLoading(true);

    const fetcher = communitySearchQuery.trim()
      ? getRecipes(communitySearchQuery, nextPage)
      : getDinners(nextPage);

    fetcher
      .then((data) => {
        console.log('load more data:', data);
        console.log('new recipes count:', data.recipes?.recipe?.length);
        console.log(
          'first new recipe:',
          data.recipes?.recipe?.[0]?.recipe_name
        );
        console.log('total results:', data.recipes?.total_results);
        const newRecipes = data.recipes?.recipe || [];
        const totalResults = data.recipes?.total_results;
        setCommunityRecipes((prev) => {
          const existingIds = new Set(prev.map((r) => r.recipe_id));
          const uniqueNew = newRecipes.filter(
            (r) => !existingIds.has(r.recipe_id)
          );
          const updated = [...prev, ...uniqueNew];
          setHasMore(updated.length < totalResults);
          return updated;
        });
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load more recipes.');
      })
      .finally(() => setIsLoading(false));
  };

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

  // Load dinner recipes on initial load of Community Recipes page
  useEffect(() => {
    if (communityRecipes.length > 0) return;

    setIsLoading(true);
    getDinners()
      .then((data) => {
        setCommunityRecipes(data.recipes?.recipe || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch dinner recipes. Please try again.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Search recipes based on user query
  useEffect(() => {
    if (!communitySearchQuery.trim()) {
      // setCommunityRecipes([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
      getRecipes(communitySearchQuery)
        .then((data) => {
          console.log('total recipes:', data.recipes?.total_results);
          console.log('recipes returned:', data.recipes?.recipe?.length);
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
      <div className="community-recipes__top-info">
        <SearchForm
          searchQuery={communitySearchQuery}
          onSearchChange={setCommunitySearchQuery}
          className="community-recipes__search"
        />

        {/* <ViewToggle viewType={viewType} onViewChange={setViewType} /> */}
      </div>

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

      {hasMore && !isLoading && communityRecipes.length > 0 && (
        <button
          className="community-recipes__load-more"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}

      {isLoading && <Preloader className="community-recipes__preloader" />}
    </div>
  );
}

export default CommunityRecipes;

import PageHeading from '../PageHeading/pageHeading';
import RecipeCard from '../RecipeCard/recipeCard';
import { defaultMeals } from '../../utils/dummyData';
import { SquarePen, CirclePlus } from 'lucide-react';

import { useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import './MyRecipes.css';

function MyRecipes({
  recipeCards,
  handleCardClick,
  closeActiveModal,
  handleLikeClick,
  likedCards,
}) {
  const { openAddRecipeModal, myRecipes } = useContext(CurrentUserContext);

  return (
    <div className="my-recipes">
      <h2 className="my-recipes__title">My Saved Recipe Collection</h2>
      <p className="my-recipes__text-description">
        Save recipes from the Community or add your own personal recipes using
        the button below.
      </p>
      <div className="my-recipes__button-set">
        <button
          className="my-recipes__button personal"
          onClick={openAddRecipeModal}
        >
          <SquarePen className="my-recipes__button_icon " />
          Add Personal Recipes
        </button>
        {/* <button className="my-recipes__button circle">
          <CirclePlus className="my-recipes__button_icon " />
          Add Community Recipes
        </button> */}
      </div>

      <ul className="recipeCards__list-tiles">
        {myRecipes.map((item) => {
          return (
            <RecipeCard
              key={item.id || item.recipe_id}
              item={item}
              onCardClick={handleCardClick}
              onCloseClick={closeActiveModal}
              // onLikeClick={handleLikeClick}
              // likedCards={likedCards}
              appPageVariant="myRecipes"
            />
          );
        })}
      </ul>
    </div>
  );
}

export default MyRecipes;

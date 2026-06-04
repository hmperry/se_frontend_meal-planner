import PageHeading from '../PageHeading/PageHeading';
import RecipeCard from '../RecipeCard/RecipeCard';
import { defaultMeals } from '../../utils/DummyData';
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
    <section className="my-recipes">
      <h2 className="my-recipes__title">My Saved Recipe Collection</h2>
      <p className="my-recipes__text-description">
        Save recipes from the Community or add your own personal recipes using
        the button below.
      </p>
      <div className="my-recipes__button-set">
        <button
          className="my-recipes__button my-recipes__button--personal"
          onClick={openAddRecipeModal}
        >
          <SquarePen className="my-recipes__button-icon " />
          Add Personal Recipes
        </button>
      </div>

      <ul className="my-recipes__cards--tiles my-recipes__card-container">
        {myRecipes.map((item) => {
          return (
            <RecipeCard
              key={item.id || item.recipe_id}
              item={item}
              onCardClick={handleCardClick}
              onCloseClick={closeActiveModal}
              appPageVariant="myRecipes"
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MyRecipes;

import '../RecipeCard/RecipeCard.css';
// import { defaultMeals } from '../../utils/dummyData';
import { Trash2, Heart, CirclePlus, CircleCheck } from 'lucide-react';
import { useContext, useState } from 'react';
import Like from '../Like/like';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function RecipeCard({
  item,
  onCardClick,
  onCloseClick,
  onLikeClick,
  likedCards,
  appPageVariant,
}) {
  const { addToMyRecipes, myRecipes } = useContext(CurrentUserContext);

  const isAdded = myRecipes.some((r) => r.recipe_id === item.recipe_id);
  const handleClick = () => {
    onCardClick(item);
  };
  return (
    <li className="recipeCard__container">
      <div className="recipeCard__tile">
        <div className="recipeCard__top-info">
          <h3
            className="recipeCard__heading"
            alt={item.recipe_name}
            title={item.recipe_name}
          >
            {item.recipe_name}
          </h3>
          {appPageVariant === 'myRecipes' && (
            <Like
              className="recipeCard__top-icon"
              item={item}
              likedCards={likedCards}
              onLikeClick={onLikeClick}
            />
          )}
          {appPageVariant === 'community' &&
            (isAdded ? (
              <CircleCheck className="recipeCard__top-icon recipeCard__added" />
            ) : (
              <CirclePlus
                className="recipeCard__top-icon recipeCard__add"
                onClick={() => addToMyRecipes(item)}
              />
            ))}
        </div>
        {appPageVariant === 'myRecipes' ? (
          <Trash2 className="recipeCard__delete" />
        ) : null}
        <img
          src={item.recipe_image}
          alt=""
          className="recipeCard__image"
          onClick={handleClick}
        />
      </div>
    </li>
  );
}

export default RecipeCard;

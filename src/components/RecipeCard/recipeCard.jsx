import '../RecipeCard/RecipeCard.css';
import { defaultMeals } from '../../utils/dummyData';
import { Trash2, Heart, CirclePlus } from 'lucide-react';
import { useContext, useState } from 'react';
import Like from '../Like/like';

function RecipeCard({
  item,
  onCardClick,
  onCloseClick,
  onLikeClick,
  likedCards,
  appPageVariant,
}) {
  const handleClick = () => {
    onCardClick(item);
  };
  return (
    <li className="recipeCard__container">
      <div className="recipeCard__tile">
        <div className="recipeCard__top-info">
          <h3
            className="recipeCard__heading"
            alt={item.recipe}
            title={item.recipe}
          >
            {item.recipe}
          </h3>
          {appPageVariant === 'myRecipes' && (
            <Like
              className="recipeCard__like"
              item={item}
              likedCards={likedCards}
              onLikeClick={onLikeClick}
            />
          )}
          {appPageVariant === 'community' && (
            <CirclePlus className="recipeCard__like" />
          )}
        </div>
        {appPageVariant === 'myRecipes' ? (
          <Trash2 className="recipeCard__delete" />
        ) : null}
        <img
          src={item.link}
          alt=""
          className="recipeCard__image"
          onClick={handleClick}
        />
      </div>
    </li>
  );
}

export default RecipeCard;

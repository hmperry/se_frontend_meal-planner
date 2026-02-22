import '../RecipeCard/RecipeCard.css';
import { defaultMeals } from '../../utils/dummyData';
import { Trash2, Heart } from 'lucide-react';
import { useContext, useState } from 'react';

function RecipeCard({ item, onCardClick, onCloseClick }) {
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
          <Heart className="recipeCard__like" />
        </div>
        <Trash2 className="recipeCard__delete" />
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

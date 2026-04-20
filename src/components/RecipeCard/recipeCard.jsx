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
  const { addToMyRecipes, myRecipes, deleteFromMyRecipes } =
    useContext(CurrentUserContext);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  const isAdded = myRecipes.some((r) => r.id === item.id);
  const handleClick = () => {
    onCardClick(item);
  };
  return (
    <li className="recipeCard__container">
      <div className="recipeCard__tile" onClick={handleClick}>
        <div className="recipeCard__top-info">
          <h3
            className="recipeCard__heading"
            alt={item.title}
            title={item.title}
          >
            {item.title}
          </h3>

          {appPageVariant === 'community' &&
            (isAdded ? (
              <CircleCheck
                className="recipeCard__top-icon recipeCard__added"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFromMyRecipes(item);
                }}
              />
            ) : (
              <div
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    visible: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                  });
                }}
                onMouseLeave={() => setTooltip({ visible: false, x: 0, y: 0 })}
              >
                <CirclePlus
                  className="recipeCard__top-icon recipeCard__add"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToMyRecipes(item);
                  }}
                />
                {tooltip.visible && (
                  <div
                    className="recipeCard__tooltip"
                    style={{ top: tooltip.y - 36, left: tooltip.x }}
                  >
                    Add to my recipe collection
                  </div>
                )}
              </div>
            ))}
        </div>
        {appPageVariant === 'myRecipes' ? (
          <Trash2
            className="recipeCard__delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteFromMyRecipes(item);
            }}
          />
        ) : null}
        {item.image ? (
          <img src={item.image} alt="" className="recipeCard__image" />
        ) : (
          <div className="recipeCard__no-image">
            <p className="recipeCard__no-image-text">Photo not available</p>
          </div>
        )}
      </div>
    </li>
  );
}

export default RecipeCard;

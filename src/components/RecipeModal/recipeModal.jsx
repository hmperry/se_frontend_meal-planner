import '../RecipeModal/recipeModal.css';
import '../RecipeCard/recipeCard.css';

import { Trash2, Heart, X, CirclePlus, CircleCheck } from 'lucide-react';
import Like from '../Like/like';
import { useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function RecipeModal({
  activeModal,
  selectedCard,
  closeActiveModal,
  handleLikeClick,
  likedCards,
}) {
  const { addToMyRecipes, myRecipes, deleteFromMyRecipes } =
    useContext(CurrentUserContext);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  const isAdded = myRecipes.some(
    (r) => r.recipe_id === selectedCard?.recipe_id
  );

  return (
    <div
      className={`recipeModal ${activeModal === 'preview' ? 'recipeModal__open' : ''}`}
      onClick={closeActiveModal}
    >
      <div
        className="recipeModal__preview"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close modal__close-preview">
          <X className="modal__close" onClick={closeActiveModal} />
        </button>
        <h3 className="recipeModal__heading">{selectedCard.recipe_name}</h3>

        <div className="recipeModal__top-info">
          {isAdded ? (
            <>
              <CircleCheck className="recipeModal__top-icon recipeModal__added" />
              <Trash2
                className="recipeModal__delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFromMyRecipes(selectedCard);
                }}
              />
            </>
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
                className="recipeModal__top-icon recipeModal__add"
                onClick={(e) => {
                  e.stopPropagation();
                  addToMyRecipes(selectedCard);
                }}
              />
              {tooltip.visible && (
                <div
                  className="recipeModal__tooltip"
                  style={{ top: tooltip.y - 36, left: tooltip.x }}
                >
                  Add to my recipe collection
                </div>
              )}
            </div>
          )}
        </div>

        <div className="recipeModal__body">
          <div className="recipeModal__left-col">
            <div className="recipeModal__img-container">
              <img
                src={selectedCard.recipe_image}
                alt=""
                className="recipeModal__image"
              />
            </div>
            <h4 className="recipeModal__subhead">Ingredients</h4>
            <div className="recipeModal__ingredients">
              {Array.isArray(selectedCard.ingredients?.ingredient)
                ? selectedCard.ingredients.ingredient.map(
                    (ingredient, index) => (
                      <p key={index}>{ingredient.ingredient_description}</p>
                    )
                  )
                : null}
            </div>
          </div>

          <div className="recipeModal__text-info">
            <h4 className="recipeModal__subhead">Description</h4>
            <p className="recipeModal__description">
              {selectedCard.recipe_description}
            </p>
            <h4 className="recipeModal__subhead">Instructions</h4>
            <div className="recipeModal__instructions">
              {Array.isArray(selectedCard.directions?.direction) ? (
                selectedCard.directions.direction.map((step, index) => (
                  <p key={index}>{step.direction_description}</p>
                ))
              ) : selectedCard.directions?.direction ? (
                <p>{selectedCard.directions.direction.direction_description}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;

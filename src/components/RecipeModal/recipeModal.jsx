import '../RecipeModal/recipeModal.css';
import { defaultMeals } from '../../utils/dummyData';

import { Trash2, Heart, X } from 'lucide-react';

function RecipeModal({ activeModal, selectedCard, closeActiveModal }) {
  return (
    <div
      className={`recipeModal ${activeModal === 'preview' ? 'recipeModal__open' : ''}`}
      onClick={closeActiveModal}
    >
      <div
        className="recipeModal__preview"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close modal__close-preview">
          <X className="modal__close" onClick={closeActiveModal} />
        </button>
        <h3 className="recipeModal__heading">{selectedCard.recipe}</h3>

        <div className="recipeModal__top-info">
          <Heart className="recipeModal__like" />
          <Trash2 className="recipeModal__delete" />
        </div>

        <div className="recipeModal__body">
          <div className="recipeModal__left-col">
            <div className="recipeModal__img-container">
              <img
                src={selectedCard.link}
                alt=""
                className="recipeModal__image"
              />
            </div>
            <div className="recipeModal__ingredients">
              {selectedCard.ingredients?.split(/(?=\d+)/).map((step, index) => (
                <p key={index}>{step.trim()}</p>
              ))}
            </div>
          </div>

          <div className="recipeModal__text-info">
            <h4 className="recipeModal__subhead">Description</h4>
            <p className="recipeModal__description">
              {selectedCard.description}
            </p>
            <h4 className="recipeModal__subhead">Instructions</h4>
            <div className="recipeModal__instructions">
              {selectedCard.instructions
                ?.split(/(?=\d+\.)/)
                .map((step, index) => (
                  <p key={index}>{step.trim()}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;

import '../AddRecipeModal/AddRecipeModal.css';

import { useState } from 'react';

import ModalWithForm from '../ModalWithForm/modalWithForm';

function AddRecipeModal({ isOpen, closeActiveModal }) {
  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');

  return (
    <ModalWithForm
      title="Add Personal Recipe"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
    >
      <div className="addRecipe__container">
        <label
          htmlFor="addRecipe-name"
          className="addRecipeModal__label addRecipeModal__label_name"
        >
          Recipe Name
          <input
            id="addRecipe-name"
            required
            type="text"
            placeholder=""
            className="addRecipeModal__input"
            value={recipeName}
          />
        </label>
        <label
          htmlFor="addRecipe-description"
          className="addRecipeModal__label addRecipeModal__label_description"
        >
          Description
          <textarea
            id="addRecipe-description"
            required
            type="text"
            placeholder=""
            className="addRecipeModal__textarea addRecipeModal__textarea_description"
            value={recipeDescription}
          />
        </label>
        <label
          htmlFor="addRecipe-ingredients"
          className="addRecipeModal__label"
        >
          Ingredients
          <textarea
            id="addRecipe-ingredients"
            required
            type="text"
            placeholder=""
            className="addRecipeModal__textarea"
            value={recipeIngredients}
          />
        </label>
        <label
          htmlFor="addRecipe-instructions"
          className="addRecipeModal__label"
        >
          Instructions
          <textarea
            id="addRecipe-instructions"
            required
            type="text"
            placeholder=""
            className="addRecipeModal__textarea"
            value={recipeInstructions}
          />
        </label>

        <button type="submit" className="addRecipeModal__submit">
          Add Recipe
        </button>
      </div>
    </ModalWithForm>
  );
}

export default AddRecipeModal;

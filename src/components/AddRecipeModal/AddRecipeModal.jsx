import '../AddRecipeModal/AddRecipeModal.css';

import { useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Trash2, Heart, CirclePlus, CircleCheck } from 'lucide-react';

import ModalWithForm from '../ModalWithForm/modalWithForm';

function AddRecipeModal({ isOpen, closeActiveModal }) {
  const { addToMyRecipes } = useContext(CurrentUserContext);
  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeDirections, setRecipeDirections] = useState(['']);
  const [recipeIngredients, setRecipeIngredients] = useState(['']);

  //ingredients
  const addIngredient = () => setRecipeIngredients([...recipeIngredients, '']);
  const updateIngredient = (index, value) => {
    setRecipeIngredients((prev) => {
      const updated = [...prev];
      if (index < 0 || index >= updated.length) return prev;
      updated[index] = value;
      return updated;
    });
  };
  const removeIngredient = (index) => {
    setRecipeIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  //directions
  const addDirection = () => setRecipeDirections([...recipeDirections, '']);
  const updateDirection = (index, value) => {
    setRecipeDirections((prev) => {
      const updated = [...prev];
      if (index < 0 || index >= updated.length) return prev;
      updated[index] = value;
      return updated;
    });
  };
  const removeDirection = (index) => {
    setRecipeDirections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ validate inputs, then send data to backend to save in DB
    const newRecipe = {
      recipe_id: Date.now().toString(), // simple unique ID
      recipe_name: recipeName,
      recipe_image: recipeImage,
      recipe_description: recipeDescription,
      recipe_ingredients: {
        ingredient: recipeIngredients
          .filter((i) => i.trim()) // ✅ remove empty entries
          .map((i) => ({ ingredient_description: i })),
      },
      recipe_directions: {
        direction: recipeDirections
          .filter((d) => d.trim())
          .map((d, index) => ({
            direction_number: String(index + 1),
            direction_description: d,
          })),
      },
    };

    console.log('New recipe:', newRecipe); // ✅ check shape before saving
    addToMyRecipes(newRecipe);
    closeActiveModal();
  };

  return (
    <ModalWithForm
      title="Add Personal Recipe"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
    >
      <form onSubmit={handleSubmit} className="addRecipeModal__form">
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
              onChange={(e) => setRecipeName(e.target.value)}
              value={recipeName}
            />
          </label>
          <label htmlFor="addRecipe-image" className="addRecipeModal__label">
            Picture URL
            <input
              id="addRecipe-image"
              required
              type="text"
              className="addRecipeModal__input"
              onChange={(e) => setRecipeImage(e.target.value)}
              value={recipeImage}
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
              onChange={(e) => setRecipeDescription(e.target.value)}
            />
          </label>
          <label
            htmlFor="addRecipe-ingredients"
            className="addRecipeModal__label"
          >
            Ingredients
            {recipeIngredients.map((ingredient, index) => (
              <div key={index} className="addRecipe__row">
                <input
                  type="text"
                  className="addRecipeModal__input"
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                />
                <Trash2
                  className="addRecipe__remove"
                  onClick={() => removeIngredient(index)}
                />
              </div>
            ))}
            <button
              type="button"
              className="addRecipe__add-button"
              onClick={addIngredient}
            >
              <CirclePlus size={16} /> Add Ingredient
            </button>
          </label>
          <label
            htmlFor="addRecipe-instructions"
            className="addRecipeModal__label"
          >
            Directions
            {recipeDirections.map((direction, index) => (
              <div key={index} className="addRecipe__row">
                <textarea
                  className="addRecipeModal__textarea"
                  placeholder={`Step ${index + 1}`}
                  value={direction}
                  onChange={(e) => updateDirection(index, e.target.value)}
                />
                <Trash2
                  className="addRecipe__remove"
                  onClick={() => removeDirection(index)}
                />
              </div>
            ))}
            <button
              type="button"
              className="addRecipe__add-button"
              onClick={addDirection}
            >
              <CirclePlus size={16} /> Add Step
            </button>
          </label>

          <button type="submit" className="addRecipeModal__submit">
            Add Recipe
          </button>
        </div>
      </form>
    </ModalWithForm>
  );
}

export default AddRecipeModal;

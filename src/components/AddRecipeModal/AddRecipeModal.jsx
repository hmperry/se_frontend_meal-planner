import '../AddRecipeModal/AddRecipeModal.css';

import { useState } from 'react';

import ModalWithForm from '../ModalWithForm/modalWithForm';

function AddRecipeModal({ isOpen, closeActiveModal }) {
  const [recipeName, setRecipeName] = useState('');
  return (
    <ModalWithForm
      title="Add Personal Recipe"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
    >
      <label htmlFor="addRecipe-name" className="addRecipeModal__label">
        <input
          id="addRecipe-name"
          required
          type="text"
          placeholder="Recipe Name"
          className="addRecipeModal__input"
          value={recipeName}
        />
      </label>
    </ModalWithForm>
  );
}

export default AddRecipeModal;

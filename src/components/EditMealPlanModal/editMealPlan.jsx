import '../AddRecipeModal/AddRecipeModal.css';
import './editMealPlan.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext, useState } from 'react';

import ModalWithForm from '../ModalWithForm/modalWithForm';
import SearchForm from '../SearchForm/searchForm';

import { defaultMeals } from '../../utils/dummyData';
import { DessertIcon } from 'lucide-react';

function EditMealPlanModal({ isOpen, closeActiveModal }) {
  const { selectedDay, setSelectedDay, updateMealPlanDay } =
    useContext(CurrentUserContext);
  const [search, setSearch] = useState('');

  const filtered = defaultMeals.filter((r) =>
    r.recipe_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (recipe) => {
    // ✅ update the selected day's meal
    updateMealPlanDay({
      ...selectedDay,
      recipe: recipe.recipe_name,
      link: recipe.recipe_image,
      description: recipe.recipe_description,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
    });
    closeActiveModal();
  };

  return (
    <ModalWithForm
      title={`Edit Meal for ${selectedDay?.date || 'day'}`}
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
    >
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="modal__input"
      />
      <ul className="edit-meal__list">
        {filtered.map((recipe) => (
          <li
            key={recipe._id}
            className="edit-meal__item"
            onClick={() => handleSelect(recipe)}
          >
            <img
              src={recipe.link}
              alt={recipe.recipe}
              className="edit-meal__img"
            />
            <p className="edit-meal__name">{recipe.recipe}</p>
          </li>
        ))}
      </ul>
    </ModalWithForm>
  );
}

export default EditMealPlanModal;

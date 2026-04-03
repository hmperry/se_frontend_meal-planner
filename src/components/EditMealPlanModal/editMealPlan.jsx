import '../AddRecipeModal/AddRecipeModal.css';
import './editMealPlan.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext, useState } from 'react';

import ModalWithForm from '../ModalWithForm/modalWithForm';
import SearchForm from '../SearchForm/searchForm';

import { defaultMeals } from '../../utils/dummyData';
import { DessertIcon } from 'lucide-react';

import { getRecipeDetails } from '../../utils/FatSecretAPI';

function EditMealPlanModal({ isOpen, closeActiveModal }) {
  const { selectedDay, setSelectedDay, updateMealPlanDay, myRecipes } =
    useContext(CurrentUserContext);
  const [search, setSearch] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const filtered = myRecipes.filter((r) =>
    r.recipe_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (recipe) => {
    console.log('recipe.recipe_id:', recipe.recipe_id);
    setSelectedRecipeId(recipe.recipe_id);
    setTimeout(() => {
      getRecipeDetails(recipe.recipe_id).then((data) => {
        console.log('data.directions:', data.directions);
        console.log('data.ingredients:', data.ingredients);
        updateMealPlanDay({
          ...selectedDay,
          recipe: recipe.recipe_name,
          link: recipe.recipe_image,
          description: recipe.recipe_description,
          directions: data.recipe.directions,
          ingredients: data.recipe.ingredients,
        });

        closeActiveModal();
        setSelectedRecipeId(null);
      }, 400);
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'day';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ModalWithForm
      title={`Edit Meal for ${formatDate(selectedDay?.date) || 'day'}`}
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
      <p>selectedRecipeId: {String(selectedRecipeId)}</p>
      <ul className="edit-meal__list">
        {filtered.map((recipe) => (
          <li
            key={recipe._id}
            className={`edit-meal__item ${selectedRecipeId === recipe.recipe_id ? 'edit-meal__item--selected' : ''}`}
            onClick={() => handleSelect(recipe)}
          >
            <img
              src={recipe.recipe_image}
              alt={recipe.recipe_name}
              className="edit-meal__img"
            />
            <p className="edit-meal__name">{recipe.recipe_name}</p>
          </li>
        ))}
      </ul>
    </ModalWithForm>
  );
}

export default EditMealPlanModal;

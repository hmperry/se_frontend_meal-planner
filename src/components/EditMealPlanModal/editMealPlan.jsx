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
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (recipe) => {
    console.log('full recipe object:', recipe); // ← add this
    console.log('recipe.isCustom:', recipe.isCustom);
    setSelectedRecipeId(recipe.id);
    setTimeout(() => {
      if (recipe.isCustom) {
        updateMealPlanDay({
          ...selectedDay,
          recipe: recipe.title,
          link: recipe.image,
          description: recipe.summary,
          directions: recipe.analyzedInstructions?.[0]?.steps || [],
          ingredients: recipe.extendedIngredients || [],
        });
        closeActiveModal();
        setSelectedRecipeId(null);
      } else {
        getRecipeDetails(recipe.id).then((data) => {
          console.log('data.directions:', data.directions);
          console.log('data.ingredients:', data.ingredients);
          updateMealPlanDay({
            ...selectedDay,
            recipe: recipe.title,
            link: recipe.image,
            description: recipe.summary,
            directions: data.analyzedInstructions?.[0]?.steps || [],
            ingredients: data.extendedIngredients || [0],
          });

          closeActiveModal();
          setSelectedRecipeId(null);
        });
      }
    }, 400);
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
            key={recipe.id}
            className={`edit-meal__item ${selectedRecipeId === recipe.id ? 'edit-meal__item--selected' : ''}`}
            onClick={() => handleSelect(recipe)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="edit-meal__img"
            />
            <p className="edit-meal__name">{recipe.title}</p>
          </li>
        ))}
      </ul>
    </ModalWithForm>
  );
}

export default EditMealPlanModal;

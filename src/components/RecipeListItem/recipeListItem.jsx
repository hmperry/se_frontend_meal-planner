import { Trash2, Heart, CirclePlus } from 'lucide-react';
import './RecipeListItem.css';

function RecipeListItem({ item }) {
  return (
    <li className="recipeList__item">
      <h3 className="recipeList__title">{item.recipe_name}</h3>
      <div className="recipeList__actions">
        <CirclePlus className="recipeList__like" size={20} />
      </div>
    </li>
  );
}

export default RecipeListItem;

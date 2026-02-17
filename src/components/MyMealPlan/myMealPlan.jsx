import './myMealPlan.css';
import '../App/App.css';
import PageHeading from '../PageHeading/pageHeading';
import { ChevronRight, Pencil } from 'lucide-react';

import { defaultMeals } from '../../utils/dummyData';

function MyMealPlan() {
  //Display day of week
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="mealPlan">
      <PageHeading>My Meal Plan</PageHeading>
      <div className="mealPlan__cards">
        {defaultMeals.map((recipe, index) => (
          <div className="mealPlan__card" key={index}>
            <div className="mealPlan__date-row">
              <p className="mealPlan__day-date">{formatDate(recipe.date)}</p>
              <ChevronRight className="mealPlan__icon" />
            </div>
            <div className="mealPlan__meal-row">
              <p className="mealPlan__recipe">{recipe.recipe}</p>
              <Pencil className="mealPlan__icon" />
            </div>
          </div>
        ))}

        {/* <div className="mealPlan__card">
          <div className="mealPlan__date-row">
            <p className="mealPlan__day-date">
              {dayName} {dayDate}
            </p>
            <ChevronRight className="mealPlan__icon" />
          </div>
          <div className="mealPlan__meal-row">
            <p className="mealPlan__recipe">Caesar Salad</p>
            <Pencil className="mealPlan__icon" />
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default MyMealPlan;

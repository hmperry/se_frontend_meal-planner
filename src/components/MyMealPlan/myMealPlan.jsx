import './myMealPlan.css';
import '../App/App.css';
import PageHeading from '../PageHeading/pageHeading';
import { ChevronRight, Pencil } from 'lucide-react';
import { useContext, useState } from 'react';
import { defaultMeals } from '../../utils/dummyData';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import EditMealPlanModal from '../EditMealPlanModal/editMealPlan';

function MyMealPlan() {
  const { openEditMealPlanModal, selectedDay, mealPlanDays, setMealPlanDays } =
    useContext(CurrentUserContext);

  //expandable meal day
  const [expandedId, setExpandedId] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generateDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return;
    const days = [];

    const current = new Date(start);

    while (current <= end) {
      days.push({
        _id: current.toISOString(), // unique id per day
        date: current.toISOString(),
        recipe: null, // no meal assigned yet
        link: null,
        description: null,
        instructions: null,
        ingredients: null,
      });
      current.setDate(current.getDate() + 1);
    }

    setMealPlanDays(days);
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
      {/* ✅ Date range picker */}
      <div className="mealPlan__date-picker">
        <label className="mealPlan__date-label">
          Start
          <input
            type="date"
            className="mealPlan__date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="mealPlan__date-label">
          End
          <input
            type="date"
            className="mealPlan__date-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button className="mealPlan__generate-button" onClick={generateDays}>
          Generate Meal Plan
        </button>
      </div>
      <div className="mealPlan__cards">
        {mealPlanDays.length === 0 ? (
          <p className="mealPlan__empty">Select a date range to get started!</p>
        ) : (
          mealPlanDays.map((day) => (
            <div className="mealPlan__card" key={day._id}>
              <div className="mealPlan__date-row">
                <p className="mealPlan__day-date">{formatDate(day.date)}</p>
                {day.recipe && (
                  <ChevronRight
                    className={`mealPlan__icon mealPlan__chevron ${expandedId === day._id ? 'mealPlan__chevron--open' : ''}`}
                    onClick={() => toggleExpand(day._id)}
                  />
                )}
              </div>
              <div className="mealPlan__meal-row">
                <p className="mealPlan__recipe">
                  {day.recipe || 'No meal planned'}
                  {/* {selectedDay?._id === recipe._id
                  ? selectedDay.recipe
                  : recipe.recipe} */}
                </p>
                <button
                  className="mealPlan__edit-button"
                  onClick={() => openEditMealPlanModal(day)}
                >
                  <Pencil className="mealPlan__icon" />
                </button>
              </div>
              {expandedId === day._id && day.recipe && (
                <div className="mealPlan__expanded">
                  <div className="mealPlan__expanded_left-col">
                    <div className="mealPlan__expanded_img-container">
                      <img
                        src={day.link}
                        alt={day.recipe}
                        className="mealPlan__expanded_image"
                      />
                    </div>
                    <div className="mealPlan__expanded_ingredients">
                      {day.ingredients?.split(/(?=\d+)/).map((step, index) => (
                        <p key={index}>{step.trim()}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mealPlan__expanded_text-info">
                    <h4 className="mealPlan__expanded_subhead">Description</h4>
                    <p className="mealPlan__expanded_description">
                      {day.description}
                    </p>
                    <h4 className="mealPlan__expanded_subhead">Instructions</h4>
                    <div className="mealPlan__expanded_instructions">
                      {day.instructions
                        ?.split(/(?=\d+\.)/)
                        .map((step, index) => (
                          <p key={index}>{step.trim()}</p>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MyMealPlan;

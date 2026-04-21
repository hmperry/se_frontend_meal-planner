import './myMealPlan.css';
import '../App/App.css';
import PageHeading from '../PageHeading/pageHeading';
import {
  Calendar,
  ChevronRight,
  Pencil,
  BookmarkPlus,
  CircleCheck,
} from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { defaultMeals } from '../../utils/dummyData';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import EditMealPlanModal from '../EditMealPlanModal/editMealPlan';
import { getRecipeDetails } from '../../utils/FatSecretAPI';
import Presaver from '../Presaver/presaver';

function MyMealPlan() {
  const {
    openEditMealPlanModal,
    selectedDay,
    mealPlanDays,
    setMealPlanDays,
    myRecipes,
    savedPlans,
    setSavedPlans,
  } = useContext(CurrentUserContext);

  const [expandedId, setExpandedId] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activePlanId, setActivePlanId] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('savedMealPlans', JSON.stringify(savedPlans));
  }, [savedPlans]);

  useEffect(() => {
    if (savedPlans.length > 0) {
      const mostRecent = savedPlans[0];
      setMealPlanDays(mostRecent.days);
      setStartDate(mostRecent.startDate.slice(0, 10));
      setEndDate(mostRecent.endDate.slice(0, 10));
      setActivePlanId(mostRecent.id);
    }
  }, []);

  const generateDays = () => {
    if (!startDate || !endDate) return;

    const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
    const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);
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
    setActivePlanId(null);
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

  const formatDateRange = (start, end) => {
    const fmt = (d) =>
      new Date(d).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    return `${fmt(start)} – ${fmt(end)}`;
  };

  //Save plan
  const handleSaveClick = () => {
    if (mealPlanDays.length === 0) return;

    setIsSaving(true);

    setTimeout(() => {
      const name = formatDateRange(
        mealPlanDays[0].date,
        mealPlanDays[mealPlanDays.length - 1].date
      );

      if (activePlanId) {
        setSavedPlans((prev) =>
          prev.map((plan) =>
            plan.id === activePlanId
              ? { ...plan, days: JSON.parse(JSON.stringify(mealPlanDays)) }
              : plan
          )
        );
      } else {
        const newPlan = {
          id: Date.now().toString(),
          name,
          startDate: mealPlanDays[0].date,
          endDate: mealPlanDays[mealPlanDays.length - 1].date,
          days: JSON.parse(JSON.stringify(mealPlanDays)),
        };
        setSavedPlans((prev) => [newPlan, ...prev]);
        setActivePlanId(newPlan.id);
      }
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }, 1000);
  };

  const handleLoadPlan = (plan) => {
    setMealPlanDays(plan.days);
    setStartDate(plan.startDate.slice(0, 10));
    setEndDate(plan.endDate.slice(0, 10));
    setActivePlanId(plan.id);
    setExpandedId(null);
  };

  const handleDeletePlan = (planId, e) => {
    e.stopPropagation();
    setSavedPlans((prev) => prev.filter((p) => p.id !== planId));
  };
  return (
    <section className="mealPlan__layout">
      <div className="mealPlan__wrapper">
        <h2 className="mealPlan__title">Plan a Custom Meal Plan</h2>
        <p className="mealPlan__text-description">
          You choose how many days to plan. You choose which meals based on your
          saved meals from your recipe collection. Then use the Grocery List to
          save time at the store.
        </p>
        {isSaving && <Presaver />}
        {/* ✅ Date range picker */}

        <div className="mealPlan__cards">
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
            <button
              className="mealPlan__generate-button"
              onClick={generateDays}
            >
              Generate Meal Plan
            </button>
          </div>
          {/* Save controls */}

          {mealPlanDays.length > 0 && (
            <div className="mealPlan__save-bar">
              <button
                className={`mealPlan__save-button ${showSaved ? 'saved' : ''}`}
                onClick={handleSaveClick}
              >
                {showSaved ? (
                  <CircleCheck
                    size={16}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFromMyRecipes(item);
                    }}
                  />
                ) : (
                  <BookmarkPlus size={16} />
                )}
                {showSaved ? 'Saved!' : 'Save This Plan'}
              </button>
              <button
                className="mealPlan__sidebar-toggle"
                onClick={() => setSidebarOpen((prev) => !prev)}
              >
                <Calendar size={16} />
                {sidebarOpen ? 'Hide Plans' : 'Saved Plans'}
              </button>
            </div>
          )}
          {mealPlanDays.length === 0 ? (
            <p className="mealPlan__empty">
              Select a date range to get started!
            </p>
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
                    {console.log(
                      'expanded day object:',
                      JSON.stringify(day, null, 2)
                    )}
                    <div className="mealPlan__expanded_left-col">
                      <div className="mealPlan__expanded_img-container">
                        <img
                          src={day.link}
                          alt={day.recipe}
                          className="mealPlan__expanded_image"
                        />
                      </div>
                      <div className="mealPlan__expanded_ingredients">
                        {Array.isArray(day.ingredients)
                          ? day.ingredients.map((item, index) => (
                              <p key={index}>{item.original || item.name}</p>
                            ))
                          : null}
                      </div>
                    </div>

                    <div className="mealPlan__expanded_text-info">
                      <h4 className="mealPlan__expanded_subhead">
                        Description
                      </h4>
                      <p
                        className="mealPlan__expanded_description"
                        dangerouslySetInnerHTML={{ __html: day.description }}
                      />
                      <h4 className="mealPlan__expanded_subhead">
                        Instructions
                      </h4>
                      <div className="mealPlan__expanded_instructions">
                        {Array.isArray(day.directions)
                          ? day.directions.map((step, index) => (
                              <p key={index}>
                                {step.number}. {step.step}
                              </p>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <aside
        className={`mealPlan__sidebar ${sidebarOpen ? 'mealPlan__sidebar--open' : ''}`}
      >
        <h2 className="mealPlan__sidebar-title">
          <Calendar size={16} />
          Saved Plans
        </h2>

        {savedPlans.length === 0 ? (
          <p className="mealPlan__sidebar-empty">
            Save a meal plan to see it here.
          </p>
        ) : (
          <ul className="mealPlan__sidebar-list">
            {savedPlans.map((plan) => (
              <li key={plan.id} className="mealPlan__sidebar-item">
                <button
                  className="mealPlan__sidebar-link"
                  onClick={() => handleLoadPlan(plan)}
                  title={`Load "${plan.name}"`}
                >
                  {/* <span className="mealPlan__sidebar-plan-name">
                    {plan.name}
                  </span> */}
                  <span className="mealPlan__sidebar-plan-range">
                    {formatDateRange(plan.startDate, plan.endDate)}
                  </span>
                  <span className="mealPlan__sidebar-plan-count">
                    {plan.days.length} day{plan.days.length !== 1 ? 's' : ''}
                  </span>
                </button>
                <button
                  className="mealPlan__sidebar-delete"
                  onClick={(e) => handleDeletePlan(plan.id, e)}
                  title="Delete plan"
                  aria-label="Delete plan"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </section>
    // </div>
  );
}

export default MyMealPlan;

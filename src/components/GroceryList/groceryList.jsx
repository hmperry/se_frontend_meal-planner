import { useState, useContext, useEffect } from 'react';
import PageHeading from '../PageHeading/pageHeading';
import { ChevronRight, Pencil, Check } from 'lucide-react';
import './groceryList.css';

import { defaultGroceryList } from '../../utils/dummyData';
import { buildGroceryList } from '../../utils/buildGroceryList';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Checkbox = ({ checked, onChange }) => {
  return (
    <div
      className={
        checked ? 'grocery__table_checkbox checked' : 'grocery__table_checkbox'
      }
      onClick={onChange}
    >
      {checked && <Check className="grocery__table__check" />}
    </div>
  );
};

function GroceryList({ isOpen, closeActiveModal }) {
  const { mealPlanDays, openEditGroceryModal, savedPlans } =
    useContext(CurrentUserContext);
  const [expandedPlanId, setExpandedPlanId] = useState(null);
  const [groceryList, setGroceryList] = useState(defaultGroceryList);
  const [editingIndex, setEditingIndex] = useState(null);

  const [planGroceryLists, setPlanGroceryLists] = useState(() =>
    Object.fromEntries(
      savedPlans.map((plan) => [plan.id, buildGroceryList(plan.days)])
    )
  );

  const togglePlan = (planId) => {
    setExpandedPlanId((prev) => (prev === planId ? null : planId));
  };

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  const handleCheckboxChange = (planId, index) => {
    setPlanGroceryLists((prev) => {
      const list = [...prev[planId]];
      list[index] = { ...list[index], checked: !list[index].checked };

      setTimeout(() => {
        setPlanGroceryLists((prev2) => ({
          ...prev2,
          [planId]: [...prev2[planId]].sort((a, b) => {
            if (a.checked === b.checked) return 0;
            return a.checked ? 1 : -1;
          }),
        }));
      }, 800);

      return { ...prev, [planId]: list };
    });
  };

  const handleAmountChange = (planId, index, newAmount) => {
    setPlanGroceryLists((prev) => ({
      ...prev,
      [planId]: prev[planId].map((item, i) =>
        i === index ? { ...item, amount: newAmount } : item
      ),
    }));
  };

  const [editingKey, setEditingKey] = useState(null); // "planId-index"

  const formatDateRange = (start, end) => {
    const fmt = (d) =>
      new Date(d).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    return `${fmt(start)} – ${fmt(end)}`;
  };

  useEffect(() => {
    setPlanGroceryLists((prev) => {
      const updated = { ...prev };
      savedPlans.forEach((plan) => {
        const fresh = buildGroceryList(plan.days);
        const existing = updated[plan.id] || [];

        updated[plan.id] = fresh.map((item) => {
          const match = existing.find((e) => e.ingredient === item.ingredient);
          return match
            ? { ...item, checked: match.checked, amount: match.amount }
            : item;
        });
      });
      return updated;
    });
  }, [savedPlans]);

  return (
    <div className="grocery-list">
      {savedPlans.length === 0 ? (
        <p className="grocery__empty">
          Save a meal plan to generate a grocery list.
        </p>
      ) : (
        savedPlans.map((plan) => {
          const groceryList = planGroceryLists[plan.id] || [];
          const isExpanded = expandedPlanId === plan.id;

          return (
            <div key={plan.id} className="grocery__plan-section">
              {/* Plan header — click to expand/collapse */}
              <button
                className="grocery__plan-header"
                onClick={() => togglePlan(plan.id)}
              >
                <ChevronRight
                  className={`grocery__plan-chevron ${isExpanded ? 'grocery__plan-chevron--open' : ''}`}
                  size={18}
                />
                <span className="grocery__plan-name">
                  {formatDateRange(plan.startDate, plan.endDate)}
                </span>
                <span className="grocery__plan-count">
                  {plan.days.filter((d) => d.recipe).length} meals
                </span>
              </button>

              {/* Expanded grocery list table */}
              {isExpanded && (
                <div className="grocery-list__table_border">
                  <div className="grocery-list__table">
                    <div className="grocery__table-header grocery__table-row">
                      <div className="grocery__table_check-col"></div>
                      <div className="grocery__table_ingred-col">
                        Ingredient
                      </div>
                      <div className="grocery__table_amount-col">Amount</div>
                    </div>
                    {groceryList.length === 0 ? (
                      <p className="grocery__empty">
                        No meals assigned in this plan.
                      </p>
                    ) : (
                      groceryList.map(
                        ({ ingredient, amount, checked }, index) => {
                          const key = `${plan.id}-${index}`;
                          return (
                            <div className="grocery__table-row" key={index}>
                              <div className="grocery__table_check-col">
                                <Checkbox
                                  checked={checked}
                                  onChange={() =>
                                    handleCheckboxChange(plan.id, index)
                                  }
                                />
                              </div>
                              <div className="grocery__table_ingred-col">
                                {ingredient}
                              </div>
                              <div className="grocery__table_amount-col">
                                {editingKey === key ? (
                                  <input
                                    className="grocery__amount-input"
                                    value={amount}
                                    onChange={(e) =>
                                      handleAmountChange(
                                        plan.id,
                                        index,
                                        e.target.value
                                      )
                                    }
                                    onBlur={() => setEditingKey(null)}
                                    onKeyDown={(e) =>
                                      e.key === 'Enter' && setEditingKey(null)
                                    }
                                    autoFocus
                                  />
                                ) : (
                                  <span onClick={() => setEditingKey(key)}>
                                    {amount}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        }
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default GroceryList;

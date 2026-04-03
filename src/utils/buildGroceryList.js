export const buildGroceryList = (mealPlanDays) => {
  const shoppingList = {};

  mealPlanDays.forEach((day) => {
    if (!day.ingredients?.ingredient) return;

    const ingredients = Array.isArray(day.ingredients.ingredient)
      ? day.ingredients.ingredient
      : [day.ingredients.ingredient];

    ingredients.forEach((item) => {
      const key = `${item.food_name}__${item.measurement_description}`;
      const units = parseFloat(item.number_of_units) || 0;

      if (shoppingList[key]) {
        shoppingList[key].units += units;
      } else {
        shoppingList[key] = {
          ingredient: item.food_name,
          measurement: item.measurement_description,
          units,
          checked: false,
        };
      }
    });
  });

  return Object.values(shoppingList).map((item) => ({
    ingredient: item.ingredient,
    amount: `${parseFloat(item.units.toFixed(2))} ${item.measurement}`,
    checked: item.checked,
  }));
};

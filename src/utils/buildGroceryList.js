export const buildGroceryList = (mealPlanDays) => {
  const shoppingList = {};

  mealPlanDays.forEach((day) => {
    if (!Array.isArray(day.ingredients)) return;

    day.ingredients.forEach((item) => {
      const key = `${item.name}__${item.unit}`;
      const qty = item.amount || 0;

      if (shoppingList[key]) {
        shoppingList[key].qty += qty;
      } else {
        shoppingList[key] = {
          ingredient: item.name,
          unit: item.unit,
          qty,
          original: item.original,
          checked: false,
        };
      }
    });
  });

  return Object.values(shoppingList).map((item) => ({
    ingredient: item.ingredient,
    amount: item.unit
      ? `${parseFloat(item.qty.toFixed(2))} ${item.unit}`
      : item.original,
    checked: item.checked,
  }));
};

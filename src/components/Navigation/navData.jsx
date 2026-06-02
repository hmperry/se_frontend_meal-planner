import React from 'react';
import { List, CookingPot, WalletCards, Calendar } from 'lucide-react';

export const NavData = [
  {
    title: 'Community Recipes',
    icon: <CookingPot />,
    link: '/',
  },
  {
    title: 'My Meal Plan',
    icon: <Calendar />,
    link: '/mealplan',
    protected: true,
  },
  {
    title: 'Grocery List',
    icon: <List />,
    link: '/grocerylist',
    protected: true,
  },

  {
    title: 'My Recipes',
    icon: <WalletCards />,
    link: '/myrecipes',
    protected: true,
  },
];

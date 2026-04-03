import React from 'react';
import { List, CookingPot, WalletCards, Calendar } from 'lucide-react';

export const NavData = [
  {
    title: 'My Meal Plan',
    icon: <Calendar />,
    link: '/',
  },
  {
    title: 'Grocery List',
    icon: <List />,
    link: '/grocerylist',
  },
  {
    title: 'Community Recipes',
    icon: <CookingPot />,
    link: '/communityrecipes',
  },
  {
    title: 'My Recipes',
    icon: <WalletCards />,
    link: '/myrecipes',
  },
];

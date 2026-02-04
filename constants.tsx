
import { Meal, Lesson } from './types';

export const MEAL_TEMPLATES: Meal[] = [
  {
    id: '1',
    name: 'Slow Cooker Beef Stew',
    description: 'Hearty, warm, and perfect for freezing portions.',
    servings: 6,
    totalCost: 24.50,
    ingredients: ['Beef Chuck', 'Carrots', 'Potatoes', 'Onion', 'Beef Stock'],
    category: 'Dinner'
  },
  {
    id: '2',
    name: 'Veggie Pasta Bake',
    description: 'The ultimate "hide the veggies" meal for toddlers.',
    servings: 8,
    totalCost: 18.00,
    ingredients: ['Penne', 'Zucchini', 'Pasta Sauce', 'Mozzarella', 'Spinach'],
    category: 'Dinner'
  },
  {
    id: '3',
    name: 'Overnight Oats Batch',
    description: 'Save $5/day vs coffee shop breakfasts.',
    servings: 5,
    totalCost: 7.50,
    ingredients: ['Oats', 'Milk of Choice', 'Chia Seeds', 'Honey', 'Frozen Berries'],
    category: 'Breakfast'
  }
];

export const EDUCATION_CARDS: Lesson[] = [
  {
    id: 'etf-intro',
    title: 'What is an ETF?',
    duration: '60s',
    requirement: 0,
    content: 'Think of an ETF (Exchange Traded Fund) like a basket of groceries. Instead of buying one apple (one stock), you buy a pre-mixed basket of many different fruits. This makes your investing safer and easier because if one fruit goes bad, you still have the rest of the basket.'
  },
  {
    id: 'compounding',
    title: 'Time > Timing',
    duration: '90s',
    requirement: 3,
    content: 'Compounding is like a snowball rolling down a hill. At first, it stays small. But as it keeps rolling, it picks up more snow faster and faster. Investing early means your snowball has a much longer hill to roll down, even if you start with a tiny amount.'
  },
  {
    id: 'first-50',
    title: 'Your First $50',
    duration: '60s',
    requirement: 8,
    content: 'You don’t need thousands to start. Many platforms let you invest with just $5. By setting aside $10 a week from a simple swap, you can build a $500 nest egg in less than a year. The best time to start was yesterday; the second best time is today.'
  }
];

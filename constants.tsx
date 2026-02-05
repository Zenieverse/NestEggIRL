
import { Meal, Lesson } from './types';

export const MEAL_TEMPLATES: Meal[] = [
  {
    id: '1',
    name: 'Slow Cooker Beef Stew',
    description: 'Hearty, warm, and perfect for freezing portions. Kids love the soft veggies.',
    servings: 6,
    totalCost: 24.50,
    ingredients: ['Beef Chuck', 'Carrots', 'Potatoes', 'Onion', 'Beef Stock', 'Garlic'],
    category: 'Dinner'
  },
  {
    id: '2',
    name: 'Veggie Pasta Bake',
    description: 'The ultimate "hide the veggies" meal for toddlers. Cheesy and delicious.',
    servings: 8,
    totalCost: 18.00,
    ingredients: ['Penne', 'Zucchini', 'Pasta Sauce', 'Mozzarella', 'Spinach', 'Corn'],
    category: 'Dinner'
  },
  {
    id: '3',
    name: 'Overnight Oats Batch',
    description: 'Save $5/day vs coffee shop breakfasts. Prep 5 jars in 10 minutes.',
    servings: 5,
    totalCost: 7.50,
    ingredients: ['Oats', 'Milk of Choice', 'Chia Seeds', 'Honey', 'Frozen Berries'],
    category: 'Breakfast'
  },
  {
    id: '4',
    name: 'Lentil Dhal',
    description: 'Incredibly cheap and healthy. Great for lunch or dinner.',
    servings: 6,
    totalCost: 12.00,
    ingredients: ['Red Lentils', 'Coconut Milk', 'Turmeric', 'Rice', 'Spinach'],
    category: 'Lunch/Dinner'
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
    content: 'Compounding is like a snowball rolling down a hill. At first, it stays small. But as it keeps rolling, it picks up more snow faster and faster. Investing early means your snowball has a much longer hill to roll down, even if you start with a tiny amount. The雪球 expands exponentially over time!'
  },
  {
    id: 'risk-reward',
    title: 'Risk vs. Reward',
    duration: '75s',
    requirement: 5,
    content: 'Every investment has a level of risk. Savings accounts are safe but grow slowly. Stocks can grow faster but can also drop in value. For long-term goals (like a house or retirement), we often accept some risk for the potential of much higher growth. For short-term needs, we stay safe.'
  },
  {
    id: 'first-50',
    title: 'Your First $50',
    duration: '60s',
    requirement: 8,
    content: 'You don’t need thousands to start. Many platforms let you invest with just $5. By setting aside $10 a week from a simple swap, you can build a $500 nest egg in less than a year. The best time to start was yesterday; the second best time is today.'
  }
];

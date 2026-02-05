
export type HouseholdSize = '1-2' | '3-4' | '5+';
export type BudgetRange = 'Under $150' | '$150-$250' | '$250+';
export type InvestingLevel = 'Beginner' | 'Curious' | 'Ready';

export type ActionType = 'swap' | 'meal_plan' | 'lesson';

export interface Decision {
  id: string;
  item: string;
  category: PurchaseCategory | 'Meal Prep';
  savings: number;
  date: string;
  originalPrice?: number;
  type: ActionType;
}

export interface UserProfile {
  onboarded: boolean;
  householdSize: HouseholdSize;
  weeklyBudget: BudgetRange;
  investingLevel: InvestingLevel;
  isPlus: boolean;
  totalSaved: number;
  actionsCount: number;
  completedLessons: string[];
  history: Decision[];
  joinedDate: string;
}

export type PurchaseCategory = 'Groceries' | 'Home' | 'Kids' | 'Meals' | 'Other';

export interface PurchaseImpact {
  item: string;
  category: PurchaseCategory;
  price: number;
  weeklyCost: number;
  yearlyCost: number;
  fiveYearInvested: number;
  swap?: {
    name: string;
    price: number;
    reason: string;
    savings: number;
  };
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  servings: number;
  totalCost: number;
  ingredients: string[];
  category: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  requirement: number;
}

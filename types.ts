
export type HouseholdSize = '1-2' | '3-4' | '5+';
export type BudgetRange = 'Under $150' | '$150-$250' | '$250+';
export type InvestingLevel = 'Beginner' | 'Curious' | 'Ready';

export interface Decision {
  id: string;
  item: string;
  category: PurchaseCategory;
  savings: number;
  date: string;
}

export interface UserProfile {
  onboarded: boolean;
  householdSize: HouseholdSize;
  weeklyBudget: BudgetRange;
  investingLevel: InvestingLevel;
  isPlus: boolean;
  totalSaved: number;
  actionsCount: number;
  unlockedLessons: string[];
  history: Decision[];
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

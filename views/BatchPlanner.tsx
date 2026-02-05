
import React, { useState } from 'react';
import { MEAL_TEMPLATES } from '../constants';
import { UserProfile, Meal, Decision } from '../types';

interface BatchPlannerProps {
  user: UserProfile;
  onCommit: (decision: Decision) => void;
  showPaywall: () => void;
}

const BatchPlanner: React.FC<BatchPlannerProps> = ({ user, onCommit, showPaywall }) => {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [showList, setShowList] = useState(false);
  const [isCommitted, setIsCommitted] = useState(false);

  const toggleMeal = (meal: Meal) => {
    if (isCommitted) return;
    if (!user.isPlus && selectedMeals.length >= 1) {
      showPaywall();
      return;
    }

    if (selectedMeals.find(m => m.id === meal.id)) {
      setSelectedMeals(selectedMeals.filter(m => m.id !== meal.id));
    } else {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };

  const totalCost = selectedMeals.reduce((acc, m) => acc + m.totalCost, 0);
  const totalServings = selectedMeals.reduce((acc, m) => acc + m.servings, 0);
  const costPerServing = totalServings > 0 ? totalCost / totalServings : 0;
  
  // Estimate that each batch meal saves $12 vs takeout/ready meals
  const estimatedSavings = selectedMeals.length * 12;

  const handleCommit = () => {
    const decision: Decision = {
      id: Math.random().toString(36).substr(2, 9),
      item: `Meal Plan: ${selectedMeals.length} Batch Meals`,
      category: 'Meal Prep',
      savings: estimatedSavings,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      type: 'meal_plan'
    };
    onCommit(decision);
    setIsCommitted(true);
    setShowList(true);
  };

  const allIngredients = Array.from(new Set(selectedMeals.flatMap(m => m.ingredients)));

  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto max-w-md mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight font-serif">Meal Prep</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">Save roughly $12 per meal by prepping at home.</p>

      {selectedMeals.length > 0 && (
        <div className={`rounded-[40px] p-8 text-white mb-10 shadow-2xl transition-all duration-500 ${isCommitted ? 'bg-orange-500 shadow-orange-200' : 'bg-teal-600 shadow-teal-200/50'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">{isCommitted ? 'Plan Locked! 🎉' : 'Weekly Plan Summary'}</h3>
            <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">
              {selectedMeals.length} {selectedMeals.length === 1 ? 'Meal' : 'Meals'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-[10px] text-white/70 uppercase font-bold mb-1">Estimated Savings</p>
              <p className="text-3xl font-bold tabular-nums">${estimatedSavings.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/70 uppercase font-bold mb-1">Per Serving</p>
              <p className="text-3xl font-bold tabular-nums">${costPerServing.toFixed(2)}</p>
            </div>
          </div>
          {!isCommitted ? (
            <button 
              onClick={handleCommit}
              className="w-full bg-white text-teal-700 font-bold py-5 rounded-3xl shadow-xl active:scale-95 transition-all text-lg"
            >
              Commit to Plan & Save
            </button>
          ) : (
            <button 
              onClick={() => setShowList(true)}
              className="w-full bg-white text-orange-600 font-bold py-5 rounded-3xl shadow-xl active:scale-95 transition-all text-lg"
            >
              View Shopping List
            </button>
          )}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Templates</h3>
          {!user.isPlus && <span className="text-[10px] text-teal-600 font-bold">UPGRADE FOR 50+ MORE</span>}
        </div>
        
        {MEAL_TEMPLATES.map((meal) => {
          const isSelected = selectedMeals.find(m => m.id === meal.id);
          return (
            <div 
              key={meal.id}
              onClick={() => toggleMeal(meal)}
              className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer group transform active:scale-[0.98] ${
                isSelected 
                  ? 'border-teal-500 bg-teal-50/30' 
                  : 'border-white bg-white shadow-sm hover:border-teal-100'
              } ${isCommitted && !isSelected ? 'opacity-40 grayscale pointer-events-none' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold px-3 py-1 rounded-lg bg-gray-50 text-gray-500 uppercase tracking-widest border border-gray-100">
                  {meal.category}
                </span>
                <span className={`font-bold transition-colors ${isSelected ? 'text-teal-600' : 'text-gray-400'}`}>
                  ${meal.totalCost.toFixed(2)}
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors">{meal.name}</h4>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-2">{meal.description}</p>
              <div className="flex flex-wrap gap-2">
                {meal.ingredients.slice(0, 3).map((ing, i) => (
                  <span key={i} className="text-[10px] bg-white border border-gray-100 text-gray-500 px-3 py-1.5 rounded-xl font-medium">
                    {ing}
                  </span>
                ))}
                {meal.ingredients.length > 3 && (
                  <span className="text-[10px] text-gray-400 font-medium py-1.5">+ {meal.ingredients.length - 3} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showList && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md flex items-end animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-[50px] p-10 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-500 shadow-2xl">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" onClick={() => setShowList(false)}></div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Shopping List</h2>
                <p className="text-sm text-gray-400">{allIngredients.length} items to pick up</p>
              </div>
              <button onClick={() => setShowList(false)} className="text-4xl text-gray-300 hover:text-gray-600 leading-none">&times;</button>
            </div>
            
            <div className="space-y-3 mb-12">
              {allIngredients.map((ing, i) => (
                <label key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer active:bg-gray-100 transition-colors">
                  <input type="checkbox" className="w-6 h-6 rounded-lg accent-teal-600 cursor-pointer" />
                  <span className="text-gray-700 font-medium text-lg">{ing}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => window.print()} 
                className="bg-gray-100 text-gray-600 font-bold py-5 rounded-3xl active:scale-95 transition-all"
              >
                Print 🖨️
              </button>
              <button 
                onClick={() => setShowList(false)}
                className="bg-teal-600 text-white font-bold py-5 rounded-3xl shadow-xl active:scale-95 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchPlanner;

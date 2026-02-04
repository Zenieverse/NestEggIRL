
import React, { useState } from 'react';
import { MEAL_TEMPLATES } from '../constants';
import { UserProfile, Meal } from '../types';

interface BatchPlannerProps {
  user: UserProfile;
  showPaywall: () => void;
}

const BatchPlanner: React.FC<BatchPlannerProps> = ({ user, showPaywall }) => {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [showList, setShowList] = useState(false);

  const toggleMeal = (meal: Meal) => {
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
  
  const allIngredients = Array.from(new Set(selectedMeals.flatMap(m => m.ingredients)));

  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto max-w-md mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Meal Prep</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">Save time and cash with batch cooking templates.</p>

      {selectedMeals.length > 0 && (
        <div className="bg-teal-600 rounded-[40px] p-8 text-white mb-10 shadow-2xl shadow-teal-200/50 animate-in slide-in-from-top duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Plan Summary</h3>
            <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">
              {selectedMeals.length} Meals
            </span>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-[10px] text-teal-100 uppercase font-bold mb-1 opacity-80">Weekly Cost</p>
              <p className="text-3xl font-bold tabular-nums">${totalCost.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-teal-100 uppercase font-bold mb-1 opacity-80">Per Serving</p>
              <p className="text-3xl font-bold tabular-nums">${costPerServing.toFixed(2)}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowList(true)}
            className="w-full bg-white text-teal-700 font-bold py-5 rounded-3xl shadow-xl active:scale-95 transition-all text-lg"
          >
            Generate Shopping List 🛒
          </button>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available Templates</h3>
          {!user.isPlus && <span className="text-[10px] text-teal-600 font-bold">PLUS TO UNLOCK MORE</span>}
        </div>
        
        {MEAL_TEMPLATES.map((meal) => {
          const isSelected = selectedMeals.find(m => m.id === meal.id);
          return (
            <div 
              key={meal.id}
              onClick={() => toggleMeal(meal)}
              className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer group transform hover:scale-[1.01] ${
                isSelected 
                  ? 'border-teal-500 bg-teal-50/30' 
                  : 'border-white bg-white shadow-sm'
              }`}
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
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">{meal.description}</p>
              <div className="flex flex-wrap gap-2">
                {meal.ingredients.map((ing, i) => (
                  <span key={i} className="text-[10px] bg-white/50 border border-gray-100 text-gray-500 px-3 py-1.5 rounded-xl font-medium">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showList && (
        <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm flex items-end animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-[50px] p-10 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-500 shadow-2xl">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" onClick={() => setShowList(false)}></div>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Shopping List</h2>
              <button onClick={() => setShowList(false)} className="text-3xl text-gray-300 hover:text-gray-500">&times;</button>
            </div>
            
            <div className="space-y-4 mb-10">
              {allIngredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 group">
                  <div className="w-6 h-6 rounded-lg border-2 border-teal-200 group-active:bg-teal-500 transition-colors"></div>
                  <span className="text-gray-700 font-medium">{ing}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowList(false)}
              className="w-full bg-teal-600 text-white font-bold py-5 rounded-3xl shadow-xl active:scale-95 transition-all text-lg"
            >
              Close List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchPlanner;

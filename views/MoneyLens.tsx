
import React, { useState } from 'react';
import { PurchaseCategory, PurchaseImpact, UserProfile, Decision } from '../types';
import { getSmartSwaps } from '../services/geminiService';

interface MoneyLensProps {
  user: UserProfile;
  onAction: (decision: Decision) => void;
  showPaywall: () => void;
}

const MoneyLens: React.FC<MoneyLensProps> = ({ user, onAction, showPaywall }) => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<PurchaseCategory>('Groceries');
  const [impact, setImpact] = useState<PurchaseImpact | null>(null);
  const [loading, setLoading] = useState(false);

  const categories: PurchaseCategory[] = ['Groceries', 'Home', 'Kids', 'Meals', 'Other'];

  const calculateImpact = async () => {
    if (!item || !price) return;
    
    // Limits for free users
    if (!user.isPlus && user.actionsCount >= 5) {
      showPaywall();
      return;
    }

    setLoading(true);
    const numPrice = parseFloat(price);
    const yearly = numPrice * 52;
    
    // Simple compound interest for 5 years at 6%
    const rate = 0.06;
    const n = 12;
    const t = 5;
    const monthlyContribution = (numPrice * 4.33);
    const totalInvested = monthlyContribution * ( (Math.pow(1 + rate/n, n*t) - 1) / (rate/n) );

    const swaps = await getSmartSwaps(item, category, numPrice);

    setImpact({
      item,
      category,
      price: numPrice,
      weeklyCost: numPrice,
      yearlyCost: yearly,
      fiveYearInvested: totalInvested,
      swap: swaps[0]
    });
    setLoading(false);
  };

  const handleAction = () => {
    if (impact?.swap) {
      const decision: Decision = {
        id: Math.random().toString(36).substr(2, 9),
        item: impact.item,
        category: impact.category,
        savings: impact.swap.savings,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
      onAction(decision);
      setImpact(null);
      setItem('');
      setPrice('');
    }
  };

  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto min-h-screen bg-teal-50/20">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Money Lens</h2>
      <p className="text-gray-500 mb-8">Shift your perspective before the checkout.</p>
      
      {!impact ? (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Item Name</label>
                <input 
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  placeholder="e.g. Afternoon Starbucks"
                  className="w-full p-5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-teal-400 outline-none text-gray-700 font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Weekly Cost ($)</label>
                <input 
                  type="number"
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-teal-400 outline-none text-gray-700 font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        category === cat ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={calculateImpact}
              disabled={loading || !item || !price}
              className="w-full mt-10 bg-teal-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-teal-100 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : 'Calculate Future Value'}
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in zoom-in duration-500 space-y-8">
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-8xl">📊</div>
            <h3 className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Total Yearly Impact</h3>
            <p className="text-center text-5xl font-bold text-gray-800 mb-10 tabular-nums">${impact.yearlyCost.toLocaleString()}</p>
            
            <div className="p-8 bg-teal-600 rounded-[32px] text-white text-center shadow-lg">
              <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">5 Year Growth Potential</p>
              <p className="text-5xl font-bold mb-2 tabular-nums">${Math.round(impact.fiveYearInvested).toLocaleString()}</p>
              <p className="text-[10px] opacity-60 italic leading-tight">Projected at 6% compounding monthly. Not a guarantee of returns.</p>
            </div>
          </div>

          <div className="bg-orange-50 rounded-[40px] p-8 border border-orange-100 shadow-lg shadow-orange-100/50">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💡</span>
              <h4 className="orange-800 text-xl font-bold">Smart Swap Suggestion</h4>
            </div>
            
            {impact.swap && (
              <div className="space-y-6">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[24px]">
                   <p className="text-gray-500 text-sm mb-1 uppercase font-bold tracking-widest">The Swap</p>
                   <p className="text-gray-800 font-bold text-lg mb-2">{impact.swap.name}</p>
                   <p className="text-gray-600 text-sm italic leading-relaxed">"{impact.swap.reason}"</p>
                </div>
                
                <div className="flex justify-between items-center bg-white p-6 rounded-[24px]">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Weekly Savings</p>
                    <p className="text-3xl font-bold text-teal-600">${impact.swap.savings.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={handleAction}
                    className="bg-orange-500 text-white font-bold px-8 py-5 rounded-2xl shadow-lg shadow-orange-200 active:scale-95 transition-all text-sm"
                  >
                    CHOOSE SWAP ✨
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button onClick={() => setImpact(null)} className="w-full text-gray-400 text-sm font-bold uppercase tracking-widest py-4">
            Cancel & Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default MoneyLens;

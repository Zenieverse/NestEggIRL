
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
    if (!item || !price || isNaN(parseFloat(price))) return;
    
    // Limits for free users
    if (!user.isPlus && user.actionsCount >= 5) {
      showPaywall();
      return;
    }

    setLoading(true);
    try {
      const numPrice = parseFloat(price);
      const yearly = numPrice * 52;
      
      // Simple compound interest for 5 years at 6%
      const rate = 0.06;
      const n = 12; // monthly compounding
      const t = 5;  // years
      const monthlyContribution = (numPrice * 4.33); // avg weeks in month
      
      // FV = P * [((1 + r/n)^(nt) - 1) / (r/n)]
      const totalInvested = monthlyContribution * ((Math.pow(1 + rate/n, n*t) - 1) / (rate/n));

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
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = () => {
    if (impact?.swap) {
      const decision: Decision = {
        id: Math.random().toString(36).substr(2, 9),
        item: impact.item,
        category: impact.category,
        savings: impact.swap.savings,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        originalPrice: impact.price,
        type: 'swap'
      };
      onAction(decision);
      setImpact(null);
      setItem('');
      setPrice('');
    }
  };

  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto min-h-screen bg-teal-50/20">
      <div className="max-w-md mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">Money Lens</h2>
        <p className="text-gray-500 mb-10 font-medium">Pause. Calculate. Decide with clarity.</p>
        
        {!impact ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="bg-white rounded-[40px] p-10 shadow-xl shadow-teal-900/5 border border-gray-100">
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">What are you buying?</label>
                  <input 
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="e.g. Afternoon Starbucks"
                    className="w-full p-6 rounded-3xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-400 outline-none text-gray-800 font-semibold transition-all text-lg placeholder:text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Cost ($)</label>
                    <input 
                      type="number"
                      inputMode="decimal"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full p-6 rounded-3xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-400 outline-none text-gray-800 font-semibold transition-all text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Frequency</label>
                    <div className="w-full p-6 rounded-3xl bg-gray-50 text-gray-400 font-bold text-sm text-center">WEEKLY</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-5 py-3 rounded-2xl text-[10px] font-bold transition-all uppercase tracking-widest ${
                          category === cat ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={calculateImpact}
                disabled={loading || !item || !price}
                className="w-full mt-12 bg-teal-600 text-white font-bold py-6 rounded-[28px] shadow-2xl shadow-teal-200 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 text-lg tracking-tight"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Simulating Future...
                  </span>
                ) : 'Reveal Impact'}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in duration-500 space-y-10">
            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-9xl pointer-events-none">📊</div>
              <h3 className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Annual Cost of this Decision</h3>
              <p className="text-center text-6xl font-bold text-gray-800 mb-12 tabular-nums tracking-tighter">${impact.yearlyCost.toLocaleString()}</p>
              
              <div className="p-8 bg-teal-600 rounded-[32px] text-white text-center shadow-2xl relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-80">5 Year Growth Potential</p>
                <p className="text-5xl font-bold mb-3 tabular-nums tracking-tight">${Math.round(impact.fiveYearInvested).toLocaleString()}</p>
                <p className="text-[10px] opacity-60 italic leading-tight px-4">Based on historical 6% market returns compounding monthly. Your mileage may vary.</p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-[40px] p-10 border border-orange-100 shadow-xl shadow-orange-900/5">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl">💡</span>
                <h4 className="text-orange-900 text-2xl font-bold tracking-tight">Smart Swap</h4>
              </div>
              
              {impact.swap && (
                <div className="space-y-8">
                  <div className="bg-white/70 backdrop-blur-md p-8 rounded-[32px] shadow-sm border border-orange-200/50">
                     <p className="text-orange-400 text-[10px] mb-2 uppercase font-bold tracking-[0.15em]">Recommended Action</p>
                     <p className="text-orange-900 font-bold text-xl mb-3">{impact.swap.name}</p>
                     <p className="text-orange-700/80 text-sm italic leading-relaxed font-medium">"{impact.swap.reason}"</p>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white p-8 rounded-[32px] shadow-sm">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Weekly Saving</p>
                      <p className="text-4xl font-bold text-teal-600 tracking-tighter">${impact.swap.savings.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={handleAction}
                      className="bg-orange-500 text-white font-bold px-10 py-6 rounded-3xl shadow-xl shadow-orange-200 active:scale-95 transition-all text-sm uppercase tracking-widest"
                    >
                      CHOOSE SWAP
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button onClick={() => setImpact(null)} className="w-full text-gray-400 text-xs font-bold uppercase tracking-[0.2em] py-6 hover:text-gray-600 transition-colors">
              Reset & Try Another Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyLens;


import React, { useEffect, useState } from 'react';
import { revenueCat } from '../services/revenueCatService';

interface PaywallProps {
  onClose: () => void;
  onSubscribe: () => void;
}

const Paywall: React.FC<PaywallProps> = ({ onClose, onSubscribe }) => {
  const [offerings, setOfferings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const fetchOfferings = async () => {
      const data = await revenueCat.getOfferings();
      setOfferings(data);
      setLoading(false);
    };
    fetchOfferings();
  }, []);

  const handlePurchase = async (pkg: any) => {
    setPurchasing(true);
    const success = await revenueCat.purchasePackage(pkg);
    if (success) {
      onSubscribe();
    }
    setPurchasing(false);
  };

  const currentPackage = offerings?.current?.monthly;

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto px-6 pt-12 animate-in slide-in-from-bottom duration-500">
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 text-3xl p-2">&times;</button>
      
      <div className="text-center mt-8">
        <div className="inline-block p-6 bg-teal-50 rounded-[32px] mb-8 shadow-inner">
          <span className="text-5xl">🐣</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">NestEgg Plus</h2>
        <p className="text-gray-500 mb-10 px-6 leading-relaxed">Unlock the full toolkit for building your family's financial future.</p>
        
        <div className="space-y-4 mb-12 text-left">
          {[
            { icon: '✨', title: 'Unlimited Smart Swaps', desc: 'No daily limits on AI analysis.' },
            { icon: '🥗', title: '50+ Meal Templates', desc: 'Full access to the batch cooking library.' },
            { icon: '📈', title: 'Deep Projections', desc: 'See your nest egg 20 years into the future.' },
            { icon: '🔒', title: 'Privacy First', desc: 'Bank-level encryption for your decisions.' }
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-5 p-5 border border-teal-50 rounded-3xl bg-teal-50/30">
              <span className="text-2xl">{feat.icon}</span>
              <div>
                <h4 className="font-bold text-gray-800">{feat.title}</h4>
                <p className="text-xs text-gray-500 font-medium">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <button 
              onClick={() => handlePurchase(currentPackage)}
              disabled={purchasing}
              className="w-full bg-teal-600 text-white font-bold py-6 rounded-3xl shadow-2xl shadow-teal-200 active:scale-95 transition-all mb-4 text-lg"
            >
              {purchasing ? 'Securely Processing...' : `Try NestEgg Plus ${currentPackage?.product?.priceString || '$9.99'}/mo`}
            </button>
            <button 
              onClick={async () => {
                const restored = await revenueCat.restorePurchases();
                if (restored) onSubscribe();
              }}
              className="text-xs text-gray-400 font-bold uppercase tracking-widest hover:text-teal-600 transition-colors"
            >
              Restore Purchases
            </button>
          </div>
        )}
        
        <p className="text-[10px] text-gray-300 mt-12 px-8 leading-relaxed">
          Subscription automatically renews monthly. Payment will be charged to your Apple ID account at confirmation of purchase.
        </p>
        
        <div className="mt-8 flex justify-center gap-6 mb-12">
           <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-teal-600 text-[10px] font-bold uppercase tracking-widest">Privacy</a>
           <span className="text-gray-200">•</span>
           <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-teal-600 text-[10px] font-bold uppercase tracking-widest">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default Paywall;

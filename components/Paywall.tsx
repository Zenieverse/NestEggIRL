
import React from 'react';

interface PaywallProps {
  onClose: () => void;
  onSubscribe: () => void;
}

const Paywall: React.FC<PaywallProps> = ({ onClose, onSubscribe }) => {
  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto px-6 pt-12">
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 text-2xl">&times;</button>
      
      <div className="text-center mt-8">
        <div className="inline-block p-4 bg-teal-50 rounded-3xl mb-6">
          <span className="text-4xl">🥚</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">NestEgg Plus</h2>
        <p className="text-gray-500 mb-8 px-4">Unlock the full power of calm, smart financial decisions.</p>
        
        <div className="space-y-4 mb-10 text-left">
          {[
            { icon: '✨', title: 'Unlimited Swaps', desc: 'No limits on your decision support.' },
            { icon: '🥗', title: 'Full Meal Planner', desc: 'Access 50+ batch cooking recipes.' },
            { icon: '📈', title: 'Deep Projections', desc: 'See your future wealth with precision.' },
            { icon: '💌', title: 'Weekly Wisdom', desc: 'Personalized insights for your family.' }
          ].map((feat, i) => (
            <div key={i} className="flex items-start gap-4 p-4 border border-teal-100 rounded-2xl bg-teal-50/30">
              <span className="text-xl">{feat.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-800">{feat.title}</h4>
                <p className="text-sm text-gray-500">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onSubscribe}
          className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 active:scale-95 transition-transform mb-4"
        >
          Try NestEgg Plus $9.99/mo
        </button>
        <p className="text-xs text-gray-400">Cancel anytime. Secure checkout via RevenueCat.</p>
        
        <div className="mt-8 mb-12">
           <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-teal-600 text-sm font-medium">Billing Documentation</a>
        </div>
      </div>
    </div>
  );
};

export default Paywall;

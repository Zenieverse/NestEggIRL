
import React from 'react';
import { UserProfile } from '../types';
import { EDUCATION_CARDS } from '../constants';

interface DashboardProps {
  user: UserProfile;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setActiveTab }) => {
  const nextLesson = EDUCATION_CARDS.find(l => user.actionsCount < l.requirement) || EDUCATION_CARDS[EDUCATION_CARDS.length-1];
  const progressPercent = Math.min(100, (user.actionsCount / (nextLesson.requirement || 1)) * 100);

  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hello, Mama</h1>
          <p className="text-sm text-gray-500">Checking in on your nest egg.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-xl shadow-inner">
          🐣
        </div>
      </div>

      <div className="bg-teal-600 rounded-[40px] p-8 text-white shadow-2xl shadow-teal-200/50 mb-8 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
        <p className="text-teal-100 text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Total Impact Saved</p>
        <h2 className="text-5xl font-bold mb-8 tabular-nums tracking-tighter">${user.totalSaved.toLocaleString()}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <p className="text-[10px] text-teal-100 uppercase font-bold mb-1">Decisions</p>
            <p className="text-xl font-bold">{user.actionsCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-right">
            <p className="text-[10px] text-teal-100 uppercase font-bold mb-1">Level</p>
            <p className="text-xl font-bold">Sprout 🌱</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold text-gray-800">Your Focus Today</h3>
          <span className="text-xs text-teal-600 font-bold">VIEW ALL</span>
        </div>
        
        <button 
          onClick={() => setActiveTab('planner')}
          className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 active:scale-[0.98] transition-all hover:border-teal-100"
        >
          <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl">🍱</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800">Batch Cook & Save</h4>
            <p className="text-xs text-gray-400">Save up to $40 this week by prepping.</p>
          </div>
          <span className="text-teal-500 font-bold text-xl">→</span>
        </button>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">📚</div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">Next Lesson</h4>
              <p className="text-xs text-gray-400">{nextLesson.title}</p>
            </div>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">{user.actionsCount}/{nextLesson.requirement}</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-teal-500 h-full transition-all duration-1000" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-10 p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-6 tracking-widest">Recent Wins</h3>
        {user.history.length === 0 ? (
          <p className="text-center text-gray-400 italic py-4">No smart choices yet. Start with the Lens! 🔍</p>
        ) : (
          <div className="space-y-4">
            {user.history.slice(-3).reverse().map((h) => (
              <div key={h.id} className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                   <span className="text-xl">✨</span>
                   <div>
                     <p className="text-sm font-bold text-gray-700">{h.item}</p>
                     <p className="text-[10px] text-gray-400">{h.date}</p>
                   </div>
                </div>
                <span className="text-teal-600 font-bold">+${h.savings.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-8 text-[10px] text-gray-400 text-center uppercase tracking-widest px-8">
        ⚠️ This app provides projections for illustrative purposes. We do not provide financial advice.
      </p>
    </div>
  );
};

export default Dashboard;

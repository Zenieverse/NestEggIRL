
import React from 'react';
import { UserProfile } from '../types';
import { EDUCATION_CARDS } from '../constants';

interface DashboardProps {
  user: UserProfile;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setActiveTab }) => {
  const nextLesson = EDUCATION_CARDS.find(l => !user.completedLessons.includes(l.id) && user.actionsCount >= l.requirement) || 
                     EDUCATION_CARDS.find(l => !user.completedLessons.includes(l.id)) || 
                     EDUCATION_CARDS[EDUCATION_CARDS.length - 1];
  
  const isLocked = user.actionsCount < nextLesson.requirement;
  const progressPercent = Math.min(100, (user.actionsCount / (nextLesson.requirement || 1)) * 100);

  const thisWeekSavings = user.history.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
    return diff <= 7 ? acc + curr.savings : acc;
  }, 0);

  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Hi, Mama</h1>
          <p className="text-sm text-gray-500 font-medium">Your nest egg is growing beautifully.</p>
        </div>
        <button 
          onClick={() => setActiveTab('settings')}
          className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-xl hover:bg-gray-50 transition-all active:scale-95"
        >
          ⚙️
        </button>
      </div>

      <div className="bg-teal-600 rounded-[40px] p-8 text-white shadow-2xl shadow-teal-900/20 mb-10 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <p className="text-teal-100 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-80">Total Value Created</p>
          <h2 className="text-6xl font-bold mb-10 tabular-nums tracking-tighter">
            ${user.totalSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-white/10 shadow-lg">
              <p className="text-[10px] text-teal-100 uppercase font-bold mb-1 tracking-widest">Decisions</p>
              <p className="text-2xl font-bold">{user.actionsCount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-white/10 shadow-lg">
              <p className="text-[10px] text-teal-100 uppercase font-bold mb-1 tracking-widest">This Week</p>
              <p className="text-2xl font-bold">${thisWeekSavings.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">Financial Confidence</h3>
          <button onClick={() => setActiveTab('edu')} className="text-xs text-teal-600 font-bold hover:opacity-70 uppercase tracking-widest">VIEW ALL</button>
        </div>
        
        <button 
          onClick={() => setActiveTab('edu')}
          className="w-full text-left bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 group active:scale-[0.98] transition-all hover:border-teal-200"
        >
          <div className="flex items-center gap-5 mb-5">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${isLocked ? 'bg-gray-50 border border-gray-100' : 'bg-teal-50 shadow-inner'}`}>
              {isLocked ? '🔒' : '💡'}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-lg">{isLocked ? 'Next Step' : 'Ready to Learn'}</h4>
              <p className="text-sm text-gray-400 line-clamp-1">{nextLesson.title}</p>
            </div>
            {!isLocked && <span className="text-teal-500 font-bold text-2xl group-hover:translate-x-1 transition-transform">→</span>}
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-teal-500 h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(20,184,166,0.3)]" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          {isLocked && (
            <p className="mt-4 text-[10px] text-teal-600 font-bold uppercase tracking-wider">
              {nextLesson.requirement - user.actionsCount} more smart choices to unlock
            </p>
          )}
        </button>

        <div className="flex justify-between items-end mt-4">
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">Recent Wins</h3>
          <button onClick={() => setActiveTab('history')} className="text-xs text-teal-600 font-bold hover:opacity-70 uppercase tracking-widest">HISTORY</button>
        </div>

        <div className="bg-white rounded-[40px] p-2 border border-gray-100 shadow-sm">
          {user.history.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-3xl grayscale opacity-50">✨</div>
              <p className="text-sm text-gray-400 italic">Your smart journey starts here.</p>
              <button 
                onClick={() => setActiveTab('lens')}
                className="bg-teal-600 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all"
              >
                Launch Money Lens
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50 px-6">
              {user.history.slice(-3).reverse().map((h) => (
                <div key={h.id} className="py-6 flex justify-between items-center first:pt-4 last:pb-4">
                  <div className="flex gap-4 items-center">
                     <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-xl">✨</div>
                     <div>
                       <p className="text-sm font-bold text-gray-800">{h.item}</p>
                       <p className="text-[10px] text-gray-400 font-medium">{h.date} • {h.type.replace('_', ' ')}</p>
                     </div>
                  </div>
                  <div className="text-right">
                    <p className="text-teal-600 font-bold text-lg">+${h.savings.toFixed(2)}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">FUTURE VALUE</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 p-8 bg-teal-50/50 rounded-[40px] border border-teal-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-200/20 rounded-full -mr-12 -mt-12"></div>
        <p className="text-[10px] text-teal-400 font-bold uppercase tracking-[0.2em] mb-3">Daily Wisdom</p>
        <p className="text-md text-teal-800 italic font-medium leading-relaxed">
          "The first $1,000 you save and invest is the hardest. After that, your money starts doing the heavy lifting for you."
        </p>
      </div>

      <div className="mt-16 pt-10 border-t border-gray-100 text-center space-y-4">
        <div className="flex justify-center gap-8">
          <button className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-gray-600">Privacy</button>
          <button className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-gray-600">Terms</button>
          <button className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-gray-600">Support</button>
        </div>
        <p className="text-[9px] text-gray-300 font-medium">© 2025 NestEgg IRL • Built with Love for Mums</p>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState, useEffect } from 'react';
import { UserProfile, Decision } from './types';
import Onboarding from './views/Onboarding';
import Dashboard from './views/Dashboard';
import MoneyLens from './views/MoneyLens';
import BatchPlanner from './views/BatchPlanner';
import Education from './views/Education';
import BottomNav from './components/BottomNav';
import Paywall from './components/Paywall';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPaywall, setShowPaywall] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // Persistence Simulation with History
  useEffect(() => {
    const saved = localStorage.getItem('nestegg_user_v2');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('nestegg_user_v2', JSON.stringify(profile));
  };

  const handleAction = (decision: Decision) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      totalSaved: user.totalSaved + decision.savings,
      actionsCount: user.actionsCount + 1,
      history: [...user.history, decision]
    };
    setUser(updated);
    localStorage.setItem('nestegg_user_v2', JSON.stringify(updated));
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  };

  const handleSubscribe = () => {
    if (!user) return;
    const updated = { ...user, isPlus: true };
    setUser(updated);
    localStorage.setItem('nestegg_user_v2', JSON.stringify(updated));
    setShowPaywall(false);
  };

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F8FAF9] relative font-sans antialiased text-gray-800 shadow-2xl">
      {/* Confetti Overlay */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-[200] flex items-center justify-center">
          <div className="text-6xl animate-bounce drop-shadow-lg">✨💰🎉🌱✨</div>
        </div>
      )}

      {/* Paywall Overlay */}
      {showPaywall && (
        <Paywall 
          onClose={() => setShowPaywall(false)} 
          onSubscribe={handleSubscribe} 
        />
      )}

      {/* Main Viewport */}
      <div className="min-h-screen relative">
        <div className="transition-opacity duration-300 ease-in-out">
          {activeTab === 'dashboard' && <Dashboard user={user} setActiveTab={setActiveTab} />}
          {activeTab === 'lens' && (
            <MoneyLens 
              user={user} 
              onAction={handleAction} 
              showPaywall={() => setShowPaywall(true)} 
            />
          )}
          {activeTab === 'planner' && (
            <BatchPlanner 
              user={user} 
              showPaywall={() => setShowPaywall(true)} 
            />
          )}
          {activeTab === 'edu' && <Education user={user} />}
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;

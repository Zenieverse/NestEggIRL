
import React, { useState, useEffect } from 'react';
import { UserProfile, Decision } from './types';
import Onboarding from './views/Onboarding';
import Dashboard from './views/Dashboard';
import MoneyLens from './views/MoneyLens';
import BatchPlanner from './views/BatchPlanner';
import Education from './views/Education';
import Settings from './views/Settings';
import History from './views/History';
import BottomNav from './components/BottomNav';
import Paywall from './components/Paywall';
import { revenueCat } from './services/revenueCatService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPaywall, setShowPaywall] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);

  // Persistence logic & RevenueCat Sync
  useEffect(() => {
    const initApp = async () => {
      const saved = localStorage.getItem('nestegg_market_v1');
      let currentUser: UserProfile | null = null;
      
      if (saved) {
        currentUser = JSON.parse(saved);
        setUser(currentUser);
      }

      // Initialize RevenueCat with safety to prevent hang
      try {
        await revenueCat.init(currentUser?.joinedDate);
        
        // Check for active subscriptions if we have a user
        if (currentUser) {
          const hasEntitlement = await revenueCat.checkEntitlementStatus();
          if (hasEntitlement !== currentUser.isPlus) {
            const updated = { ...currentUser, isPlus: hasEntitlement };
            setUser(updated);
            localStorage.setItem('nestegg_market_v1', JSON.stringify(updated));
          }
        }
      } catch (err) {
        console.error("App: Initialization error", err);
      } finally {
        setIsSyncing(false);
      }
    };

    initApp();
  }, []);

  const saveUser = (u: UserProfile) => {
    setUser(u);
    localStorage.setItem('nestegg_market_v1', JSON.stringify(u));
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    const finalProfile: UserProfile = {
      ...profile,
      joinedDate: new Date().toISOString(),
      completedLessons: ['etf-intro'],
      history: [],
      totalSaved: 0,
      actionsCount: 0,
      onboarded: true
    } as UserProfile;
    saveUser(finalProfile);
    revenueCat.init(finalProfile.joinedDate);
  };

  const handleAction = (decision: Decision) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      totalSaved: user.totalSaved + decision.savings,
      actionsCount: user.actionsCount + 1,
      history: [...user.history, decision]
    };
    saveUser(updated);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4500);
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!user) return;
    if (user.completedLessons.includes(lessonId)) return;
    const updated: UserProfile = {
      ...user,
      completedLessons: [...user.completedLessons, lessonId]
    };
    saveUser(updated);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem('nestegg_market_v1');
    setUser(null);
    setActiveTab('dashboard');
  };

  const handleSubscribeSuccess = () => {
    if (!user) return;
    const updated = { ...user, isPlus: true };
    saveUser(updated);
    setShowPaywall(false);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 6000);
  };

  const handleRestoreSuccess = (isPlus: boolean) => {
    if (!user) return;
    if (isPlus !== user.isPlus) {
      saveUser({ ...user, isPlus });
    }
  };

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const showNav = ['dashboard', 'lens', 'planner', 'edu'].includes(activeTab);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F8FAF9] relative font-sans antialiased text-gray-800 shadow-2xl flex flex-col transition-all duration-500 overflow-hidden">
      {/* Syncing Overlay */}
      {isSyncing && (
        <div className="fixed inset-0 bg-white z-[500] flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Restoring Session...</p>
        </div>
      )}

      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-[300] flex items-center justify-center">
          <div className="text-7xl animate-bounce drop-shadow-2xl select-none">✨💰🎉🌱✨</div>
        </div>
      )}

      {showPaywall && (
        <Paywall 
          onClose={() => setShowPaywall(false)} 
          onSubscribe={handleSubscribeSuccess} 
        />
      )}

      <main className="flex-1 relative overflow-y-auto">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out h-full">
          {activeTab === 'dashboard' && <Dashboard user={user} setActiveTab={setActiveTab} />}
          {activeTab === 'lens' && <MoneyLens user={user} onAction={handleAction} showPaywall={() => setShowPaywall(true)} />}
          {activeTab === 'planner' && <BatchPlanner user={user} onCommit={handleAction} showPaywall={() => setShowPaywall(true)} />}
          {activeTab === 'edu' && <Education user={user} onCompleteLesson={handleCompleteLesson} />}
          {activeTab === 'settings' && (
            <Settings 
              user={user} 
              onUpdate={saveUser} 
              onReset={handleReset} 
              showPaywall={() => setShowPaywall(true)}
              onBack={() => setActiveTab('dashboard')}
              onRestore={handleRestoreSuccess}
            />
          )}
          {activeTab === 'history' && <History user={user} onBack={() => setActiveTab('dashboard')} />}
        </div>
      </main>

      {showNav && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default App;

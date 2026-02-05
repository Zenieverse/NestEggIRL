
import React, { useState } from 'react';
import { UserProfile, HouseholdSize, BudgetRange, InvestingLevel } from '../types';
import { revenueCat } from '../services/revenueCatService';

interface SettingsProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
  onReset: () => void;
  showPaywall: () => void;
  onBack: () => void;
  onRestore: (isPlus: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate, onReset, showPaywall, onBack, onRestore }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [editProfile, setEditProfile] = useState<Partial<UserProfile>>({
    householdSize: user.householdSize,
    weeklyBudget: user.weeklyBudget,
    investingLevel: user.investingLevel
  });

  const handleSave = () => {
    onUpdate({ ...user, ...editProfile } as UserProfile);
    setIsEditing(false);
  };

  const handleRestore = async () => {
    setIsRestoring(true);
    const success = await revenueCat.restorePurchases();
    onRestore(success);
    setIsRestoring(false);
    alert(success ? "Purchases successfully restored!" : "No active subscriptions found to restore.");
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `nestegg_data_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto max-w-md mx-auto min-h-screen bg-gray-50/50">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-teal-600 transition-all">←</button>
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        </div>
        {isEditing ? (
          <button onClick={handleSave} className="text-teal-600 font-bold text-sm uppercase tracking-widest px-4 py-2 bg-teal-50 rounded-xl">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-gray-400 font-bold text-sm uppercase tracking-widest">Edit</button>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-6 tracking-widest">Family Profile</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Household Size</span>
              {isEditing ? (
                <select 
                  value={editProfile.householdSize} 
                  onChange={(e) => setEditProfile({...editProfile, householdSize: e.target.value as HouseholdSize})}
                  className="bg-teal-50 text-teal-700 font-bold p-2 rounded-xl outline-none appearance-none"
                >
                  <option value="1-2">1-2 People</option>
                  <option value="3-4">3-4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              ) : (
                <span className="font-bold text-gray-800">{user.householdSize}</span>
              )}
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-50">
              <span className="text-gray-500 font-medium">Weekly Budget</span>
              {isEditing ? (
                <select 
                  value={editProfile.weeklyBudget} 
                  onChange={(e) => setEditProfile({...editProfile, weeklyBudget: e.target.value as BudgetRange})}
                  className="bg-teal-50 text-teal-700 font-bold p-2 rounded-xl outline-none appearance-none"
                >
                  <option value="Under $150">Under $150</option>
                  <option value="$150-$250">$150-$250</option>
                  <option value="$250+">$250+</option>
                </select>
              ) : (
                <span className="font-bold text-gray-800">{user.weeklyBudget}</span>
              )}
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-50">
              <span className="text-gray-500 font-medium">Comfort Level</span>
              {isEditing ? (
                <select 
                  value={editProfile.investingLevel} 
                  onChange={(e) => setEditProfile({...editProfile, investingLevel: e.target.value as InvestingLevel})}
                  className="bg-teal-50 text-teal-700 font-bold p-2 rounded-xl outline-none appearance-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Curious">Curious</option>
                  <option value="Ready">Ready</option>
                </select>
              ) : (
                <span className="font-bold text-gray-800">{user.investingLevel}</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-6 tracking-widest">Subscription</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${user.isPlus ? 'bg-teal-50 text-teal-600' : 'bg-gray-50 text-gray-300'}`}>
                {user.isPlus ? '✨' : '🐣'}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">{user.isPlus ? 'NestEgg Plus' : 'Free Plan'}</p>
                <p className="text-xs text-gray-400">{user.isPlus ? 'Billed monthly' : 'Upgrade for full access'}</p>
              </div>
            </div>
            {!user.isPlus ? (
              <button 
                onClick={showPaywall}
                className="bg-teal-600 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg shadow-teal-100 active:scale-95 transition-all"
              >
                UPGRADE
              </button>
            ) : (
              <span className="text-teal-600 text-[10px] font-bold bg-teal-50 px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
            )}
          </div>
          <button 
            disabled={isRestoring}
            onClick={handleRestore}
            className="w-full text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-6 hover:text-teal-600 transition-colors"
          >
            {isRestoring ? 'Syncing...' : 'Restore Purchases'}
          </button>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-6 tracking-widest">Data & Privacy</h3>
          <div className="space-y-4">
            <button 
              onClick={exportData}
              className="w-full text-left text-gray-600 font-medium py-2 flex justify-between items-center hover:text-teal-600 transition-colors"
            >
              Export My Data <span>📤</span>
            </button>
            <button 
              onClick={() => {
                if (window.confirm("This will wipe all your progress and history. Are you sure?")) {
                  onReset();
                }
              }}
              className="w-full text-left text-red-500 font-bold py-2 flex justify-between items-center border-t border-gray-50 pt-4"
            >
              Reset NestEgg <span>🗑️</span>
            </button>
          </div>
        </div>
        
        <div className="pt-10 text-center space-y-6 pb-12">
           <div className="flex justify-center gap-8 opacity-20 text-2xl">
             <span title="iOS Optimized">📱</span>
             <span title="Encrypted Data">🔒</span>
             <span title="RevenueCat Secure">💳</span>
           </div>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Build 1.0.42-RC • TestFlight Ready</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

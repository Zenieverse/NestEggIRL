
import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'lens', label: 'Lens', icon: '🔍' },
    { id: 'planner', label: 'Meals', icon: '🍱' },
    { id: 'edu', label: 'Learn', icon: '🌱' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 safe-area-bottom z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            activeTab === tab.id ? 'text-teal-600' : 'text-gray-400'
          }`}
        >
          <span className="text-xl mb-1">{tab.icon}</span>
          <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;

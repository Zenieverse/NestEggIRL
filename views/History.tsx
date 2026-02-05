
import React from 'react';
import { UserProfile } from '../types';

interface HistoryProps {
  user: UserProfile;
  onBack: () => void;
}

const History: React.FC<HistoryProps> = ({ user, onBack }) => {
  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto max-w-md mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-gray-400 text-2xl hover:text-teal-600 transition-colors">←</button>
        <h2 className="text-2xl font-bold text-gray-800">Decision History</h2>
      </div>

      {user.history.length === 0 ? (
        <div className="text-center py-20 opacity-50 space-y-4">
          <span className="text-6xl">🏜️</span>
          <p className="text-gray-500 font-medium">No history yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {user.history.slice().reverse().map((h) => (
            <div key={h.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex justify-between items-center group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl group-hover:bg-teal-50 transition-colors">
                  {h.category === 'Groceries' ? '🛒' : h.category === 'Home' ? '🏠' : h.category === 'Kids' ? '🧸' : '🍱'}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{h.item}</h4>
                  <p className="text-xs text-gray-400">{h.date} • {h.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-teal-600 font-bold">${h.savings.toFixed(2)}</p>
                {/* Fix: Check if originalPrice exists before calling toFixed */}
                {h.originalPrice !== undefined && (
                  <p className="text-[10px] text-gray-300 line-through">${h.originalPrice.toFixed(2)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;

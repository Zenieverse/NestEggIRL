
import React, { useState } from 'react';
import { EDUCATION_CARDS } from '../constants';
import { UserProfile, Lesson } from '../types';

interface EducationProps {
  user: UserProfile;
}

const Education: React.FC<EducationProps> = ({ user }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Investing Basics</h2>
      <p className="text-gray-500 mb-8">Building confidence, one bite-sized lesson at a time.</p>

      <div className="grid grid-cols-1 gap-6">
        {EDUCATION_CARDS.map((lesson) => {
          const isUnlocked = user.actionsCount >= lesson.requirement;
          
          return (
            <div 
              key={lesson.id}
              onClick={() => isUnlocked && setSelectedLesson(lesson)}
              className={`p-6 rounded-[32px] border transition-all ${
                isUnlocked 
                  ? 'bg-white border-gray-100 shadow-sm cursor-pointer hover:border-teal-200' 
                  : 'bg-gray-50 border-gray-100 opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                  isUnlocked ? 'bg-teal-50 text-teal-600' : 'bg-gray-200 text-gray-400'
                }`}>
                  {isUnlocked ? '🌱' : '🔒'}
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lesson.duration}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{lesson.title}</h3>
              {!isUnlocked && (
                <p className="text-xs text-teal-600 font-medium">Unlock after {lesson.requirement} smart actions.</p>
              )}
            </div>
          );
        })}
      </div>

      {selectedLesson && (
        <div className="fixed inset-0 z-[110] bg-white p-8 overflow-y-auto animate-in fade-in slide-in-from-bottom duration-500">
          <button 
            onClick={() => setSelectedLesson(null)}
            className="mb-8 text-teal-600 font-bold flex items-center gap-2"
          >
            ← Back to Lessons
          </button>
          
          <div className="mb-8 p-4 bg-teal-50 rounded-3xl inline-block">
            <span className="text-3xl">💡</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedLesson.title}</h2>
          <div className="prose prose-teal">
            <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-teal-200 pl-4 mb-6">
              "Building wealth is for everyone, especially mums who manage households every day."
            </p>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {selectedLesson.content}
            </p>
          </div>
          
          <button 
            onClick={() => setSelectedLesson(null)}
            className="w-full mt-12 bg-teal-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-teal-100 active:scale-95 transition-transform"
          >
            I've got it!
          </button>
        </div>
      )}
    </div>
  );
};

export default Education;

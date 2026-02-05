
import React, { useState } from 'react';
import { EDUCATION_CARDS } from '../constants';
import { UserProfile, Lesson } from '../types';

interface EducationProps {
  user: UserProfile;
  onCompleteLesson: (lessonId: string) => void;
}

const Education: React.FC<EducationProps> = ({ user, onCompleteLesson }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleLessonFinish = () => {
    if (selectedLesson) {
      onCompleteLesson(selectedLesson.id);
      setSelectedLesson(null);
    }
  };

  return (
    <div className="pb-24 px-6 pt-12 overflow-y-auto min-h-screen max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Knowledge Base</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">Simple steps to financial independence.</p>

      <div className="grid grid-cols-1 gap-6">
        {EDUCATION_CARDS.map((lesson) => {
          const isUnlocked = user.actionsCount >= lesson.requirement;
          const isCompleted = user.completedLessons.includes(lesson.id);
          
          return (
            <div 
              key={lesson.id}
              onClick={() => isUnlocked && setSelectedLesson(lesson)}
              className={`p-6 rounded-[32px] border transition-all relative overflow-hidden group ${
                isUnlocked 
                  ? 'bg-white border-gray-100 shadow-sm cursor-pointer hover:border-teal-300' 
                  : 'bg-gray-50 border-gray-100 opacity-60'
              }`}
            >
              {isCompleted && (
                <div className="absolute top-0 right-0 p-3">
                  <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">COMPLETED</span>
                </div>
              )}
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                  isUnlocked ? 'bg-teal-50 text-teal-600' : 'bg-gray-200 text-gray-400'
                }`}>
                  {isUnlocked ? (isCompleted ? '✅' : '🌱') : '🔒'}
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lesson.duration}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors">{lesson.title}</h3>
              {!isUnlocked ? (
                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Unlock at {lesson.requirement} smart actions</p>
              ) : (
                <p className="text-xs text-gray-400">{isCompleted ? 'Review this lesson' : 'Start learning'}</p>
              )}
            </div>
          );
        })}
      </div>

      {selectedLesson && (
        <div className="fixed inset-0 z-[210] bg-white p-10 overflow-y-auto animate-in slide-in-from-bottom duration-500">
          <div className="max-w-sm mx-auto">
            <button 
              onClick={() => setSelectedLesson(null)}
              className="mb-8 text-teal-600 font-bold flex items-center gap-2 uppercase text-xs tracking-widest"
            >
              ← Back to Library
            </button>
            
            <div className="mb-8 p-4 bg-teal-50 rounded-3xl inline-block shadow-inner">
              <span className="text-3xl">💡</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6 tracking-tight leading-tight">{selectedLesson.title}</h2>
            
            <div className="prose prose-teal">
              <p className="text-lg text-gray-500 leading-relaxed italic border-l-4 border-teal-200 pl-6 mb-8 py-2">
                "Small, consistent choices are the foundation of massive long-term wealth."
              </p>
              <div className="text-gray-700 text-lg leading-relaxed space-y-6">
                {selectedLesson.content.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleLessonFinish}
              className="w-full mt-16 bg-teal-600 text-white font-bold py-5 rounded-[24px] shadow-2xl shadow-teal-100 active:scale-95 transition-all text-lg"
            >
              Got it, let's go!
            </button>
            <div className="h-20" /> {/* Spacer */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;

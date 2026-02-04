
import React, { useState } from 'react';
import { UserProfile, HouseholdSize, BudgetRange, InvestingLevel } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    onboarded: true,
    isPlus: false,
    totalSaved: 0,
    actionsCount: 0,
    unlockedLessons: ['etf-intro'],
    history: []
  });

  const steps = [
    {
      title: "Welcome to NestEgg",
      desc: "A calm space for mums to make smarter money choices without the stress.",
      image: "https://images.unsplash.com/photo-1536640712247-c45474d43b2b?q=80&w=800&auto=format&fit=crop",
      isWelcome: true
    },
    {
      title: "Your Household",
      desc: "How many hungry mouths are we looking after?",
      options: ['1-2', '3-4', '5+'],
      key: 'householdSize'
    },
    {
      title: "Weekly Grocery Spend",
      desc: "Roughly how much do you spend at the checkout?",
      options: ['Under $150', '$150-$250', '$250+'],
      key: 'weeklyBudget'
    },
    {
      title: "Investing Comfort",
      desc: "How do you feel about the word 'Investing'?",
      options: ['Beginner', 'Curious', 'Ready'],
      key: 'investingLevel'
    }
  ];

  const current = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(profile as UserProfile);
    }
  };

  const selectOption = (val: string) => {
    setProfile({ ...profile, [current.key!]: val });
    handleNext();
  };

  return (
    <div className="min-h-screen bg-white px-6 flex flex-col justify-center max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-teal-50/30 -z-10 rounded-b-[100px]"></div>
      
      <div className="mb-8">
        <div className="flex gap-2 mb-12">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-teal-500 w-4' : 'bg-gray-100'}`} />
          ))}
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight leading-tight">{current.title}</h1>
        <p className="text-gray-500 text-lg leading-relaxed">{current.desc}</p>
      </div>

      {current.isWelcome && (
        <div className="space-y-6">
          <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-teal-100/50 transform hover:scale-[1.02] transition-transform">
            <img src={current.image} alt="Welcome" className="w-full h-56 object-cover" />
          </div>
          <button
            onClick={() => setStep(1)}
            className="w-full bg-black text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
          >
            <span className="text-xl"></span> Continue with Apple
          </button>
          <button
            onClick={() => setStep(1)}
            className="w-full text-gray-400 font-medium py-2 text-sm"
          >
            Or continue as guest
          </button>
        </div>
      )}

      {current.options && (
        <div className="space-y-4">
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => selectOption(opt)}
              className="w-full p-6 text-left rounded-3xl border-2 border-gray-100 bg-white hover:border-teal-500 hover:bg-teal-50/50 transition-all font-semibold text-gray-700 active:scale-[0.98] shadow-sm flex justify-between items-center group"
            >
              {opt}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-500">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Onboarding;

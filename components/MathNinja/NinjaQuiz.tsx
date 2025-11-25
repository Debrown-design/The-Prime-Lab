import React, { useEffect, useState } from 'react';
import { generatePreGameQuestions } from '../../services/geminiService';
import { User, QuizQuestion, InventoryItem } from '../../types';
import Button from '../Button';
import { Gift, Loader2, Trophy } from 'lucide-react';

interface QuizProps {
  user: User;
  onComplete: (item: InventoryItem | null) => void;
}

const NinjaQuiz: React.FC<QuizProps> = ({ user, onComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const q = await generatePreGameQuestions(user.age);
      setQuestions(q);
      setLoading(false);
    };
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleAnswer = (optionIdx: number) => {
    if (optionIdx === questions[currentIdx].correctAnswerIndex) {
      setScore(s => s + 1);
    }
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(c => c + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleCollectReward = () => {
    const reward: InventoryItem | null = score >= 2 ? {
      id: 'legendary-katana',
      name: 'Legendary Katana',
      description: 'A blade forged in logic.',
      bonus: 'Double Points',
      icon: '⚔️'
    } : null;
    
    onComplete(reward);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <Loader2 size={64} className="animate-spin mb-4 text-yellow-500" />
        <h2 className="text-2xl arcade-font">Summoning Questions...</h2>
        <p className="text-red-200">Consulting the AI Spirits</p>
      </div>
    );
  }

  if (completed) {
    const passed = score >= 2;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fade-in">
        <div className="bg-slate-900 border-4 border-yellow-500 p-8 rounded-2xl max-w-md text-center shadow-2xl">
          <Trophy size={64} className={`mx-auto mb-4 ${passed ? 'text-yellow-400' : 'text-gray-500'}`} />
          <h2 className="text-3xl text-white mb-2 arcade-font">{passed ? 'EXCELLENT!' : 'NICE TRY'}</h2>
          <p className="text-gray-300 mb-6">
            You answered {score} out of {questions.length} correctly.
          </p>
          
          {passed ? (
            <div className="bg-yellow-500/10 border border-yellow-500/50 p-4 rounded-lg mb-8">
              <p className="text-yellow-200 text-sm uppercase font-bold mb-2">Item Unlocked</p>
              <div className="text-4xl mb-2">⚔️</div>
              <h3 className="text-xl font-bold text-white">Legendary Katana</h3>
              <p className="text-sm text-yellow-100">Double points in next game!</p>
            </div>
          ) : (
            <div className="bg-red-900/50 p-4 rounded-lg mb-8">
              <p className="text-red-200">You need at least 2 correct answers to get the legendary item. But you can still fight!</p>
            </div>
          )}

          <Button onClick={handleCollectReward} className="w-full">
            START BLITZ
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          {questions.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${i <= currentIdx ? 'bg-yellow-500' : 'bg-red-900/30'}`} />
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-b-8 border-red-900">
          <div className="bg-red-800 p-6 text-white flex justify-between items-center">
            <span className="font-bold opacity-75">Question {currentIdx + 1}</span>
            <span className="bg-red-900 px-3 py-1 rounded-full text-xs font-bold border border-red-700">MATH NINJA</span>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">{currentQ.question}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="bg-gray-100 hover:bg-yellow-100 border-2 border-gray-200 hover:border-yellow-500 p-4 rounded-xl text-left transition-all font-bold text-lg text-gray-700 active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NinjaQuiz;
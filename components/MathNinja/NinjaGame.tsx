
import React, { useState, useEffect, useRef } from 'react';
import { NinjaProgress, QuizQuestion } from '../../types';
import { generateMathQuestion } from '../../services/mathService';
import Button from '../Button';
import { Heart, Pause, Play, Timer, Bomb, XCircle } from 'lucide-react';

interface GameProps {
  progress: NinjaProgress;
  updateProgress: (newProgress: Partial<NinjaProgress>) => void;
  onExit: () => void;
}

type Phase = 'INTRO' | 'SLICING' | 'QUIZ' | 'FEEDBACK' | 'GAME_OVER' | 'COMPLETED';

interface Fruit {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'fruit' | 'bomb';
  sliced: boolean;
  emoji: string;
}

const SWORDS = {
  'default': { id: 'default', img: 'https://cdn-icons-png.flaticon.com/512/1065/1065511.png' }, // Basic fallback
  'diamond': { id: 'diamond', img: 'https://wallpapercave.com/wp/wp6922828.jpg' },
  'fire': { id: 'fire', img: 'https://i.pinimg.com/originals/0a/82/a4/0a82a4b28edb152c46074521912f9176.jpg' }
};

const NinjaGame: React.FC<GameProps> = ({ progress, updateProgress, onExit }) => {
  const [phase, setPhase] = useState<Phase>('SLICING');
  const [score, setScore] = useState(0); // Score accumulated this session
  const [streak, setStreak] = useState(0); // Correct answers streak
  const [lives, setLives] = useState(progress.lives);
  const [timer, setTimer] = useState(60);
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [fruitsSlicedCount, setFruitsSlicedCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong', msg: string, points?: number } | null>(null);
  const [isSlashing, setIsSlashing] = useState(false); // Animation state
  
  // Game Refs
  const requestRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const REQUIRED_FRUITS = 5; // Fruits to slice before quiz

  // Load question on mount
  useEffect(() => {
    setCurrentQuestion(generateMathQuestion(progress.level));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.level]);

  // Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (phase === 'SLICING' || phase === 'QUIZ') {
      interval = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            handleTimeout();
            return 60; // Reset visual, though logic handles phase change
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleTimeout = () => {
    if (phase === 'SLICING') {
      // Penalty for taking too long to slice fruits
      setScore(s => Math.max(0, s - 5));
      // Force move to quiz anyway
      startQuizPhase();
    } else if (phase === 'QUIZ') {
      handleAnswer(false, -1); // Wrong answer, -1 point penalty, lose life
    }
  };

  const startQuizPhase = () => {
    setPhase('QUIZ');
    setTimer(60);
    setFruits([]); // Clear fruits
  };

  // --- SLICING PHASE LOGIC ---

  const spawnFruit = () => {
    const isBomb = Math.random() < 0.2; // 20% chance bomb
    const emojis = ['🍉', '🍊', '🍎', '🍌', '🥥', '🍍'];
    
    const newFruit: Fruit = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10-90% width
      y: 100, // Start at bottom
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(Math.random() * 1.5 + 2), // Upward velocity
      type: isBomb ? 'bomb' : 'fruit',
      sliced: false,
      emoji: isBomb ? '💣' : emojis[Math.floor(Math.random() * emojis.length)]
    };
    setFruits(prev => [...prev, newFruit]);
  };

  const updatePhysics = () => {
    setFruits(prev => {
      return prev.map(f => ({
        ...f,
        x: f.x + f.vx,
        y: f.y + f.vy,
        vy: f.vy + 0.05 // Gravity
      })).filter(f => f.y < 110); // Remove if falls off screen
    });

    // Check Collisions
    setFruits(prev => prev.map(f => {
      if (f.sliced) return f;
      // Simple distance check (assuming screen coordinates)
      // We map cursor % to actual positions roughly or just check proximity logic
      // For this implementation, we'll rely on onMouseEnter events on the DOM elements for better responsiveness in React
      return f;
    }));

    if (phase === 'SLICING') {
      const now = Date.now();
      if (now - lastSpawnRef.current > 1000) { // Spawn every second
        spawnFruit();
        lastSpawnRef.current = now;
      }
      requestRef.current = requestAnimationFrame(updatePhysics);
    }
  };

  useEffect(() => {
    if (phase === 'SLICING') {
      setFruitsSlicedCount(0); // Reset for this round
      requestRef.current = requestAnimationFrame(updatePhysics);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [phase]);

  const handleSlice = (fruit: Fruit) => {
    if (fruit.sliced || phase !== 'SLICING') return;

    // Trigger Slash Animation
    setIsSlashing(true);
    setTimeout(() => setIsSlashing(false), 200);

    if (fruit.type === 'bomb') {
      setScore(s => Math.max(0, s - 10)); // -10 points for bomb
      // Visual feedback?
    } else {
      setScore(s => s + 10);
      setFruitsSlicedCount(c => {
        const newCount = c + 1;
        if (newCount >= REQUIRED_FRUITS) {
          setTimeout(startQuizPhase, 500); // Slight delay then quiz
        }
        return newCount;
      });
    }

    // Mark sliced
    setFruits(prev => prev.map(f => f.id === fruit.id ? { ...f, sliced: true } : f));
  };

  // --- QUIZ PHASE LOGIC ---

  const handleAnswer = (isCorrect: boolean, penalty = 0) => {
    if (isCorrect) {
      const newScore = score + 10;
      setScore(newScore);
      setStreak(s => s + 1);
      
      // Check for sword unlock (Streak 3)
      let unlockMsg = "";
      let newSwords = [...progress.unlockedSwords];
      
      if (streak + 1 === 3) {
        if (!newSwords.includes('diamond')) {
           newSwords.push('diamond');
           unlockMsg = " & Diamond Sword Unlocked!";
        } else if (!newSwords.includes('fire')) {
           newSwords.push('fire');
           unlockMsg = " & Fire Sword Unlocked!";
        }
      }

      setFeedback({ type: 'correct', msg: `Correct! +10 Pts${unlockMsg}`, points: 10 });

      // Persist immediately on round success
      updateProgress({
         currentScore: progress.currentScore + 10,
         highScore: Math.max(progress.highScore, progress.currentScore + 10),
         totalRoundsPlayed: progress.totalRoundsPlayed + 1,
         unlockedSwords: newSwords
      });

    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setScore(s => s + penalty); // -1 if timeout
      setStreak(0); // Reset streak, but keep swords
      setFeedback({ type: 'wrong', msg: 'Wrong! -1 Life' });
      
      updateProgress({
        lives: newLives,
        lastLifeLost: newLives < progress.lives ? Date.now() : progress.lastLifeLost
      });

      if (newLives <= 0) {
        setTimeout(() => setPhase('GAME_OVER'), 1000);
        return;
      }
    }

    setPhase('FEEDBACK');
    setTimeout(() => {
      setFeedback(null);
      // Generate new question for next round
      setCurrentQuestion(generateMathQuestion(progress.level));
      setTimer(60);
      setPhase('SLICING'); // Back to slicing
    }, 1000); // 1 second screen
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }
  };

  // Get Current Sword Image
  const getSwordImage = () => {
    if (progress.equippedSwordId === 'diamond') return SWORDS.diamond.img;
    if (progress.equippedSwordId === 'fire') return SWORDS.fire.img;
    return SWORDS.default.img;
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden cursor-none bg-black select-none"
      onMouseMove={handleMouseMove}
      ref={gameAreaRef}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: 'url(https://tse1.mm.bing.net/th/id/OIP.9QQjlHVCFe4OL2GwagV5CAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3)' }}
      ></div>

      {/* Custom Cursor (Sword) */}
      <div 
        className="fixed pointer-events-none z-50"
        style={{ 
            left: cursorPos.x, 
            top: cursorPos.y,
            transform: 'translate(-50%, -50%)' 
        }}
      >
        <img 
            src={getSwordImage()} 
            alt="Sword" 
            className={`w-24 h-24 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] object-contain transition-transform duration-100 ease-out ${isSlashing ? '-rotate-[135deg] scale-125' : '-rotate-45'}`} 
        />
      </div>

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-30 pointer-events-none">
        <div className="flex flex-col gap-2">
           <div className="bg-black/70 backdrop-blur text-white px-4 py-2 rounded-lg border border-yellow-500/30 font-mono text-2xl flex items-center gap-3">
             <span>SCORE: <span className="text-yellow-400">{score + progress.currentScore}</span></span>
             <span className="text-sm text-gray-400">Streak: {streak} 🔥</span>
           </div>
           
           {/* Toolbox Preview with Animations */}
           <div className="bg-black/80 backdrop-blur p-3 rounded-xl border border-gray-700 flex flex-col gap-2 w-fit shadow-2xl transition-all duration-300">
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase border-b border-gray-700 pb-1">Equipment</span>
              <div className="flex gap-3 pointer-events-auto">
                  {progress.unlockedSwords.map(sid => {
                    const isEquipped = progress.equippedSwordId === sid;
                    return (
                        <div 
                        key={sid} 
                        className={`
                            relative w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                            ${isEquipped 
                                ? 'border-green-400 bg-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.4)] scale-110 z-10' 
                                : 'border-gray-600 bg-gray-900/50'
                            }
                        `}
                        >
                        <img 
                            src={SWORDS[sid as keyof typeof SWORDS]?.img} 
                            alt={sid} 
                            className={`w-8 h-8 object-contain drop-shadow-md transition-all ${isEquipped ? 'animate-pulse' : 'opacity-70 grayscale hover:grayscale-0 hover:opacity-100'}`} 
                        />
                        {isEquipped && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-black shadow-sm animate-ping" />
                        )}
                        </div>
                    );
                  })}
              </div>
           </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
            <div className="flex gap-1 bg-black/50 p-2 rounded-full">
            {[...Array(3)].map((_, i) => (
                <Heart key={i} fill={i < lives ? "#ef4444" : "none"} className={i < lives ? "text-red-500" : "text-gray-600"} />
            ))}
            </div>
            <div className={`flex items-center gap-2 font-bold px-3 py-1 rounded-lg ${timer < 10 ? 'bg-red-900/80 text-white animate-pulse' : 'bg-black/50 text-yellow-400'}`}>
                <Timer size={16} /> {timer}s
            </div>
        </div>
      </div>

      {/* Slicing Phase */}
      {phase === 'SLICING' && (
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 w-full text-center pointer-events-none">
             <h2 className="text-2xl text-white font-bold drop-shadow-md bg-black/30 inline-block px-4 py-1 rounded-full">
               SLICE {REQUIRED_FRUITS - fruitsSlicedCount} MORE FRUIT!
             </h2>
          </div>
          {fruits.map(f => (
            <div 
               key={f.id}
               className={`absolute text-6xl transition-transform duration-100 ${f.sliced ? 'scale-150 opacity-0' : 'scale-100'}`}
               style={{ left: `${f.x}%`, top: `${f.y}%` }}
               onMouseEnter={() => handleSlice(f)}
            >
               {f.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Quiz Phase */}
      {phase === 'QUIZ' && currentQuestion && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4 cursor-auto">
             <div className="bg-white text-black p-8 rounded-2xl max-w-2xl w-full shadow-2xl border-8 border-yellow-500 relative">
                 <h3 className="text-gray-500 font-bold uppercase tracking-widest mb-2">Grade {progress.level} Question</h3>
                 <h2 className="text-4xl font-bold mb-8 text-center">{currentQuestion.question}</h2>
                 <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(idx === currentQuestion.correctAnswerIndex)}
                          className="bg-gray-100 hover:bg-yellow-200 border-b-4 border-gray-300 hover:border-yellow-500 p-6 rounded-xl text-2xl font-bold transition-all active:scale-95"
                        >
                           {opt}
                        </button>
                    ))}
                 </div>
             </div>
        </div>
      )}

      {/* Feedback Overlay */}
      {phase === 'FEEDBACK' && feedback && (
         <div className={`absolute inset-0 z-50 flex items-center justify-center ${feedback.type === 'correct' ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
             <div className="text-center animate-bounce">
                <h1 className="text-6xl font-black text-white drop-shadow-lg">{feedback.msg}</h1>
                {feedback.points && <h2 className="text-4xl text-yellow-300 font-bold mt-2">+{feedback.points} PTS</h2>}
             </div>
         </div>
      )}

      {/* Game Over */}
      {phase === 'GAME_OVER' && (
         <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90">
             <div className="bg-zinc-900 p-8 rounded-2xl border-4 border-red-600 text-center max-w-md w-full">
                 <XCircle size={64} className="text-red-500 mx-auto mb-6" />
                 <h2 className="text-5xl text-white mb-2 arcade-font">GAME OVER</h2>
                 <p className="text-gray-400 mb-8 text-xl">Session Score: <span className="text-white font-bold">{score}</span></p>
                 
                 <Button onClick={onExit} className="w-full text-xl py-4">
                    RETURN TO DASHBOARD
                 </Button>
             </div>
         </div>
      )}

      {/* Completed (If we add a cap) */}
      {phase === 'COMPLETED' && (
         <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90">
             <div className="bg-zinc-900 p-8 rounded-2xl border-4 border-green-600 text-center">
                 <h2 className="text-4xl text-white mb-6">MISSION COMPLETE</h2>
                 <Button onClick={onExit}>RETURN HOME</Button>
             </div>
         </div>
      )}

    </div>
  );
};

export default NinjaGame;

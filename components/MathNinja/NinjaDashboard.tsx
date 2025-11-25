
import React from 'react';
import { Play, Trophy, Zap, Sword, Heart, History, TrendingUp, ArrowUpCircle } from 'lucide-react';
import { NinjaProgress } from '../../types';
import Button from '../Button';

interface DashboardProps {
  progress: NinjaProgress;
  onPlay: () => void;
  onBack: () => void;
  onLevelUp: () => void;
}

const NinjaDashboard: React.FC<DashboardProps> = ({ progress, onPlay, onBack, onLevelUp }) => {
  const nextLevelThreshold = progress.level * 1000;
  const canLevelUp = progress.currentScore >= nextLevelThreshold && progress.level < 12;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] animate-fade-in">
       {/* Header */}
       <div className="text-center mb-8 md:mb-12 relative">
         <button 
            onClick={onBack}
            className="absolute left-0 top-0 text-gray-500 hover:text-white transition-colors"
         >
             ← Back to Arcade
         </button>
         <h1 className="text-5xl md:text-7xl text-yellow-500 font-bold italic tracking-tighter drop-shadow-lg" style={{ fontFamily: 'Bangers, cursive' }}>MATH NINJA BLITZ</h1>
         <p className="text-gray-400 mt-2 text-lg md:text-xl font-medium tracking-wide">Grade {progress.level} Ninja Training</p>
       </div>

       {/* Grid */}
       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-[#18181b] p-6 rounded-2xl border border-zinc-800 relative overflow-hidden group shadow-lg">
             <div className="flex justify-between items-start mb-6">
               <span className="text-xs font-bold text-gray-500 tracking-wider">TOTAL ROUNDS</span>
               <Sword className="text-purple-500 group-hover:scale-110 transition-transform" size={24} />
             </div>
             <div className="text-5xl font-bold italic">{progress.totalRoundsPlayed}</div>
          </div>
          
           <div className="bg-[#18181b] p-6 rounded-2xl border border-zinc-800 relative overflow-hidden group shadow-lg">
             <div className="flex justify-between items-start mb-6">
               <span className="text-xs font-bold text-gray-500 tracking-wider">CURRENT SCORE</span>
               <Zap className="text-yellow-500 group-hover:scale-110 transition-transform" size={24} />
             </div>
             <div className="text-5xl font-bold italic">{progress.currentScore}</div>
          </div>

           <div className="bg-[#18181b] p-6 rounded-2xl border border-zinc-800 relative overflow-hidden group shadow-lg">
             <div className="flex justify-between items-start mb-6">
               <span className="text-xs font-bold text-gray-500 tracking-wider">HIGH SCORE</span>
               <Trophy className="text-orange-500 group-hover:scale-110 transition-transform" size={24} />
             </div>
             <div className="text-5xl font-bold italic">{progress.highScore}</div>
          </div>

          {/* Start Button Card */}
          <button 
            onClick={onPlay}
            disabled={progress.lives <= 0}
            className={`p-6 rounded-2xl border-b-8 active:border-b-0 active:translate-y-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 shadow-xl group ${progress.lives > 0 ? 'bg-green-600 hover:bg-green-500 border-green-800' : 'bg-gray-700 border-gray-900 cursor-not-allowed'}`}
          >
             <Play fill="white" size={56} className="group-hover:scale-110 transition-transform" />
             <span className="text-3xl font-bold italic font-sans">{progress.lives > 0 ? 'START GAME' : 'RECOVERING...'}</span>
             <div className="flex gap-2 opacity-80">
                {[...Array(3)].map((_, i) => (
                    <Heart key={i} fill={i < progress.lives ? "#ffffff" : "none"} className={i < progress.lives ? "text-white" : "text-gray-500"} size={18} />
                ))}
             </div>
          </button>
       </div>

       {/* Bottom Section */}
       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Level Up Section */}
          <div className="bg-[#18181b] p-8 rounded-2xl border border-zinc-800 shadow-lg flex flex-col justify-between">
             <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-blue-400" size={24} />
                  <h3 className="font-bold text-xl italic tracking-wide text-white">NINJA RANK (GRADE {progress.level})</h3>
                </div>
                <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden mb-2">
                    <div 
                        className="bg-blue-500 h-full transition-all duration-1000" 
                        style={{ width: `${Math.min(100, (progress.currentScore / nextLevelThreshold) * 100)}%` }}
                    />
                </div>
                <p className="text-right text-gray-400 text-sm mb-6">{progress.currentScore} / {nextLevelThreshold} pts to Level {progress.level + 1}</p>
                <p className="text-gray-300">Leveling up increases the difficulty of math problems, moving from basic arithmetic to algebra and geometry!</p>
             </div>
             
             <Button 
                onClick={onLevelUp} 
                disabled={!canLevelUp}
                className={`w-full mt-6 py-4 text-xl ${canLevelUp ? 'bg-blue-600 hover:bg-blue-500 border-blue-800 text-white animate-pulse' : 'bg-gray-800 border-gray-900 text-gray-500 cursor-not-allowed'}`}
             >
                <ArrowUpCircle className="mr-2" />
                {progress.level < 12 ? `LEVEL UP TO GRADE ${progress.level + 1}` : 'MAX LEVEL ACHIEVED'}
             </Button>
          </div>

          {/* Leaderboard */}
          <div className="bg-[#18181b] p-8 rounded-2xl border border-zinc-800 shadow-lg">
             <div className="flex items-center gap-3 mb-8">
               <Trophy className="text-yellow-500" size={24} />
               <h3 className="font-bold text-xl italic tracking-wide text-white">GLOBAL LEADERBOARD</h3>
             </div>
             <div className="space-y-4">
                {/* Dynamic User Entry */}
                {progress.currentScore > 1000 && (
                    <div className="flex items-center bg-yellow-900/20 p-4 rounded-xl border border-yellow-500/50">
                        <span className="text-yellow-500 font-black text-2xl w-10 italic">YOU</span>
                        <div className="w-10 h-10 bg-yellow-900/50 rounded-full flex items-center justify-center mr-4 border border-yellow-500/30">
                            <span className="text-xl">👤</span>
                        </div>
                        <span className="font-bold text-lg flex-1">Ninja Recruit</span>
                        <div className="text-right">
                            <div className="text-white font-bold text-xl">{progress.currentScore}</div>
                            <div className="text-[10px] text-gray-500 font-bold tracking-wider">{progress.totalRoundsPlayed} RNDS</div>
                        </div>
                    </div>
                )}

                {/* Static Entries */}
                <div className="flex items-center bg-zinc-800/40 p-4 rounded-xl border border-zinc-700/50">
                   <span className="text-yellow-500 font-black text-2xl w-10 italic">#1</span>
                   <div className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center mr-4 border border-purple-500/30">
                     <span className="text-xl">🥷</span>
                   </div>
                   <span className="font-bold text-lg flex-1">NinjaZero</span>
                   <div className="text-right">
                      <div className="text-white font-bold text-xl">12,450</div>
                      <div className="text-[10px] text-gray-500 font-bold tracking-wider">45 RNDS</div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default NinjaDashboard;

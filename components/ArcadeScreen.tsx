import React from 'react';
import { User } from '../types';
import Button from './Button';
import { Sword, Shield, Layers, Trophy, Lock, Info, LogOut } from 'lucide-react';

interface ArcadeProps {
  user: User;
  onSelectGame: (gameId: string) => void;
  onViewDetails: (gameId: string) => void;
  onSignOut: () => void;
}

const ArcadeScreen: React.FC<ArcadeProps> = ({ user, onSelectGame, onViewDetails, onSignOut }) => {
  const userAge = parseInt(user.age) || 0;

  const games = [
    {
      id: 'math-ninja',
      title: 'Math Ninja Blitz',
      description: 'Slice through equations and earn legendary items!',
      icon: null,
      active: true,
      color: 'bg-red-900',
      gradient: 'from-red-600 to-orange-600',
      image: 'https://www.dropbox.com/scl/fi/phch63kz4vqsqgwjbjnxs/Image-of-2.png?rlkey=w1qbfljwzne43jpz3ofazcjpw&e=1&raw=1', // Updated image link
      minAge: 7
    },
    {
      id: 'math-mayhem-racers',
      title: 'Math Mayhem Racers',
      description: 'Action Racing. Answer correctly to accelerate your vehicle.',
      icon: null,
      active: false,
      color: 'bg-purple-900',
      gradient: 'from-violet-600 to-fuchsia-600',
      image: 'https://www.dropbox.com/scl/fi/smggwqwoi7hluxu3cwm78/Image-of-4.png?rlkey=wwcbwysltxsb2jnkmpq4czk24&e=1&raw=1', // Specific image requested by user
      minAge: 7
    },
    {
      id: 'integer-impact',
      title: 'Integer Impact',
      description: 'Math Meets Mayhem! Fighter Mechanics for Ages 10-14.',
      icon: null,
      active: false,
      color: 'bg-slate-800',
      gradient: 'from-blue-700 via-slate-800 to-red-700',
      image: 'https://www.dropbox.com/scl/fi/viwef6h4a2mekoh78bw8q/Image-of-1.png?rlkey=sr5hbkgxgkyor19ws2s4mzdb8&e=1&raw=1', // Fighting/Action theme
      minAge: 7
    },
    {
      id: 'prime-protection',
      title: 'Prime Protection',
      description: 'Tower Defense. Use Coordinate Systems and Algebra to defend.',
      icon: null,
      active: false,
      color: 'bg-cyan-950',
      gradient: 'from-cyan-600 to-blue-800',
      image: 'https://www.dropbox.com/scl/fi/bzd52qby96jdrhu3b1kkw/Image-of.png?rlkey=e2mol437ygefhyxf4ffpdy1kj&e=1&raw=1', // Tech/Tower Defense theme
      minAge: 14
    },
    {
      id: 'mastery-deck',
      title: 'Mastery Deck',
      description: 'Digital flashcards with a skill chart and level up system.',
      icon: null,
      active: false,
      color: 'bg-emerald-950',
      gradient: 'from-emerald-600 to-teal-800',
      image: 'https://www.dropbox.com/scl/fi/1b174586pt9z9a05nig9o/Image-of-3.png?rlkey=gbgmw34gmyff0wlfd3pjv58cf&e=1&raw=1', // Book/Knowledge theme
      minAge: 7
    }
  ];

  const visibleGames = games.filter(game => userAge >= game.minAge);

  return (
    <div className="flex flex-col items-center min-h-screen p-8 w-full max-w-7xl mx-auto">
      <header className="w-full flex justify-between items-center mb-12 bg-black/60 p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
        <div>
          <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 arcade-font tracking-wider drop-shadow-sm">GAME ARCADE</h2>
          <p className="text-gray-300 font-mono mt-1">Player: <span className="text-white font-bold">{user.name}</span> | Age: <span className="text-white font-bold">{user.age}</span></p>
        </div>
        <div className="flex gap-4 items-center">
           <div className="bg-slate-800 border border-slate-600 text-yellow-400 px-6 py-3 rounded-xl font-bold arcade-font flex items-center gap-2 shadow-inner">
             <Trophy size={20} />
             TOKENS: ∞
           </div>
           <Button variant="danger" onClick={onSignOut} className="px-4 py-3" title="Sign Out">
             <LogOut size={20} />
             <span className="hidden md:inline">Sign Out</span>
           </Button>
        </div>
      </header>

      {visibleGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-black/50 rounded-xl border border-white/20">
          <h3 className="text-2xl text-white mb-2 arcade-font">No Games Available</h3>
          <p className="text-gray-400">Your age level ({userAge}) does not match any current modules.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {visibleGames.map((game) => (
            <div 
              key={game.id}
              className={`relative group ${game.color} rounded-2xl overflow-hidden shadow-2xl border-4 flex flex-col ${game.active ? 'border-yellow-500 hover:border-yellow-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-yellow-500/20 transition-all duration-300' : 'border-gray-700 opacity-90'}`}
            >
              {/* Game Card Header Image/Gradient Placeholder */}
              <div 
                className={`h-48 relative overflow-hidden shrink-0 bg-gradient-to-br ${game.gradient}`}
                onClick={() => game.active && onSelectGame(game.id)}
              >
                 {game.image ? (
                   <img 
                     src={game.image} 
                     alt={game.title} 
                     className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                   />
                 ) : (
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                 )}
                 
                 {/* Icon Overlay */}
                 {game.icon && (
                   <div className="absolute inset-0 flex items-center justify-center z-10">
                     <div className="transform group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">
                       {game.icon}
                     </div>
                   </div>
                 )}
                 
                 {/* Overlay Gradient for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>

              <div className="p-6 bg-black/60 flex-1 backdrop-blur-sm border-t border-white/10 flex flex-col">
                <h3 className="text-2xl text-white mb-2 arcade-font tracking-wide shadow-black drop-shadow-md">{game.title}</h3>
                <p className="text-gray-300 text-sm mb-6 min-h-[3rem] leading-relaxed">{game.description}</p>
                
                <div className="mt-auto flex gap-3">
                  {game.active ? (
                    <>
                      <Button 
                        className="flex-1 shadow-lg shadow-yellow-500/20 text-sm"
                        onClick={() => onSelectGame(game.id)}
                      >
                        PLAY GAME
                      </Button>
                      <Button 
                         variant="info" 
                         className="px-4"
                         onClick={() => onViewDetails(game.id)}
                         title="View Game Details"
                      >
                        <Info size={20} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 flex items-center justify-center gap-2 text-gray-500 font-bold bg-black/40 py-3 rounded-lg border border-gray-700">
                        <Lock size={18} /> COMING SOON
                      </div>
                      <Button 
                         variant="info" 
                         className="px-4 opacity-50 hover:opacity-100"
                         onClick={() => onViewDetails(game.id)}
                         title="View Game Details"
                      >
                        <Info size={20} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArcadeScreen;
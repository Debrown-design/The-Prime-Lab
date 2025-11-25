
import React from 'react';
import Button from './Button';
import { ArrowLeft, Play, Github } from 'lucide-react';

interface GameDetailsProps {
  gameId: string;
  onBack: () => void;
  onPlay: (gameId: string) => void;
}

const GameDetailsScreen: React.FC<GameDetailsProps> = ({ gameId, onBack, onPlay }) => {
  // Define content for each game. In a real app, this might come from a database or config file.
  const gameData: Record<string, any> = {
    'math-ninja': {
      title: 'Math Ninja Blitz',
      image: 'https://www.dropbox.com/scl/fi/phch63kz4vqsqgwjbjnxs/Image-of-2.png?rlkey=w1qbfljwzne43jpz3ofazcjpw&e=1&raw=1',
      themeColor: 'bg-red-700',
      textColor: 'text-white',
      accentColor: 'bg-red-900',
      description: 'This is a Fruit Cutting Math Game designed for players aged 7-18',
      projectUrl: 'https://github.com/Debrown-design/Math-Ninja-Blitz',
      sections: [
        {
          title: 'Gameplay & Mechanics',
          content: [
            'A math game that incorporates a fruit-cutting element.',
            'The math complexity ranges depending on the player’s age.',
            'Players are typically presented with 4-5 questions.',
            'There are also challenges available for players to earn in-game items.',
            'The game features a Skill Chart which includes a level up button beside it'
          ]
        },
        {
          title: 'Scoring & Rewards',
          content: [
            'Each fruit cut performed during gameplay is worth 10 points',
            'To earn new equipment, such as a new sword or cutting tool, players must achieve 3 correct answers in a row.'
          ]
        },
        {
          title: 'Lives System',
          content: [
            'This game uses a 3 Lives system',
            'If a player loses a life, it is automatically restored after 2 minutes'
          ]
        }
      ]
    },
    'math-mayhem-racers': {
      title: 'Math Mayhem Racers',
      image: 'https://www.dropbox.com/scl/fi/smggwqwoi7hluxu3cwm78/Image-of-4.png?rlkey=wwcbwysltxsb2jnkmpq4czk24&e=1&raw=1',
      themeColor: 'bg-purple-800',
      textColor: 'text-white',
      accentColor: 'bg-purple-950',
      description: 'The central premise involves racing and answering mathematical questions to fuel your vehicle.',
      sections: [
        {
          title: 'Core Gameplay Mechanics',
          content: [
            'Players are typically presented with 4-5 questions per lap.',
            'Each correct answer accelerates your vehicle.',
            'Each incorrect answer keeps your vehicle at the same speed prior to the questions.',
            'Drafting mechanics allow you to gain speed by answering quickly behind opponents.'
          ]
        },
        {
          title: 'Leaderboard & Rewards',
          content: [
            'Rank 1: NovaDrift - 98.5% Math Mastery',
            'Rank 2: Alpha_Prime - 90.7% Math Mastery',
            'Earn credits to upgrade your engine by maintaining a streak of correct answers.'
          ]
        },
        {
            title: 'Vehicle Mechanics',
            content: [
                'Vehicles: The Velocity Vector, Algorithmic Ghost, Formula Flash.',
                'Upgrades increase base speed but require solving complex equations to install.'
            ]
        }
      ]
    },
    'integer-impact': {
        title: 'Integer Impact',
        image: 'https://www.dropbox.com/scl/fi/viwef6h4a2mekoh78bw8q/Image-of-1.png?rlkey=sr5hbkgxgkyor19ws2s4mzdb8&e=1&raw=1',
        themeColor: 'bg-slate-800',
        textColor: 'text-white',
        accentColor: 'bg-slate-900',
        description: 'A fighting game where integer operations determine the power of your strikes.',
        sections: [
            {
                title: 'Fighter Mechanics',
                content: [
                    'Each participant is equipped with a power bar.',
                    'Solve integer problems (e.g., -5 + 12) to charge your attack.',
                    'Each correct answer increases a fighter\'s punch power.'
                ]
            },
            {
                title: 'Structural Elements',
                content: [
                    'This game includes a Skill Chart.',
                    'Has a leaderboard system.',
                    'Correct combos deal critical damage.'
                ]
            }
        ]
    },
    'prime-protection': {
        title: 'Prime Protection',
        image: 'https://www.dropbox.com/scl/fi/bzd52qby96jdrhu3b1kkw/Image-of.png?rlkey=e2mol437ygefhyxf4ffpdy1kj&e=1&raw=1',
        themeColor: 'bg-cyan-900',
        textColor: 'text-white',
        accentColor: 'bg-cyan-950',
        description: 'The Tower Defense Game of Math Mastery.',
        sections: [
            {
                title: 'Core Gameplay Mechanics',
                content: [
                    'The fundamental gameplay involves solving math problems to construct and enhance defenses.',
                    'Building Towers: A tower is built on the x-axis of the map grid when the player provides a correct answer.',
                    'Math Concepts: Coordinate Systems, Algebra, and Solving Equations.'
                ]
            },
            {
                title: 'Enemy Mechanics',
                content: [
                    'The Prime Drone: This enemy can only be damaged by a tower if that tower\'s damage value is a Prime Number.',
                    'The Calculus Titan: Requires derivative inputs to defeat.'
                ]
            }
        ]
    },
    'mastery-deck': {
        title: 'Mastery Deck',
        image: 'https://www.dropbox.com/scl/fi/1b174586pt9z9a05nig9o/Image-of-3.png?rlkey=gbgmw34gmyff0wlfd3pjv58cf&e=1&raw=1',
        themeColor: 'bg-emerald-800',
        textColor: 'text-white',
        accentColor: 'bg-emerald-950',
        description: 'A digital flashcard system with RPG progression elements.',
        sections: [
            {
                title: 'Format & Content',
                content: [
                    'This game utilizes flashcards. Two sides: Question and Answer.',
                    'The content covers Math Ranging from Elementary to High School/College.',
                    'The game provides 10 flashcards per Age Group.'
                ]
            },
            {
                title: 'Progression & Feedback',
                content: [
                    'Tracks how many tries someone has given for an answer.',
                    'Progression is managed via a Skill Chart with a level up button.',
                    'Celebration scheme for Correct Answers.'
                ]
            }
        ]
    }
  };

  const data = gameData[gameId];

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-center">
          <h2 className="text-2xl">Data Declassified...</h2>
          <Button onClick={onBack} className="mt-4">Return to Arcade</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row min-h-screen w-full animate-fade-in ${data.themeColor}`}>
      {/* Left Column: Image/Visuals - Updated to ensure visibility and fit */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-auto bg-black flex items-center justify-center overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-black/20">
        
        {/* Blurred Background Layer to fill space */}
        <div className="absolute inset-0">
            <img 
                src={data.image} 
                alt="" 
                className="w-full h-full object-cover opacity-30 blur-sm scale-110" 
                onError={(e) => {
                    // Hide background if error
                    (e.target as HTMLImageElement).style.display = 'none';
                }}
            />
        </div>

        {/* Main Image Layer - Contained to fit screen */}
        <img 
          src={data.image} 
          alt={data.title} 
          className="relative z-10 w-full h-full object-contain max-h-[80vh] p-4"
          onError={(e) => {
             // Fallback if link is broken
             (e.target as HTMLImageElement).src = 'https://placehold.co/600x800?text=Image+Unavailable';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 pointer-events-none z-20">
           <h1 className="text-4xl md:text-6xl font-bold text-white arcade-font drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
             {data.title}
           </h1>
        </div>
        
        {/* Overlay Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur transition-all border border-white/20"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Right Column: Details */}
      <div className={`w-full md:w-1/2 p-8 md:p-12 ${data.textColor} flex flex-col relative`}>
         
         {/* Scrollable Content Container */}
         <div className="flex-1 overflow-y-auto pb-24 md:pb-0">
             <div className="mb-8">
                <h3 className="text-lg font-bold opacity-75 uppercase tracking-widest mb-2 border-b border-white/20 pb-2">Description</h3>
                <p className="text-xl font-medium leading-relaxed">{data.description}</p>
                {data.projectUrl && (
                  <a 
                    href={data.projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-white/80 hover:text-white underline text-sm transition-colors"
                  >
                    <Github size={16} /> View Project Source
                  </a>
                )}
             </div>

             {data.sections.map((section: any, idx: number) => (
               <div key={idx} className="mb-8">
                  <h3 className="text-lg font-bold opacity-75 uppercase tracking-widest mb-4 border-b border-white/20 pb-2">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.content.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0"></span>
                        <span className="text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>
             ))}
         </div>

         {/* Sticky Footer for Button on Mobile */}
         <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto p-6 bg-black/80 md:bg-transparent backdrop-blur-lg md:backdrop-filter-none border-t border-white/10 md:border-0 z-50 md:z-auto flex justify-center md:justify-end md:mt-auto">
            <Button 
               onClick={() => onPlay(gameId)} 
               className="w-full md:w-auto text-xl px-12 py-4 shadow-xl bg-green-600 hover:bg-green-500 border-green-800 text-white"
            >
               PLAY GAME <Play fill="currentColor" className="ml-2" />
            </Button>
         </div>
      </div>
    </div>
  );
};

export default GameDetailsScreen;

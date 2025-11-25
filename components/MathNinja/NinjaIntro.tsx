import React from 'react';
import Button from '../Button';
import { Scroll, Skull } from 'lucide-react';

interface IntroProps {
  onNext: () => void;
}

const NinjaIntro: React.FC<IntroProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fade-in">
      <div className="max-w-2xl bg-amber-100 rounded-lg p-8 shadow-2xl border-8 border-amber-900 relative">
        {/* Decorative Screw/Nails */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-amber-900 rounded-full"></div>
        <div className="absolute top-4 right-4 w-4 h-4 bg-amber-900 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-amber-900 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-amber-900 rounded-full"></div>

        <div className="flex flex-col items-center text-center">
          <Scroll size={64} className="text-amber-800 mb-6" />
          
          <h2 className="text-4xl text-amber-900 mb-6 arcade-font">MISSION BRIEF</h2>
          
          <div className="prose text-amber-900/80 text-lg mb-8 font-serif leading-relaxed">
            <p className="mb-4">
              The <strong>Number Scroll</strong> has been stolen by the Chaos Clan! 
              Without it, the village cannot calculate the harvest.
            </p>
            <p className="mb-4">
              You must journey to the <span className="text-red-700 font-bold">Temple of Equations</span> to retrieve it.
            </p>
            <p>
              Your calculation skills are the only weapon sharp enough to defeat the chaotic fruit flying your way.
              Prepare for battle immediately!
            </p>
          </div>

          <div className="bg-amber-200/50 p-4 rounded-lg w-full mb-8 border border-amber-300">
             <h4 className="font-bold text-amber-900 flex items-center justify-center gap-2">
               <Skull size={20} /> RULES
             </h4>
             <ul className="text-left text-sm text-amber-800 mt-2 space-y-2 list-disc pl-5">
                <li>Math equations attached to fruit will attack you.</li>
                <li>Type the correct answer to slash them!</li>
                <li>Don't let them hit the bottom of the screen.</li>
             </ul>
          </div>

          <Button onClick={onNext} className="w-full text-xl animate-pulse">
            START MISSION
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NinjaIntro;
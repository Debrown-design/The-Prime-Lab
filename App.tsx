
import React, { useState } from 'react';
import { AppStage, User, InventoryItem } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import ArcadeScreen from './components/ArcadeScreen';
import GameDetailsScreen from './components/GameDetailsScreen';

export default function App() {
  const [stage, setStage] = useState<AppStage>(AppStage.WELCOME);
  const [user, setUser] = useState<User | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const handleUserEnter = (newUser: User) => {
    setUser(newUser);
    setStage(AppStage.ARCADE);
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGameId(gameId);
    if (gameId === 'math-ninja') {
      // Connects the Play button directly to the provided GitHub link for gameplay/source
      window.open('https://github.com/Debrown-design/Math-Ninja-Blitz', '_blank');
    } else {
       if (gameId === 'math-mayhem-racers') {
           console.log("Racers game selected - under construction");
       }
    }
  };

  const handleViewDetails = (gameId: string) => {
    setSelectedGameId(gameId);
    setStage(AppStage.GAME_DETAILS);
  };

  const handleBackToArcade = () => {
    setStage(AppStage.ARCADE);
    setSelectedGameId(null);
  };

  const handleSignOut = () => {
    setUser(null);
    setInventory([]);
    setStage(AppStage.WELCOME);
    setSelectedGameId(null);
  };

  return (
    <div className="min-h-screen ninja-bg bg-fixed bg-cover overflow-x-hidden">
      {stage === AppStage.WELCOME && (
        <WelcomeScreen onEnter={handleUserEnter} />
      )}

      {stage === AppStage.ARCADE && user && (
        <ArcadeScreen 
          user={user} 
          onSelectGame={handleGameSelect} 
          onViewDetails={handleViewDetails}
          onSignOut={handleSignOut}
        />
      )}

      {stage === AppStage.GAME_DETAILS && selectedGameId && (
        <GameDetailsScreen 
          gameId={selectedGameId} 
          onBack={handleBackToArcade}
          onPlay={handleGameSelect}
        />
      )}
    </div>
  );
}

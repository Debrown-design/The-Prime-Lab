import React, { useState } from 'react';
import { User } from '../types';
import Button from './Button';
import { UserCircle2, ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onEnter: (user: User) => void;
}

const WelcomeScreen: React.FC<WelcomeProps> = ({ onEnter }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age) {
      onEnter({ name, age, avatarId: Math.floor(Math.random() * 5) });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center animate-fade-in">
      <div className="max-w-md w-full bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl border-4 border-red-900">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center border-4 border-red-800">
             <UserCircle2 size={48} className="text-red-800" />
          </div>
        </div>
        
        <h1 className="text-4xl text-red-800 mb-2">The Prime Lab</h1>
        <p className="text-xl font-bold text-gray-700 mb-2">Welcome to The Prime Lab</p>
        <p className="text-md text-gray-600 mb-8">Please Enter Your Name & Age to see what type of math games you get</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none bg-gray-50 text-lg text-black"
              placeholder="e.g. Agent Alpha"
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none bg-gray-50 text-lg text-black"
              placeholder="e.g. 10"
              min="4"
              max="99"
              required
            />
          </div>

          <Button type="submit" className="w-full text-xl mt-4">
            ENTER LAB <ArrowRight size={20} />
          </Button>
        </form>
      </div>
      
      <p className="mt-8 text-white/60 text-sm">© 2024 The Prime Lab</p>
    </div>
  );
};

export default WelcomeScreen;
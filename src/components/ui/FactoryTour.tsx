'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WonkaButton from '@/components/ui/WonkaButton';
import WonkaCard from '@/components/ui/WonkaCard';

interface FactoryRoom {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
  requires: string[];
  nextRooms: string[];
}

interface TourState {
  visitedRooms: string[];
  currentRoom: string;
  completed: boolean;
  timeElapsed: number;
}

export default function FactoryTour() {
  const [tourState, setTourState] = useState<TourState>({
    visitedRooms: ['entrance'],
    currentRoom: 'entrance',
    completed: false,
    timeElapsed: 0
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Define the factory rooms and their connections
  const factoryRooms: FactoryRoom[] = [
    {
      id: 'entrance',
      name: 'Factory Entrance',
      description: 'The grand entrance to Willy Wonka\'s magical chocolate factory. The gates shimmer with golden accents.',
      image: 'https://placehold.co/400x200/8B4513/FFFFFF?text=Entrance',
      unlocked: true,
      requires: [],
      nextRooms: ['chocolate-room', 'inventing-room']
    },
    {
      id: 'chocolate-room',
      name: 'The Chocolate Room',
      description: 'A magical room with a flowing river of chocolate, giant lollipops, and Oompa-Loompas paddling sugar boats.',
      image: 'https://placehold.co/400x200/D2691E/FFFFFF?text=Chocolate+River',
      unlocked: true,
      requires: [],
      nextRooms: ['nut-sorting', 'candy-factory']
    },
    {
      id: 'inventing-room',
      name: 'The Inventing Room',
      description: 'Where new candies come to life. Bottles bubble with experimental formulas and machines create magical treats.',
      image: 'https://placehold.co/400x200/FF69B4/FFFFFF?text=Inventing+Lab',
      unlocked: true,
      requires: [],
      nextRooms: ['secret-room', 'glass-elevator']
    },
    {
      id: 'nut-sorting',
      name: 'Nut Sorting Room',
      description: 'Watch the trained squirrels sort the good nuts from the bad nuts. They\'re very particular about their work.',
      image: 'https://placehold.co/400x200/DAA520/FFFFFF?text=Squirrels',
      unlocked: false,
      requires: ['chocolate-room'],
      nextRooms: ['caramel-room']
    },
    {
      id: 'candy-factory',
      name: 'Candy Assembly Line',
      description: 'See how Wonka\'s famous candies are made with precision and magic. Each piece is crafted with love.',
      image: 'https://placehold.co/400x200/FFB6C1/FFFFFF?text=Candy+Line',
      unlocked: false,
      requires: ['chocolate-room'],
      nextRooms: ['packaging']
    },
    {
      id: 'secret-room',
      name: 'The Secret Recipe Vault',
      description: 'The most secure room in the factory. Contains the secret formulas for Wonka\'s most prized creations.',
      image: 'https://placehold.co/400x200/8A2BE2/FFFFFF?text=Secret+Vault',
      unlocked: false,
      requires: ['inventing-room'],
      nextRooms: ['golden-egg']
    },
    {
      id: 'glass-elevator',
      name: 'The Glass Elevator',
      description: 'A transparent elevator that can travel in any direction. See the entire factory from above.',
      image: 'https://placehold.co/400x200/87CEEB/FFFFFF?text=Glass+Elevator',
      unlocked: false,
      requires: ['inventing-room'],
      nextRooms: ['fizzy-lifting']
    },
    {
      id: 'caramel-room',
      name: 'Caramel Stretching Room',
      description: 'Watch workers stretch caramel into perfect strands. The technique has been perfected over generations.',
      image: 'https://placehold.co/400x200/D2691E/FFFFFF?text=Caramel',
      unlocked: false,
      requires: ['nut-sorting'],
      nextRooms: ['testing-room']
    },
    {
      id: 'packaging',
      name: 'Packaging Department',
      description: 'Where candies receive their colorful wrapping and are prepared for delivery worldwide.',
      image: 'https://placehold.co/400x200/FF69B4/FFFFFF?text=Packaging',
      unlocked: false,
      requires: ['candy-factory'],
      nextRooms: ['warehouse']
    },
    {
      id: 'golden-egg',
      name: 'Golden Egg Chamber',
      description: 'A special room where golden eggs are created. Each one contains a surprise gift for lucky visitors.',
      image: 'https://placehold.co/400x200/FFD700/000000?text=Golden+Egg',
      unlocked: false,
      requires: ['secret-room'],
      nextRooms: ['trophy-room']
    },
    {
      id: 'fizzy-lifting',
      name: 'Fizzy Lifting Room',
      description: 'A room filled with fizzy lifting drinks. Be careful not to float away!',
      image: 'https://placehold.co/400x200/00FFFF/000000?text=Fizzy+Drinks',
      unlocked: false,
      requires: ['glass-elevator'],
      nextRooms: ['bubble-room']
    },
    {
      id: 'testing-room',
      name: 'Candy Testing Lab',
      description: 'Where new candy creations are tested for taste, texture, and fun factor.',
      image: 'https://placehold.co/400x200/9370DB/FFFFFF?text=Testing+Lab',
      unlocked: false,
      requires: ['caramel-room'],
      nextRooms: ['quality-control']
    },
    {
      id: 'warehouse',
      name: 'Candy Warehouse',
      description: 'Miles of shelves filled with every Wonka candy ever created. The largest candy collection in the world.',
      image: 'https://placehold.co/400x200/FFA07A/FFFFFF?text=Warehouse',
      unlocked: false,
      requires: ['packaging'],
      nextRooms: ['delivery']
    },
    {
      id: 'trophy-room',
      name: 'Wonka Trophy Room',
      description: 'A hall displaying awards and recognitions received by Wonka for innovation in confectionery.',
      image: 'https://placehold.co/400x200/FFD700/000000?text=Trophy+Room',
      unlocked: false,
      requires: ['golden-egg'],
      nextRooms: ['final-destination']
    },
    {
      id: 'bubble-room',
      name: 'Bubble Room',
      description: 'A room where soap bubbles become edible and flavorful. They pop with delightful tastes.',
      image: 'https://placehold.co/400x200/87CEEB/FFFFFF?text=Bubble+Room',
      unlocked: false,
      requires: ['fizzy-lifting'],
      nextRooms: ['final-destination']
    },
    {
      id: 'quality-control',
      name: 'Quality Control',
      description: 'The final checkpoint where every candy is inspected to ensure Wonka\'s high standards.',
      image: 'https://placehold.co/400x200/32CD32/FFFFFF?text=Quality+Control',
      unlocked: false,
      requires: ['testing-room'],
      nextRooms: ['final-destination']
    },
    {
      id: 'delivery',
      name: 'Delivery Center',
      description: 'Where Wonka candies are shipped around the world. Trucks lined with candy logos await departure.',
      image: 'https://placehold.co/400x200/4682B4/FFFFFF?text=Delivery',
      unlocked: false,
      requires: ['warehouse'],
      nextRooms: ['final-destination']
    },
    {
      id: 'final-destination',
      name: 'The Grand Finale',
      description: 'Congratulations! You\'ve completed the factory tour. Willy Wonka himself thanks you for visiting.',
      image: 'https://placehold.co/400x200/FFD700/000000?text=Grand+Finale',
      unlocked: false,
      requires: ['trophy-room', 'bubble-room', 'quality-control', 'delivery'],
      nextRooms: []
    }
  ];

  // Timer effect
  useEffect(() => {
    if (!tourState.completed) {
      const timer = setInterval(() => {
        setTourState(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [tourState.completed]);

  const currentRoom = factoryRooms.find(room => room.id === tourState.currentRoom);

  const navigateToRoom = (roomId: string) => {
    if (isAnimating) return;
    
    const room = factoryRooms.find(r => r.id === roomId);
    if (!room) return;
    
    // Check if room is unlocked
    const allRequirementsMet = room.requires.every(req => tourState.visitedRooms.includes(req));
    if (!allRequirementsMet) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setTourState(prev => ({
        ...prev,
        currentRoom: roomId,
        visitedRooms: [...new Set([...prev.visitedRooms, roomId])],
        completed: roomId === 'final-destination'
      }));
      setIsAnimating(false);
    }, 500);
  };

  const resetTour = () => {
    setTourState({
      visitedRooms: ['entrance'],
      currentRoom: 'entrance',
      completed: false,
      timeElapsed: 0
    });
  };

  if (!currentRoom) {
    return (
      <div className="text-center py-12">
        <h2 className="font-display text-2xl font-bold text-chocolate-brown mb-4">Tour Error</h2>
        <WonkaButton onClick={resetTour}>Reset Tour</WonkaButton>
      </div>
    );
  }

  // Calculate progress
  const unlockedRooms = factoryRooms.filter(room => 
    room.unlocked || room.requires.every(req => tourState.visitedRooms.includes(req))
  ).length;
  
  const progress = Math.round((tourState.visitedRooms.length / factoryRooms.length) * 100);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl font-bold text-wonka-purple mb-2">
          Wonka Factory Adventure
        </h1>
        <p className="text-chocolate-brown mb-4">Navigate through the magical rooms of the factory</p>
        
        <div className="inline-block bg-cream p-4 rounded-full border-4 border-wonka-yellow">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-bold text-chocolate-brown">
              Progress: {tourState.visitedRooms.length}/{factoryRooms.length} rooms
            </div>
            <div className="w-32 bg-wonka-pink rounded-full h-4">
              <div 
                className="bg-wonka-yellow h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm font-bold text-chocolate-brown">
              Time: {Math.floor(tourState.timeElapsed / 60)}:{(tourState.timeElapsed % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Room Display */}
        <div className="lg:col-span-2">
          <WonkaCard variant="candy" className="h-full">
            <div className="text-center mb-4">
              <h2 className="font-display text-3xl font-bold text-chocolate-brown">
                {currentRoom.name}
              </h2>
              <div className="w-24 h-1 bg-wonka-yellow mx-auto mt-2"></div>
            </div>
            
            <div className="text-center mb-6">
              <div 
                className="w-full h-48 rounded-xl bg-cover bg-center mx-auto border-4 border-wonka-purple"
                style={{ backgroundImage: `url(${currentRoom.image})` }}
              ></div>
            </div>
            
            <p className="text-center text-lg text-charcoal mb-6">
              {currentRoom.description}
            </p>
            
            {tourState.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-4 bg-gradient-to-r from-wonka-yellow to-wonka-orange rounded-xl mb-6"
              >
                <h3 className="font-display text-2xl font-bold text-chocolate-brown">Congratulations!</h3>
                <p className="text-charcoal">You've completed the Wonka Factory Tour!</p>
              </motion.div>
            )}
            
            <div className="flex justify-center">
              <WonkaButton 
                variant="caramel" 
                onClick={resetTour}
                className="px-8 py-3"
              >
                Start New Tour
              </WonkaButton>
            </div>
          </WonkaCard>
        </div>
        
        {/* Room Navigation Panel */}
        <div>
          <WonkaCard variant="gummy" className="h-full">
            <h3 className="font-display text-xl font-bold text-chocolate-brown mb-4 text-center">
              Factory Map
            </h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence>
                {factoryRooms.map(room => {
                  const isUnlocked = room.unlocked || room.requires.every(req => tourState.visitedRooms.includes(req));
                  const isCurrent = room.id === tourState.currentRoom;
                  const isVisited = tourState.visitedRooms.includes(room.id);
                  
                  return (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          isCurrent 
                            ? 'bg-wonka-yellow text-chocolate-brown border-2 border-chocolate-brown' 
                            : isVisited
                              ? 'bg-wonka-pink text-white'
                              : isUnlocked
                                ? 'bg-cream text-chocolate-brown hover:bg-wonka-pink'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={() => isUnlocked && !isCurrent && navigateToRoom(room.id)}
                      >
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            isVisited ? 'bg-green-500' : isUnlocked ? 'bg-wonka-yellow' : 'bg-gray-400'
                          }`}></div>
                          <span className="font-medium">{room.name}</span>
                          {!isUnlocked && (
                            <span className="ml-auto text-xs bg-gray-500 text-white px-2 py-1 rounded">
                              Locked
                            </span>
                          )}
                        </div>
                        
                        {isCurrent && (
                          <div className="mt-2 text-xs bg-wonka-purple text-white px-2 py-1 rounded inline-block">
                            You are here
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            <div className="mt-6 text-center text-sm text-charcoal">
              <p>Navigate through the factory rooms to discover all the magical secrets!</p>
            </div>
          </WonkaCard>
        </div>
      </div>
      
      {/* Available Rooms to Visit */}
      <div className="mt-8">
        <h3 className="font-display text-2xl font-bold text-chocolate-brown mb-4 text-center">
          Where to Next?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentRoom.nextRooms
            .map(id => factoryRooms.find(room => room.id === id))
            .filter(Boolean)
            .map(room => {
              if (!room) return null;
              
              const isUnlocked = room.unlocked || room.requires.every(req => tourState.visitedRooms.includes(req));
              const isVisited = tourState.visitedRooms.includes(room.id);
              
              return (
                <motion.div
                  key={room.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 ${
                    isUnlocked 
                      ? isVisited 
                        ? 'border-wonka-green bg-wonka-pink' 
                        : 'border-wonka-yellow bg-cream hover:bg-wonka-pink cursor-pointer'
                      : 'border-gray-400 bg-gray-200 cursor-not-allowed'
                  }`}
                  onClick={() => isUnlocked && navigateToRoom(room.id)}
                >
                  <h4 className="font-bold text-chocolate-brown mb-2">{room.name}</h4>
                  <p className="text-sm text-charcoal mb-3">{room.description}</p>
                  {!isUnlocked && (
                    <div className="text-xs bg-gray-500 text-white px-2 py-1 rounded inline-block">
                      Requires: {room.requires.join(', ')}
                    </div>
                  )}
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
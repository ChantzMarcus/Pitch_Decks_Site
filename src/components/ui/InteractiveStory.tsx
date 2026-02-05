'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WonkaButton from '@/components/ui/WonkaButton';
import WonkaCard from '@/components/ui/WonkaCard';

interface StoryNode {
  id: string;
  title: string;
  content: string;
  choices?: Choice[];
  imageUrl?: string;
  character?: string;
}

interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
}

interface InteractiveStoryProps {
  story: StoryNode[];
  startNodeId: string;
}

export default function InteractiveStory({ story, startNodeId }: InteractiveStoryProps) {
  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);
  const [storyHistory, setStoryHistory] = useState<string[]>([startNodeId]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentNode = story.find(node => node.id === currentNodeId);

  const handleChoice = (choice: Choice) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedChoice(choice.id);
    
    setTimeout(() => {
      setCurrentNodeId(choice.nextNodeId);
      setStoryHistory(prev => [...prev, choice.nextNodeId]);
      setSelectedChoice(null);
      setIsAnimating(false);
    }, 500);
  };

  const goBack = () => {
    if (storyHistory.length > 1) {
      const newHistory = [...storyHistory];
      newHistory.pop();
      setCurrentNodeId(newHistory[newHistory.length - 1]);
      setStoryHistory(newHistory);
    }
  };

  if (!currentNode) {
    return (
      <div className="text-center py-12">
        <h2 className="font-display text-2xl font-bold text-chocolate-brown mb-4">The story has ended</h2>
        <WonkaButton onClick={() => {
          setCurrentNodeId(startNodeId);
          setStoryHistory([startNodeId]);
        }}>
          Start Over
        </WonkaButton>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-wonka-purple mb-2">
          Write Your Own Wonka Destiny
        </h1>
        <p className="text-chocolate-brown">Your choices shape your journey through the factory</p>
      </div>

      <WonkaCard variant="candy" className="mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {currentNode.imageUrl && (
            <div className="flex-shrink-0">
              <div 
                className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-wonka-yellow"
                style={{ backgroundImage: `url(${currentNode.imageUrl})` }}
              />
            </div>
          )}
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-chocolate-brown mb-2">
              {currentNode.title}
            </h2>
            <p className="text-charcoal mb-4">{currentNode.content}</p>
            
            {currentNode.character && (
              <div className="inline-block bg-wonka-pink text-white px-3 py-1 rounded-full text-sm font-bold">
                — {currentNode.character}
              </div>
            )}
          </div>
        </div>
      </WonkaCard>

      {currentNode.choices && currentNode.choices.length > 0 && (
        <div className="space-y-4 mb-8">
          <AnimatePresence>
            {currentNode.choices.map((choice) => (
              <motion.div
                key={choice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <WonkaButton
                  variant="lollipop"
                  className={`w-full text-left justify-start ${selectedChoice === choice.id ? 'scale-95' : ''}`}
                  onClick={() => handleChoice(choice)}
                  disabled={isAnimating}
                >
                  {choice.text}
                </WonkaButton>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {storyHistory.length > 1 && (
        <div className="text-center">
          <WonkaButton
            variant="chocolate"
            onClick={goBack}
            disabled={isAnimating}
          >
            ← Go Back
          </WonkaButton>
        </div>
      )}
    </div>
  );
}

// Sample story data
export const wonkaStory: StoryNode[] = [
  {
    id: 'start',
    title: 'Welcome to Wonka\'s Factory',
    content: 'You stand before the gates of the most famous chocolate factory in the world. The smell of chocolate fills the air. Willy Wonka himself greets you with a mysterious smile.',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/8A2BE2/FFFFFF?text=W.W.',
    choices: [
      {
        id: 'choice1',
        text: 'Follow Wonka into the factory to see the amazing wonders inside',
        nextNodeId: 'chocolate-room'
      },
      {
        id: 'choice2',
        text: 'Ask about the secret of his delicious chocolate',
        nextNodeId: 'secret-room'
      },
      {
        id: 'choice3',
        text: 'Request to try making candy yourself',
        nextNodeId: 'inventing-room'
      }
    ]
  },
  {
    id: 'chocolate-room',
    title: 'The Chocolate Room',
    content: 'You enter a magical room filled with a chocolate river flowing past. Oompa-Loompas paddle boats harvesting cocoa beans. Giant lollipops line the shore.',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/D2691E/FFFFFF?text=Chocolate',
    choices: [
      {
        id: 'choice4',
        text: 'Try to take a sip from the chocolate river',
        nextNodeId: 'river-sip'
      },
      {
        id: 'choice5',
        text: 'Ask an Oompa-Loompa about their work',
        nextNodeId: 'oompa-info'
      }
    ]
  },
  {
    id: 'secret-room',
    title: 'The Secret Recipe Room',
    content: 'Wonka leads you to a vault-like room with hundreds of ingredient drawers. He explains the importance of imagination in confectionery.',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Secret',
    choices: [
      {
        id: 'choice6',
        text: 'Suggest adding a new flavor to his recipes',
        nextNodeId: 'new-flavor'
      },
      {
        id: 'choice7',
        text: 'Ask about the Everlasting Gobstopper',
        nextNodeId: 'gobstopper'
      }
    ]
  },
  {
    id: 'inventing-room',
    title: 'The Inventing Room',
    content: 'Bottles, tubes, and machines bubble and fizz with experimental candies. Wonka invites you to help create something new.',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/FF69B4/FFFFFF?text=Invent',
    choices: [
      {
        id: 'choice8',
        text: 'Mix colors to create a rainbow candy',
        nextNodeId: 'rainbow-candy'
      },
      {
        id: 'choice9',
        text: 'Combine flavors to make a surprise taste',
        nextNodeId: 'surprise-flavor'
      }
    ]
  },
  {
    id: 'river-sip',
    title: 'Tasting the River',
    content: 'The chocolate is the most delicious thing you\'ve ever tasted! Wonka grins as you enjoy the finest chocolate in the world.',
    character: 'You',
    imageUrl: 'https://placehold.co/200x200/654321/FFFFFF?text=Sip',
    choices: [
      {
        id: 'choice10',
        text: 'Ask for the recipe',
        nextNodeId: 'recipe-secret'
      },
      {
        id: 'choice11',
        text: 'Offer to help improve the formula',
        nextNodeId: 'formula-help'
      }
    ]
  },
  {
    id: 'oompa-info',
    title: 'Oompa-Loompa Wisdom',
    content: 'The Oompa-Loompa sings a little song about the joy of making chocolate. They seem genuinely happy in their work.',
    character: 'Oompa-Loompa',
    imageUrl: 'https://placehold.co/200x200/FF8C00/FFFFFF?text=Oompa',
    choices: [
      {
        id: 'choice12',
        text: 'Join in the song',
        nextNodeId: 'sing-along'
      },
      {
        id: 'choice13',
        text: 'Ask about life in the factory',
        nextNodeId: 'factory-life'
      }
    ]
  },
  {
    id: 'new-flavor',
    title: 'Creating New Flavors',
    content: 'Together, you experiment with unusual combinations. The possibilities seem endless!',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/FF1493/FFFFFF?text=Flavor',
    choices: [
      {
        id: 'choice14',
        text: 'Try a breakfast flavor',
        nextNodeId: 'breakfast-candy'
      },
      {
        id: 'choice15',
        text: 'Create a dinner-themed candy',
        nextNodeId: 'dinner-candy'
      }
    ]
  },
  {
    id: 'gobstopper',
    title: 'Everlasting Gobstopper',
    content: 'Wonka\'s eyes twinkle mysteriously. "The secret," he whispers, "is that it really does last forever."',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/9370DB/FFFFFF?text=Gobstopper',
    choices: [
      {
        id: 'choice16',
        text: 'Ask to try one',
        nextNodeId: 'try-gobstopper'
      },
      {
        id: 'choice17',
        text: 'Offer to help develop the next version',
        nextNodeId: 'develop-gobstopper'
      }
    ]
  },
  {
    id: 'rainbow-candy',
    title: 'Rainbow Candy Creation',
    content: 'Your rainbow candy swirls with colors that seem to dance. It sparkles in the light of the factory.',
    character: 'You',
    imageUrl: 'https://placehold.co/200x200/FF69B4/FFFFFF?text=Rainbow',
    choices: [
      {
        id: 'choice18',
        text: 'Taste the rainbow candy',
        nextNodeId: 'taste-rainbow'
      },
      {
        id: 'choice19',
        text: 'Package it for sale',
        nextNodeId: 'package-rainbow'
      }
    ]
  },
  {
    id: 'surprise-flavor',
    title: 'Surprise Flavor Creation',
    content: 'Your experimental candy changes flavors as you eat it - first strawberry, then lemon, then cola!',
    character: 'You',
    imageUrl: 'https://placehold.co/200x200/32CD32/FFFFFF?text=Surprise',
    choices: [
      {
        id: 'choice20',
        text: 'Perfect the flavor-changing mechanism',
        nextNodeId: 'perfect-flavor'
      },
      {
        id: 'choice21',
        text: 'Test it on Wonka first',
        nextNodeId: 'test-wonka'
      }
    ]
  },
  // Ending nodes
  {
    id: 'recipe-secret',
    title: 'The Recipe Secret',
    content: 'Wonka chuckles. "The secret ingredient is love and imagination!" he declares. You leave with a heart full of wonder.',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/FFD700/000000?text=Gold'
  },
  {
    id: 'formula-help',
    title: 'Helping with Formula',
    content: 'Your fresh perspective helps Wonka refine his chocolate formula. He offers you a position as Head of Innovation!',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/FF4500/FFFFFF?text=Job'
  },
  {
    id: 'sing-along',
    title: 'Singing with Oompa-Loompas',
    content: 'Your joyful singing echoes through the factory. Wonka is delighted by your enthusiasm and invites you to stay for dinner.',
    character: 'You',
    imageUrl: 'https://placehold.co/200x200/FF69B4/FFFFFF?text=Sing'
  },
  {
    id: 'factory-life',
    title: 'Factory Life',
    content: 'The Oompa-Loompas share stories of their adventures in the factory. You realize this truly is the most magical place on earth.',
    character: 'Oompa-Loompa',
    imageUrl: 'https://placehold.co/200x200/FF8C00/FFFFFF?text=Happy'
  },
  {
    id: 'breakfast-candy',
    title: 'Breakfast Candy',
    content: 'Your bacon and eggs candy is surprisingly delicious! Wonka is impressed by your creativity.',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/FFA500/FFFFFF?text=Bacon'
  },
  {
    id: 'dinner-candy',
    title: 'Dinner Candy',
    content: 'Your steak and potato candy tastes remarkably authentic. Wonka adds it to his experimental line.',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/A0522D/FFFFFF?text=Dinner'
  },
  {
    id: 'try-gobstopper',
    title: 'Trying the Gobstopper',
    content: 'The Everlasting Gobstopper changes flavors continuously! Strawberry, lemon, cola, and more. It really does last forever.',
    character: 'You',
    imageUrl: 'https://placehold.co/200x200/9370DB/FFFFFF?text=Gobstopper'
  },
  {
    id: 'develop-gobstopper',
    title: 'Developing New Version',
    content: 'Together, you create the Everlasting Gobstopper 2.0 with even more flavors. Wonka names it after you!',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/FFD700/000000?text=Named'
  },
  {
    id: 'taste-rainbow',
    title: 'Tasting Rainbow',
    content: 'The rainbow candy is magical! Each color has a different flavor and sensation. You feel like you\'re eating pure happiness.',
    character: 'You',
    imageUrl: 'https://placehold.co/200x200/FF69B4/FFFFFF?text=Happy'
  },
  {
    id: 'package-rainbow',
    title: 'Packaging Rainbow',
    content: 'Your rainbow candy becomes the most popular item in Wonka\'s store. You\'ve created a new classic!',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/FFD700/000000?text=Success'
  },
  {
    id: 'perfect-flavor',
    title: 'Perfecting Flavors',
    content: 'Your innovation creates the first truly multi-flavor candy. Wonka offers to make you a partner in the factory!',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/FFD700/000000?text=Partner'
  },
  {
    id: 'test-wonka',
    title: 'Testing on Wonka',
    content: 'Wonka loves your flavor-changing candy! He immediately begins mass production and credits you as co-inventor.',
    character: 'Willy Wonka',
    imageUrl: 'https://placehold.co/200x200/FFD700/000000?text=Credits'
  }
];
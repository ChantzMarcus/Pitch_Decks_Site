'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WonkaButton from '@/components/ui/WonkaButton';
import WonkaCard from '@/components/ui/WonkaCard';

interface CandyIngredient {
  id: string;
  name: string;
  color: string;
  effect: string;
  icon: string;
}

interface CandyCreationState {
  name: string;
  ingredients: string[];
  shape: string;
  size: string;
  flavor: string;
  texture: string;
  color: string;
  created: boolean;
}

export default function CandyCreator() {
  const [state, setState] = useState<CandyCreationState>({
    name: '',
    ingredients: [],
    shape: 'round',
    size: 'medium',
    flavor: 'sweet',
    texture: 'smooth',
    color: 'multicolor',
    created: false
  });

  const [step, setStep] = useState<number>(1);
  const [candyName, setCandyName] = useState<string>('');

  const ingredients: CandyIngredient[] = [
    { id: 'chocolate', name: 'Chocolate', color: '#8B4513', effect: 'Rich and creamy', icon: '🍫' },
    { id: 'strawberry', name: 'Strawberry', color: '#FF69B4', effect: 'Sweet and fruity', icon: '🍓' },
    { id: 'mint', name: 'Mint', color: '#32CD32', effect: 'Cool and refreshing', icon: '🌿' },
    { id: 'caramel', name: 'Caramel', color: '#D2691E', effect: 'Smooth and buttery', icon: '🍯' },
    { id: 'vanilla', name: 'Vanilla', color: '#FFFDD0', effect: 'Classic and smooth', icon: '🍦' },
    { id: 'orange', name: 'Orange', color: '#FF8C00', effect: 'Citrusy and bright', icon: '🍊' },
    { id: 'blueberry', name: 'Blueberry', color: '#1E90FF', effect: 'Tart and sweet', icon: '🫐' },
    { id: 'coconut', name: 'Coconut', color: '#F5F5DC', effect: 'Tropical and nutty', icon: '🥥' }
  ];

  const shapes = [
    { id: 'round', name: 'Round', icon: '●' },
    { id: 'square', name: 'Square', icon: '■' },
    { id: 'star', name: 'Star', icon: '★' },
    { id: 'heart', name: 'Heart', icon: '♥' },
    { id: 'diamond', name: 'Diamond', icon: '◆' },
    { id: 'oval', name: 'Oval', icon: '⬭' }
  ];

  const sizes = [
    { id: 'tiny', name: 'Tiny', multiplier: 0.5 },
    { id: 'small', name: 'Small', multiplier: 0.75 },
    { id: 'medium', name: 'Medium', multiplier: 1 },
    { id: 'large', name: 'Large', multiplier: 1.5 },
    { id: 'huge', name: 'Huge', multiplier: 2 }
  ];

  const flavors = [
    { id: 'sweet', name: 'Sweet', description: 'Classic sugary taste' },
    { id: 'sour', name: 'Sour', description: 'Tangy and zesty' },
    { id: 'bitter', name: 'Bitter', description: 'Rich and complex' },
    { id: 'spicy', name: 'Spicy', description: 'Warm and exciting' },
    { id: 'cool', name: 'Cool', description: 'Minty freshness' },
    { id: 'fruity', name: 'Fruity', description: 'Natural fruit flavors' }
  ];

  const textures = [
    { id: 'smooth', name: 'Smooth', description: 'Silky and even' },
    { id: 'crunchy', name: 'Crunchy', description: 'Satisfying bite' },
    { id: 'chewy', name: 'Chewy', description: 'Fun to bite' },
    { id: 'soft', name: 'Soft', description: 'Melts in mouth' },
    { id: 'hard', name: 'Hard', description: 'Long-lasting' },
    { id: 'fizzy', name: 'Fizzy', description: 'Tingly sensation' }
  ];

  const colors = [
    { id: 'red', name: 'Red', hex: '#FF0000' },
    { id: 'blue', name: 'Blue', hex: '#0000FF' },
    { id: 'green', name: 'Green', hex: '#00FF00' },
    { id: 'yellow', name: 'Yellow', hex: '#FFFF00' },
    { id: 'purple', name: 'Purple', hex: '#800080' },
    { id: 'pink', name: 'Pink', hex: '#FFC0CB' },
    { id: 'orange', name: 'Orange', hex: '#FFA500' },
    { id: 'multicolor', name: 'Multicolor', hex: 'linear-gradient(45deg, #FF0000, #FF8000, #FFFF00, #00FF00, #0000FF, #800080, #FF00FF)' }
  ];

  const addIngredient = (ingredientId: string) => {
    if (!state.ingredients.includes(ingredientId)) {
      setState(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientId]
      }));
    }
  };

  const removeIngredient = (ingredientId: string) => {
    setState(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(id => id !== ingredientId)
    }));
  };

  const handleNextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Final step - create candy
      setState(prev => ({ ...prev, created: true }));
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetCandy = () => {
    setState({
      name: '',
      ingredients: [],
      shape: 'round',
      size: 'medium',
      flavor: 'sweet',
      texture: 'smooth',
      color: 'multicolor',
      created: false
    });
    setStep(1);
    setCandyName('');
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-chocolate-brown">Name Your Candy</h3>
            <p className="text-charcoal">Give your creation a unique and memorable name</p>
            <input
              type="text"
              value={candyName}
              onChange={(e) => setCandyName(e.target.value)}
              placeholder="Enter candy name..."
              className="w-full p-3 rounded-lg border-2 border-wonka-purple bg-cream text-chocolate-brown font-bold text-lg"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-chocolate-brown">Choose Ingredients</h3>
            <p className="text-charcoal">Select up to 4 ingredients for your candy</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ingredients.map(ingredient => (
                <motion.div
                  key={ingredient.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl cursor-pointer border-2 ${
                    state.ingredients.includes(ingredient.id)
                      ? 'border-wonka-yellow bg-wonka-pink'
                      : 'border-wonka-purple bg-cream'
                  }`}
                  onClick={() => {
                    if (state.ingredients.includes(ingredient.id)) {
                      removeIngredient(ingredient.id);
                    } else if (state.ingredients.length < 4) {
                      addIngredient(ingredient.id);
                    }
                  }}
                >
                  <div className="text-3xl text-center mb-2">{ingredient.icon}</div>
                  <div className="text-center font-bold text-chocolate-brown">{ingredient.name}</div>
                  <div className="text-center text-sm text-charcoal">{ingredient.effect}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-chocolate-brown">Select Shape</h3>
            <p className="text-charcoal">Choose the shape of your candy</p>
            <div className="grid grid-cols-3 gap-4">
              {shapes.map(shape => (
                <motion.div
                  key={shape.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-6 rounded-xl cursor-pointer border-2 ${
                    state.shape === shape.id
                      ? 'border-wonka-yellow bg-wonka-pink'
                      : 'border-wonka-purple bg-cream'
                  }`}
                  onClick={() => setState(prev => ({ ...prev, shape: shape.id }))}
                >
                  <div className="text-4xl text-center mb-2">{shape.icon}</div>
                  <div className="text-center font-bold text-chocolate-brown">{shape.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-chocolate-brown">Choose Size</h3>
            <p className="text-charcoal">Select the size of your candy</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {sizes.map(size => (
                <motion.div
                  key={size.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-xl cursor-pointer border-2 ${
                    state.size === size.id
                      ? 'border-wonka-yellow bg-wonka-pink'
                      : 'border-wonka-purple bg-cream'
                  }`}
                  onClick={() => setState(prev => ({ ...prev, size: size.id }))}
                >
                  <div className="text-center font-bold text-chocolate-brown">{size.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-chocolate-brown">Pick Flavor</h3>
            <p className="text-charcoal">Select the dominant flavor of your candy</p>
            <div className="grid grid-cols-2 gap-4">
              {flavors.map(flavor => (
                <motion.div
                  key={flavor.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl cursor-pointer border-2 ${
                    state.flavor === flavor.id
                      ? 'border-wonka-yellow bg-wonka-pink'
                      : 'border-wonka-purple bg-cream'
                  }`}
                  onClick={() => setState(prev => ({ ...prev, flavor: flavor.id }))}
                >
                  <div className="text-center font-bold text-chocolate-brown">{flavor.name}</div>
                  <div className="text-center text-sm text-charcoal">{flavor.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-chocolate-brown">Final Touches</h3>
            <p className="text-charcoal">Complete your candy with texture and color</p>
            
            <div>
              <h4 className="font-bold text-chocolate-brown mb-2">Texture</h4>
              <div className="grid grid-cols-2 gap-4">
                {textures.map(texture => (
                  <motion.div
                    key={texture.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl cursor-pointer border-2 ${
                      state.texture === texture.id
                        ? 'border-wonka-yellow bg-wonka-pink'
                        : 'border-wonka-purple bg-cream'
                    }`}
                    onClick={() => setState(prev => ({ ...prev, texture: texture.id }))}
                  >
                    <div className="text-center font-bold text-chocolate-brown">{texture.name}</div>
                    <div className="text-center text-sm text-charcoal">{texture.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-chocolate-brown mb-2">Color</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {colors.map(color => (
                  <motion.div
                    key={color.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-4 rounded-xl cursor-pointer border-2 ${
                      state.color === color.id
                        ? 'border-wonka-yellow ring-4 ring-wonka-yellow'
                        : 'border-wonka-purple'
                    }`}
                    onClick={() => setState(prev => ({ ...prev, color: color.id }))}
                    style={{ backgroundColor: color.hex.includes('gradient') ? color.hex : '' }}
                  >
                    <div 
                      className="w-full h-8 rounded mb-2"
                      style={{ backgroundColor: color.hex.includes('gradient') ? '' : color.hex }}
                    ></div>
                    <div className="text-center font-bold text-chocolate-brown text-sm">{color.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (state.created) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <WonkaCard variant="lollipop" className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-6"
          >
            <div 
              className="w-48 h-48 mx-auto rounded-full flex items-center justify-center text-8xl border-8 border-wonka-yellow"
              style={{ 
                backgroundColor: state.color === 'multicolor' 
                  ? 'linear-gradient(45deg, #FF0000, #FF8000, #FFFF00, #00FF00, #0000FF, #800080, #FF00FF)' 
                  : colors.find(c => c.id === state.color)?.hex,
                transform: `scale(${sizes.find(s => s.id === state.size)?.multiplier || 1})`
              }}
            >
              {shapes.find(s => s.id === state.shape)?.icon}
            </div>
          </motion.div>
          
          <h2 className="font-display text-4xl font-bold text-chocolate-brown mb-2">
            {candyName || "Your Amazing Candy!"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 text-left">
            <div className="bg-cream p-4 rounded-lg">
              <h3 className="font-bold text-wonka-purple mb-2">Ingredients:</h3>
              <ul className="list-disc pl-5">
                {state.ingredients.length > 0 ? (
                  state.ingredients.map(id => {
                    const ingredient = ingredients.find(i => i.id === id);
                    return ingredient ? <li key={id}>{ingredient.name}</li> : null;
                  })
                ) : (
                  <li>None selected</li>
                )}
              </ul>
            </div>
            
            <div className="bg-cream p-4 rounded-lg">
              <h3 className="font-bold text-wonka-purple mb-2">Properties:</h3>
              <ul className="list-disc pl-5">
                <li>Shape: {shapes.find(s => s.id === state.shape)?.name}</li>
                <li>Size: {sizes.find(s => s.id === state.size)?.name}</li>
                <li>Flavor: {flavors.find(f => f.id === state.flavor)?.name}</li>
                <li>Texture: {textures.find(t => t.id === state.texture)?.name}</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <WonkaButton variant="caramel" onClick={resetCandy}>
              Create Another Candy
            </WonkaButton>
          </div>
        </WonkaCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl font-bold text-wonka-purple mb-2">
          Create Your Own Wonka Candy
        </h1>
        <p className="text-chocolate-brown">Design a candy that's uniquely yours!</p>
      </div>

      <WonkaCard variant="gummy" className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-bold text-chocolate-brown">
            Step {step} of 6: {['Name', 'Ingredients', 'Shape', 'Size', 'Flavor', 'Finish'][step - 1]}
          </h2>
          <div className="flex space-x-2">
            {step > 1 && (
              <WonkaButton variant="chocolate" onClick={handlePrevStep}>
                ← Prev
              </WonkaButton>
            )}
            <WonkaButton variant="lollipop" onClick={handleNextStep}>
              {step < 6 ? 'Next →' : 'Create Candy!'}
            </WonkaButton>
          </div>
        </div>

        <div className="mb-6">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <div className="text-sm text-charcoal">
            {step}/6 steps complete
          </div>
          <div className="flex space-x-2">
            {step > 1 && (
              <WonkaButton variant="chocolate" size="sm" onClick={handlePrevStep}>
                Back
              </WonkaButton>
            )}
            <WonkaButton 
              variant="pop" 
              size="sm" 
              onClick={handleNextStep}
              disabled={
                (step === 1 && !candyName.trim()) ||
                (step === 6 && state.ingredients.length === 0)
              }
            >
              {step < 6 ? 'Continue' : 'Create Candy!'}
            </WonkaButton>
          </div>
        </div>
      </WonkaCard>

      <div className="mt-8 text-center">
        <div className="inline-block bg-wonka-yellow text-chocolate-brown px-4 py-2 rounded-full font-bold">
          🍬 Your Candy Creation Journey 🍬
        </div>
      </div>
    </div>
  );
}
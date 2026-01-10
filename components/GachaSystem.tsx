import React, { useState } from 'react';
import { Personality, PersonalityType } from '../types';
import { Box, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GachaBox from './GachaBox';
import Model3D from './Model3D';

const PERSONALITIES: Personality[] = [
  {
    id: 'STREAMER',
    name: 'Content creator & gamer',
    description: 'todo',
    modelPath: '/objects/astrid_stream.glb',
    color: '#FF7EDB',
    tags: ['Twitch', 'YouTube', 'Community']
  },
  {
    id: 'DEVELOPER',
    name: '3D R&D Developer',
    description: 'Graphics engineer xxx',
    modelPath: '/objects/astrid_research.glb',
    color: '#B4FEE7',
    tags: ['C++', 'OpenGL', 'Research']
  },
  {
    id: 'ARTIST',
    name: '2D/3D Artist',
    description: 'todo',
    modelPath: '/objects/astrid_art.glb',
    color: '#D6BBFB',
    tags: ['Blender', '2D Art', 'Design']
  }
];

const GachaSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [personality, setPersonality] = useState<Personality | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const pullGacha = () => {
    setIsOpening(true);
    setPersonality(null);
    setIsOpen(true);
  };

  const handleBoxComplete = () => {
    const randomPersonality = PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)];
    setPersonality(randomPersonality);
    setIsOpening(false);
  };

  const closeGacha = () => {
    setIsOpen(false);
    setPersonality(null);
    setIsOpening(false);
  };

  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={pullGacha}
        className="fixed bottom-10 right-10 z-50 bg-white text-black p-4 rounded-full shadow-2xl hover:bg-gray-200 transition-colors flex items-center justify-center"
      >
        <Box size={20} strokeWidth={1.5} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
               className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative mx-4"
             >
                <button 
                  onClick={closeGacha}
                  className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors z-10"
                >
                  <X size={18} />
                </button>
                
                <div className="p-10 flex flex-col items-center text-center">
                   <h3 className="font-mono text-xs tracking-widest text-gray-500 mb-8 uppercase">
                     Collect my personas
                   </h3>
                   
                   {isOpening ? (
                     <GachaBox onComplete={handleBoxComplete} />
                   ) : personality ? (
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-6 w-full"
                     >
                       {/* 3D rotating model */}
                       <Model3D modelPath={personality.modelPath} />
                       
                       <div className="space-y-4">
                         {/* Tags */}
                         <div className="flex gap-2 justify-center flex-wrap">
                           {personality.tags.map((tag, i) => (
                             <span 
                               key={i}
                               className="font-mono text-[10px] text-white/40 border border-white/10 px-2 py-1 rounded"
                             >
                               {tag}
                             </span>
                           ))}
                         </div>
                         
                         {/* name */}
                         <h4 
                           className="font-display font-bold text-2xl leading-tight"
                           style={{ color: personality.color }}
                         >
                           {personality.name}
                         </h4>
                         
                         {/* desc */}
                         <p className="text-white/60 text-sm max-w-md leading-relaxed">
                           {personality.description}
                         </p>
                         
                         {/* pull another button */}
                         <motion.button
                           whileHover={{ scale: 1.03 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={pullGacha}
                           className="mt-4 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors border border-white/10 flex items-center gap-2 mx-auto"
                         >
                           <Box size={14} />
                           Open another one!
                         </motion.button>
                       </div>
                     </motion.div>
                   ) : (
                     <div className="h-64 flex items-center justify-center">
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                         className="text-white/20"
                       >
                         <Sparkles size={48} strokeWidth={1} />
                       </motion.div>
                     </div>
                   )}
                </div>
                
                <div className="bg-white/5 p-3 text-center">
                  <span className="text-[10px] font-mono text-white/20">
                    CATCH THEM ALL!
                  </span>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GachaSystem;
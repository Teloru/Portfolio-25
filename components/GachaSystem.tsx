import React, { useState, useEffect } from 'react';
import { Personality, PersonalityType } from '../types';
import { Box, X, Sparkles, Trophy } from 'lucide-react';
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
  const [collected, setCollected] = useState<Set<PersonalityType>>(new Set());
  const [isNewUnlock, setIsNewUnlock] = useState(false);

  // load collected from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('astrid-collected-personas');
    if (saved) {
      setCollected(new Set(JSON.parse(saved)));
    }
  }, []);

  // saving to localStorage when collected changes
  useEffect(() => {
    if (collected.size > 0) {
      localStorage.setItem('astrid-collected-personas', JSON.stringify([...collected]));
    }
  }, [collected]);

  const pullGacha = () => {
    setIsOpening(true);
    setPersonality(null);
    setIsNewUnlock(false);
    setIsOpen(true);
  };

  const handleBoxComplete = () => {
    const randomPersonality = PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)];
    setPersonality(randomPersonality);
    
    // is it a new unlock?
    if (!collected.has(randomPersonality.id)) {
      setIsNewUnlock(true);
      setCollected(prev => new Set([...prev, randomPersonality.id]));
    }
    
    setIsOpening(false);
  };

  const closeGacha = () => {
    setIsOpen(false);
    setPersonality(null);
    setIsOpening(false);
    setIsNewUnlock(false);
  };

  const allCollected = collected.size === PERSONALITIES.length;

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
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
               className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-2xl overflow-y-auto shadow-2xl relative max-h-[90vh]"
             >
                <button 
                  onClick={closeGacha}
                  className="sticky top-4 right-4 ml-auto mr-4 mt-4 text-white/30 hover:text-white transition-colors z-50 bg-black/80 p-2 rounded-full backdrop-blur-sm flex items-center justify-center"
                >
                  <X size={18} />
                </button>
                
                <div className="px-6 pb-10 pt-2 flex flex-col items-center text-center">
                   {/* collection progress header */}
                   <div className="mb-6 flex flex-col items-center gap-3">
                     <h3 className="font-mono text-xs tracking-widest text-gray-500 uppercase">
                       Collect my personas
                     </h3>
                     
                     {/* collection badges */}
                     <div className="flex gap-2">
                       {PERSONALITIES.map((p) => {
                         const isCollected = collected.has(p.id);
                         return (
                           <button
                             key={p.id}
                             onClick={() => {
                               if (isCollected) {
                                 setPersonality(p);
                                 setIsOpening(false);
                                 setIsNewUnlock(false);
                               }
                             }}
                             disabled={!isCollected}
                             className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                               isCollected 
                                 ? 'border-white/40 opacity-100 cursor-pointer hover:scale-110 hover:brightness-125' 
                                 : 'border-white/10 opacity-30'
                             }`}
                             style={{ 
                               backgroundColor: isCollected ? `${p.color}40` : 'transparent'
                             }}
                           >
                             {isCollected ? (
                               <div className="text-xs">✓</div>
                             ) : (
                               <div className="text-xs text-white/20">?</div>
                             )}
                           </button>
                         );
                       })}
                     </div>
                     
                     {/* counter */}
                     <div className="font-mono text-[10px] text-white/40 relative z-10">
                       {collected.size}/{PERSONALITIES.length} Collected
                       {allCollected && (
                         <span className="ml-2 text-yellow-400">
                           <Trophy className="inline w-3 h-3 mb-0.5" /> Complete!
                         </span>
                       )}
                     </div>
                   </div>
                   
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
                         {/* new unlock badge */}
                         {isNewUnlock && (
                           <motion.div
                             initial={{ scale: 0, rotate: -10 }}
                             animate={{ scale: 1, rotate: 0 }}
                             className="inline-block bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/40 px-3 py-1 rounded-full"
                           >
                             <span className="text-yellow-400 font-black text-[10px] uppercase tracking-wider">
                               ✨ New Unlock!
                             </span>
                           </motion.div>
                         )}
                         
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
                       </div>
                       
                       {/* pull another button or completion message */}
                       {!allCollected ? (
                         <motion.button
                           whileHover={{ scale: 1.03 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={pullGacha}
                           className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors border border-white/10 flex items-center gap-2"
                         >
                           <Box size={14} />
                           Open another one!
                         </motion.button>
                       ) : (
                         <motion.div
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/30 px-6 py-4 rounded-xl"
                         >
                           <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                             <Trophy size={20} />
                             Collection Complete!
                           </div>
                           <p className="text-white/50 text-xs mt-2">
                             You've discovered all my personas :o GG!
                           </p>
                         </motion.div>
                       )}
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
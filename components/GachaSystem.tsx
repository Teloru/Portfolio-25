import React, { useState } from 'react';
import { GACHA_ITEMS } from '../constants';
import { GachaItem } from '../types';
import { Box, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GachaSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reward, setReward] = useState<GachaItem | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const pullGacha = () => {
    setIsOpening(true);
    setReward(null);
    setIsOpen(true);

    setTimeout(() => {
      const randomItem = GACHA_ITEMS[Math.floor(Math.random() * GACHA_ITEMS.length)];
      setReward(randomItem);
      setIsOpening(false);
    }, 1200);
  };

  const closeGacha = () => {
    setIsOpen(false);
    setReward(null);
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
               className="bg-[#0a0a0a] border border-white/10 w-96 rounded-2xl overflow-hidden shadow-2xl relative"
             >
                <button 
                  onClick={closeGacha}
                  className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
                
                <div className="p-10 flex flex-col items-center text-center">
                   <h3 className="font-mono text-xs tracking-widest text-gray-500 mb-8 uppercase">Micro-Rewards</h3>
                   
                   {isOpening ? (
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                       className="text-white/20 mb-6"
                     >
                       <Box size={48} strokeWidth={1} />
                     </motion.div>
                   ) : (
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-6"
                     >
                       <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                         <div className="text-white">
                            {reward?.icon}
                         </div>
                       </div>
                       
                       <div>
                         <div className="font-mono text-[10px] text-white/40 mb-2 border border-white/10 inline-block px-2 py-1 rounded">
                           {reward?.rarity}
                         </div>
                         <p className="font-display font-medium text-xl text-white leading-tight">
                           {reward?.text}
                         </p>
                       </div>
                     </motion.div>
                   )}
                </div>
                
                <div className="bg-white/5 p-3 text-center">
                  <span className="text-[10px] font-mono text-white/20">ASTRID_BEYER_COLLECTIBLES_v1.0</span>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GachaSystem;
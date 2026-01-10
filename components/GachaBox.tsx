import React, { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Heart, Zap } from 'lucide-react';

interface GachaBoxProps {
  onComplete: () => void;
}

const GachaBox: React.FC<GachaBoxProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'idle' | 'shaking' | 'pulling' | 'revealed'>('idle');
  const controls = useAnimation();

  const handleStart = async () => {
    if (step !== 'idle') return;
    setStep('shaking');
    await controls.start({
      rotate: [-3, 3, -3, 3, -3, 3, 0],
      transition: { duration: 0.4 }
    });
    setStep('pulling');
  };

  const completeOpening = () => {
    setStep('revealed');
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="relative w-full h-64 flex items-center justify-center perspective-1000">
      <AnimatePresence mode="wait">
        {step !== 'revealed' ? (
          <motion.div
            key="box-container"
            initial={{ scale: 0.8, opacity: 0, y: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: step === 'pulling' ? 40 : 0
            }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative cursor-pointer"
            onClick={handleStart}
          >
            {/* Box */}
            <motion.div
              animate={controls}
              className="relative w-32 h-40 bg-[#e5e0d8] border-2 border-black/10 rounded-lg shadow-2xl flex flex-col items-center justify-between py-4 overflow-hidden z-10"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-amber-100 to-orange-200" />
              <div className="text-[8px] font-black uppercase tracking-widest text-black/20 rotate-90 absolute -left-5 top-1/2 -translate-y-1/2">
                TELORU_SERIES_XX
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-black/10 flex items-center justify-center text-black/20 font-bold text-xl">
                ?
              </div>
              <div className="bg-black text-white text-[7px] font-black px-2 py-0.5 rounded italic">
                MYSTERY FIGURE
              </div>
            </motion.div>

            {/* Pull Tab */}
            {step === 'pulling' && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                drag="y"
                dragConstraints={{ top: -60, bottom: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={(_, info) => {
                  // limiting so we don't see the end of the pull tab
                  if (info.offset.y < -60) {
                    return false;
                  }
                }}
                onDragEnd={(_, info) => {
                  if (info.offset.y < -40) completeOpening();
                }}
                className="absolute -top-12 right-0 -translate-x-1/2 w-10 h-28 -z-9 cursor-grab active:cursor-grabbing overflow-hidden"
              >
                <div className="w-full h-full bg-pink-400 rounded-t-lg border-2 border-black/10 flex flex-col items-center pt-2 shadow-lg">
                  <div className="text-[8px] font-black text-white animate-bounce">PULL!</div>
                  <div className="flex flex-col items-center gap-0.5 mt-1">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-white/40" />
                    <div className="w-1 h-12 bg-white/20 rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'idle' && (
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-8 left-0 right-0 text-center text-white/60 text-sm font-medium"
              >
                Shake me!
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="reveal-burst"
            className="relative flex items-center justify-center"
          >
            {[Star, Heart, Zap, Sparkles].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 400, 
                  y: (Math.random() - 0.5) * 400,
                  scale: [0, 1.5, 0],
                  rotate: 720
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute"
              >
                <Icon size={32} className="text-white/60" fill="currentColor" />
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              className="text-4xl font-black italic text-white uppercase tracking-tighter"
            >
              NEW DROP!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GachaBox;

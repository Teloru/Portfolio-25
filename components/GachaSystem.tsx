import React, { useState, useEffect } from 'react';
import { Personality, PersonalityType } from '../types';
import { Box, X, Sparkles, Trophy, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GachaBox from './GachaBox';
import Model3D from './Model3D';

const PERSONALITIES: Personality[] = [
  {
    id: 'STREAMER',
    name: 'Content creator & gamer',
    description: 'I rlly like this headset... but the quality could be better ngl',
    modelPath: '/objects/astrid_stream.glb',
    color: '#FF7EDB',
    tags: ['Twitch', 'YouTube', 'Community']
  },
  {
    id: 'DEVELOPER',
    name: '3D R&D Developer',
    description: 'Graphics engineering by day',
    modelPath: '/objects/astrid_research.glb',
    color: '#B4FEE7',
    tags: ['C++', 'OpenGL', 'Research']
  },
  {
    id: 'ARTIST',
    name: '2D/3D Artist',
    description: 'If it\'s 3D, I\'m in!! (also 2D art is fun) (any art related to a computer, actually)',
    modelPath: '/objects/astrid_art.glb',
    color: '#D6BBFB',
    tags: ['Blender', '2D Art', 'Design']
  }
];

const GachaTrigger3D = () => {
  const groupRef = React.useRef<THREE.Group>(null);
  const lidRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.7) * 0.35;
      groupRef.current.rotation.x = Math.cos(t * 0.5) * 0.08;
      groupRef.current.position.y = Math.sin(t * 1.8) * 0.05;
    }

  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[2.4, 3, 4]} intensity={1.35} color="#fff5da" />

      <group ref={groupRef}>
        {/* blind box body */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[1.38, 1.45, 1.2]} />
          <meshStandardMaterial color="#f2d5ae" emissive="#8b5e34" emissiveIntensity={0.2} roughness={0.65} metalness={0.08} />
        </mesh>

        {/* box lid */}
        <mesh ref={lidRef} position={[0, 0.73, 0.02]}>
          <boxGeometry args={[1.48, 0.24, 1.28]} />
          <meshStandardMaterial color="#ffe7c8" emissive="#9a6d3f" emissiveIntensity={0.24} roughness={0.58} metalness={0.06} />
        </mesh>

        {/* logo patch */}
        <mesh position={[0, -0.08, 0.62]}>
          <planeGeometry args={[0.64, 0.7]} />
          <meshStandardMaterial color="#1b1b1b" emissive="#111111" emissiveIntensity={0.15} />
        </mesh>

        {/* eyes */}
        <mesh position={[-0.16, -0.03, 0.635]}>
          <sphereGeometry args={[0.045, 18, 18]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.7} />
        </mesh>
        <mesh position={[0.16, -0.03, 0.635]}>
          <sphereGeometry args={[0.045, 18, 18]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.7} />
        </mesh>

        {/* little mouth */}
        <mesh position={[0, -0.2, 0.635]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.065, 0.01, 10, 24, Math.PI]} />
          <meshStandardMaterial color="#ff7ab9" emissive="#ff4f9f" emissiveIntensity={0.7} />
        </mesh>
      </group>
    </>
  );
};

const GachaSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [personality, setPersonality] = useState<Personality | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [collected, setCollected] = useState<Set<PersonalityType>>(new Set());
  const [isNewUnlock, setIsNewUnlock] = useState(false);
  const [isMobilePulling, setIsMobilePulling] = useState(false);
  const [mobilePullDistance, setMobilePullDistance] = useState(0);
  const mobilePullStartXRef = React.useRef<number | null>(null);

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
  const mobilePullMax = 56;
  const mobileSwipeThreshold = 44;
  const mobileTabWidth = 36 + mobilePullDistance;
  const mobilePullProgress = mobilePullDistance / mobilePullMax;

  const handleMobilePullStart = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    mobilePullStartXRef.current = info.point.x;
    setIsMobilePulling(true);
  };

  const handleMobilePullMove = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (mobilePullStartXRef.current === null) return;
    const delta = mobilePullStartXRef.current - info.point.x;
    const clamped = Math.max(0, Math.min(mobilePullMax, delta));
    setMobilePullDistance(clamped);
  };

  const handleMobilePullEnd = () => {
    if (mobilePullStartXRef.current === null) return;
    const shouldOpen = mobilePullDistance >= mobileSwipeThreshold;
    mobilePullStartXRef.current = null;
    setIsMobilePulling(false);
    setMobilePullDistance(0);
    if (shouldOpen) {
      pullGacha();
    }
  };

  return (
    <>
      <motion.button
        animate={{ y: [0, -4, 0], rotate: [0, -1, 1, 0] }}
        transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.7 }}
        whileHover={{ scale: 1.08, rotate: [0, -3, 3, -2, 2, 0], transition: { duration: 0.45 } }}
        whileTap={{ scale: 0.93, rotate: 0 }}
        onClick={pullGacha}
        aria-label="Open mystery gacha box"
        className="group fixed right-2 md:right-8 bottom-[calc(5.4rem+env(safe-area-inset-bottom))] md:bottom-8 z-50 hidden md:block md:h-[108px] md:w-[108px]"
      >
        <div className="h-full w-full">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 32 }} dpr={[1, 1.8]}>
            <GachaTrigger3D />
          </Canvas>
        </div>
      </motion.button>

      <motion.div
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        aria-label="Swipe left to open mystery gacha box"
        className="fixed right-0 bottom-[calc(3.7rem+env(safe-area-inset-bottom))] z-10 md:hidden"
      >
        <motion.div
          style={{ width: mobileTabWidth }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onPanStart={handleMobilePullStart}
          onPan={handleMobilePullMove}
          onPanEnd={handleMobilePullEnd}
          className="relative h-14 rounded-l-2xl border border-white/15 bg-gradient-to-l from-[#232323] via-[#171717] to-[#0d0d0d] shadow-[0_8px_24px_rgba(0,0,0,0.45)] overflow-hidden touch-none select-none cursor-ew-resize"
        >
          <div className="flex h-full items-center justify-start gap-1.5 pl-2.5 pr-2">
            <motion.div
              animate={isMobilePulling ? { x: 0 } : { x: [0, -2, 0] }}
              transition={
                isMobilePulling
                  ? { duration: 0.2, ease: [0.42, 0, 0.58, 1] }
                  : { duration: 0.42, ease: [0.42, 0, 0.58, 1], repeat: Infinity, repeatDelay: 6.8 }
              }
              className="text-white/90 shrink-0"
            >
              <ChevronLeft size={15} />
            </motion.div>
            <motion.span
              initial={false}
              animate={{ opacity: mobilePullProgress }}
              transition={{ duration: 0.15 }}
              className="font-mono text-[10px] uppercase tracking-widest text-white/75"
            >
              Swipe
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

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
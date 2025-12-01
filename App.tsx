import React, { useState } from 'react';
import { SectionType } from './types';
import Scene3D from './components/Cube3D';
import GachaSystem from './components/GachaSystem';
import { SECTIONS, DEV_PROJECTS, ART_PROJECTS } from './constants';
import { ArrowRight, Github, Linkedin, Mail, Twitch, Coffee, MapPin, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<SectionType>(SectionType.HOME);

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex font-sans selection:bg-white selection:text-black">
      
      {/* 3D Scene Layer */}
      <Scene3D currentSection={currentSection} />

      {/* Brand Mark - Fixed Top Left */}
      <div className="fixed top-8 left-8 md:left-12 z-50 mix-blend-difference pointer-events-none">
        <h1 className="font-display font-bold text-lg tracking-tighter leading-none">
          AB.
        </h1>
      </div>

      {/* Floating Navigation - Left Center */}
      <nav className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className="group flex items-center gap-4 focus:outline-none"
          >
            <span className={`font-mono text-xs transition-all duration-300 ${
              currentSection === section.id ? 'text-white translate-x-2' : 'text-white/30 group-hover:text-white/60'
            }`}>
              {section.label}
            </span>
            {currentSection === section.id && (
              <motion.div 
                layoutId="nav-indicator"
                className="w-1 h-1 bg-white rounded-full" 
              />
            )}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="flex justify-between px-2">
           {SECTIONS.slice(0, 4).map(s => (
             <button 
               key={s.id} 
               onClick={() => setCurrentSection(s.id)} 
               className={`text-[10px] font-mono ${currentSection === s.id ? 'text-white' : 'text-gray-500'}`}
             >
               {s.id.substring(0,3)}
             </button>
           ))}
        </div>
      </div>

      {/* Main Content Area - Slide in from Right/Bottom */}
      <main className="absolute inset-0 z-10 flex flex-col items-end justify-center pointer-events-none">
        <div className="w-full md:w-[60%] lg:w-[50%] h-full md:h-[90vh] md:mr-12 lg:mr-24 pointer-events-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="h-full w-full overflow-y-auto no-scrollbar"
            >
              <div className="min-h-full w-full p-6 md:p-12 pt-28 md:pt-12 flex flex-col justify-center">
                {currentSection === SectionType.HOME && <HomeSection setCurrentSection={setCurrentSection} />}
                {currentSection === SectionType.DEV && <DevSection />}
                {currentSection === SectionType.ART && <ArtSection />}
                {currentSection === SectionType.XP && <ExperienceSection />}
                {currentSection === SectionType.STREAM && <StreamSection />}
                {currentSection === SectionType.CONTACT && <ContactSection />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <GachaSystem />
    </div>
  );
};

// --- Sections ---

const HomeSection = ({ setCurrentSection }: { setCurrentSection: (s: SectionType) => void }) => (
  <div className="flex flex-col gap-8">
    <div>
      <h2 className="font-display font-extrabold text-6xl md:text-8xl tracking-tight leading-[0.85] mb-6">
        GRAPHICS<br/>ENGINEER
      </h2>
      <div className="h-[1px] w-24 bg-white/20 mb-6" />
      
      <div className="space-y-4 max-w-md">
        <p className="font-mono text-sm text-white leading-relaxed">
          <span className="text-gray-400">Welcome! I'm Astrid.</span><br/>
          Currently working as a 3D software engineer <span className="text-white border-b border-white/30"><a href="https://h3d.ai/" target="_blank">@h3d</a></span>.
        </p>
        
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <MapPin size={12} /> Based in La Ciotat, France.
        </div>

        <p className="font-mono text-xs text-gray-400 pt-4 leading-relaxed border-l-2 border-white/10 pl-4">
          Passionate about all things tech and 3D. <br/>
          VR/AR • Drones • Digital Art • Music • Y2K Video Games
        </p>
      </div>
    </div>
    
    <div className="flex gap-4 pt-4">
       <button onClick={() => setCurrentSection(SectionType.DEV)} className="group flex items-center gap-2 font-mono text-xs border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all">
         VIEW WORK <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
       </button>
       <button onClick={() => setCurrentSection(SectionType.CONTACT)} className="group flex items-center gap-2 font-mono text-xs px-6 py-3 rounded-full hover:bg-white/5 transition-all text-gray-400 hover:text-white">
         CONTACT
       </button>
    </div>
  </div>
);

const DevSection = () => (
  <div className="w-full pb-20 pt-10 md:pt-0">
    <div className="mb-12">
       <span className="font-mono text-xs text-white/40 mb-2 block">02_ENGINEERING</span>
       <h2 className="font-display font-bold text-4xl md:text-5xl">Selected Works</h2>
    </div>
    <div className="space-y-16">
      {DEV_PROJECTS.map((project, i) => (
        <div key={project.id} className="group cursor-pointer">
          <a href={project.link} target="_blank">
            <div className="relative mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-white/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
              <img src={project.image} alt={project.title} className="w-full aspect-[16/9] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
            </div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                  <h3 className="font-display font-bold text-2xl mb-2 group-hover:text-white/80">{project.title}</h3>
                  <p className="font-mono text-xs text-gray-500 max-w-sm mb-4">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] border border-white/10 px-2 py-1 text-gray-400 uppercase">
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  </div>
);

const ArtSection = () => (
  <div className="w-full pb-20 pt-10 md:pt-0">
     <div className="mb-12">
       <span className="font-mono text-xs text-white/40 mb-2 block">03_CREATIVE</span>
       <h2 className="font-display font-bold text-4xl md:text-5xl">Digital Atelier</h2>
       <p className="font-mono text-xs text-gray-500 mt-4">@teloru • Blender • 3D • 2D</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {ART_PROJECTS.map((project) => (
        <div key={project.id} className="relative group cursor-pointer aspect-square bg-white/5 overflow-hidden">
           <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
           <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="font-display font-bold text-xl">{project.title}</h3>
              <p className="font-mono text-[10px] text-gray-300 mt-1">{project.tags.join(' + ')}</p>
           </div>
        </div>
      ))}
    </div>
  </div>
);

const ExperienceSection = () => (
   <div className="max-w-3xl w-full pb-24 pt-10 md:pt-0">
      <div className="mb-16">
         <span className="font-mono text-xs text-white/40 mb-2 block">05_LOGS</span>
         <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Experience & Education</h2>
      </div>

      <div className="grid grid-cols-1 gap-16">
        {/* Experience Column */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-8 border-b border-white/10 pb-2">Professional</h3>
          
          <div className="relative border-l border-white/10 ml-1 space-y-12">
            
            <div className="relative pl-8 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white rounded-full group-hover:scale-125 transition-transform" />
              <span className="font-mono text-[10px] text-white/50 mb-1 block">Apr 2024 - Sep 2024 • Aix-en-Provence</span>
              <h3 className="font-display font-bold text-xl mb-1 text-white">Dassault Systèmes</h3>
              <p className="font-mono text-xs text-white/70 mb-3 bg-white/5 inline-block px-2 py-1 rounded">SE Intern • Additive Manufacturing</p>
              <ul className="text-xs text-gray-400 leading-relaxed font-light list-disc pl-4 space-y-1 marker:text-white/30">
                <li>Designed a G-code export feature compatible with multiple 3D printer models (Ultimaker, Raise3D).</li>
                <li>Implemented a flexible UI for machine-specific printing parameters.</li>
                <li>Coordinated remote testing with a team in Vélizy within an Agile Scrum environment.</li>
              </ul>
            </div>

            <div className="relative pl-8 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
              <span className="font-mono text-[10px] text-white/50 mb-1 block">Apr 2023 - Jun 2023 • Marseille</span>
              <h3 className="font-display font-bold text-xl mb-1 text-gray-200">LIS Lab</h3>
              <p className="font-mono text-xs text-white/70 mb-3 bg-white/5 inline-block px-2 py-1 rounded">CG Researcher Intern • G-Mod Team</p>
              <ul className="text-xs text-gray-400 leading-relaxed font-light list-disc pl-4 space-y-1 marker:text-white/30">
                <li>Optimized topological extraction scripts on 3D shapes using TTK library.</li>
                <li>Added support for STL and PLY formats and implemented segmentation filters.</li>
                <li>Refactored C++ code, reducing compatibility errors by 30% and improving efficiency by 20%.</li>
              </ul>
            </div>

            <div className="relative pl-8 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
              <span className="font-mono text-[10px] text-white/50 mb-1 block">Apr 2022 - Aug 2022 • La Ciotat</span>
              <h3 className="font-display font-bold text-xl mb-1 text-gray-200">Iconik</h3>
              <p className="font-mono text-xs text-white/70 mb-3 bg-white/5 inline-block px-2 py-1 rounded">CMS Developer Intern</p>
              <ul className="text-xs text-gray-400 leading-relaxed font-light list-disc pl-4 space-y-1 marker:text-white/30">
                <li>Led development of Iconik's website for VR video game services.</li>
                <li>Reduced page load time by 25% through optimization.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Education Column */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-8 border-b border-white/10 pb-2">Education</h3>
          
          <div className="space-y-8">
            <div className="group">
               <div className="flex justify-between items-baseline mb-1">
                 <h3 className="font-display font-bold text-lg">Aix-Marseille University</h3>
                 <span className="font-mono text-[10px] text-white/40">2024</span>
               </div>
               <p className="font-mono text-xs text-white/80 mb-1">MS in Computer Science</p>
               <p className="text-xs text-gray-500">Spec: Computer Graphics and Applied Geometry</p>
            </div>

            <div className="group">
               <div className="flex justify-between items-baseline mb-1">
                 <h3 className="font-display font-bold text-lg text-gray-300">Aix-Marseille University</h3>
                 <span className="font-mono text-[10px] text-white/40">2022</span>
               </div>
               <p className="font-mono text-xs text-white/80 mb-1">BS in Computer Science</p>
               <p className="text-xs text-gray-500">Major: GPU Programming | Minor: Human-Machine Interface</p>
            </div>

            <div className="group">
               <div className="flex justify-between items-baseline mb-1">
                 <h3 className="font-display font-bold text-lg text-gray-300">Aix-Marseille University</h3>
                 <span className="font-mono text-[10px] text-white/40">2020</span>
               </div>
               <p className="font-mono text-xs text-white/80 mb-1">Associate Degree</p>
               <p className="text-xs text-gray-500">Spec: Software development, UNIX, Qt</p>
            </div>
          </div>
        </div>

      </div>
   </div>
);

const StreamSection = () => (
  <div className="h-full flex flex-col justify-center">
    <div className="w-full aspect-video bg-white/5 relative overflow-hidden group mb-8 border border-white/10 rounded-lg max-h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
         <Twitch size={48} className="text-white group-hover:scale-110 transition-transform duration-300" />
      </div>
      <img src="https://picsum.photos/800/450?grayscale" className="w-full h-full object-cover opacity-50" alt="Stream Background" />
      <div className="absolute bottom-4 right-4 z-20 font-mono text-xs bg-red-600 text-white px-2 py-1 rounded animate-pulse">
        OFFLINE
      </div>
    </div>
    
    <h2 className="font-display font-bold text-4xl mb-4">Twitch.tv</h2>
    <p className="font-mono text-sm text-gray-400 mb-6 max-w-md">
      Occasional streams on my Twitch channel-- Come take a look!
    </p>
    
    <div className="flex gap-2 mb-8">
      {['#sega', '#atlus', '#jrpg', '#retro'].map(tag => (
        <span key={tag} className="text-[10px] font-mono border border-white/20 px-2 py-1 rounded-full text-white/60">
          {tag}
        </span>
      ))}
    </div>
    
    <a href="https://twitch.tv/teloru" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 font-mono text-xs text-white border-b border-white pb-1 w-max hover:text-gray-300 hover:border-gray-300 transition-colors">
      twitch.tv/teloru <ArrowRight size={12} />
    </a>
  </div>
);

const ContactSection = () => (
  <div className="flex flex-col justify-center min-h-[50vh] pb-12 pt-10 md:pt-0">
    <h2 className="font-display font-extrabold text-5xl md:text-7xl mb-12 tracking-tighter leading-[0.9]">
      LET'S<br/>CREATE.
    </h2>
    
    <div className="flex flex-col gap-12 max-w-xl">
      
      {/* Status Block */}
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase text-green-400">Status: Open for opportunities</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed font-light mb-4">
          Open to remote work. Eager to contribute to research projects in real time rendering.
        </p>
        <div className="flex flex-wrap gap-2">
           {['C++', 'JS/TS', 'React', 'Vue', 'ThreeJS', 'BabylonJS'].map(tech => (
             <span key={tech} className="font-mono text-[10px] bg-white/10 px-2 py-1 rounded text-white/80">{tech}</span>
           ))}
        </div>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 gap-6">
        <a href="mailto:astrid.beyer@orange.fr" className="group flex items-center justify-between border-b border-white/20 pb-4 hover:border-white transition-colors">
          <div className="flex items-center gap-4">
            <Mail size={18} />
            <span className="font-display text-xl">Email</span>
          </div>
          <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </a>

        <a href="https://ko-fi.com/teloru" target="_blank" className="group flex items-center justify-between border-b border-white/20 pb-4 hover:border-white transition-colors">
          <div className="flex items-center gap-4">
            <Coffee size={18} className="text-pink-300" />
            <div className="flex flex-col">
              <span className="font-display text-xl">Ko-fi</span>
              <span className="font-mono text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors">Free Notion/Discord templates</span>
            </div>
          </div>
          <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </a>

        <a href="https://www.linkedin.com/in/astrid-be/" target="_blank" className="group flex items-center justify-between border-b border-white/20 pb-4 hover:border-white transition-colors">
          <div className="flex items-center gap-4">
            <Linkedin size={18} />
            <span className="font-display text-xl">LinkedIn</span>
          </div>
          <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </a>
      </div>
    </div>
  </div>
);

export default App;
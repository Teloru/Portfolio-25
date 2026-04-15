import React, { useState, useEffect } from 'react';
import { SectionType } from './types';
import Scene3D from './components/Cube3D';
import GachaSystem from './components/GachaSystem';
import { SECTIONS, DEV_PROJECTS, ART_PROJECTS } from './constants';
import { ArrowRight, Github, Linkedin, Mail, Twitch, Coffee, MapPin, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const SECTION_BY_HASH: Record<string, SectionType> = {
  home: SectionType.HOME,
  engineering: SectionType.DEV,
  dev: SectionType.DEV,
  art: SectionType.ART,
  stream: SectionType.STREAM,
  twitch: SectionType.STREAM,
  experiences: SectionType.XP,
  experience: SectionType.XP,
  xp: SectionType.XP,
  contact: SectionType.CONTACT
};

const getSectionFromHash = (): SectionType => {
  if (typeof window === 'undefined') {
    return SectionType.HOME;
  }

  const rawHash = window.location.hash.replace(/^#/, '').toLowerCase();
  return SECTION_BY_HASH[rawHash] ?? SectionType.HOME;
};

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<SectionType>(() => getSectionFromHash());
  const [selectedProject, setSelectedProject] = useState<typeof ART_PROJECTS[0] | null>(null);

  useEffect(() => {
    if (window.location.hash) {
      // Keep deep-link support on first load, then restore a clean canonical URL.
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, '', cleanUrl);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white overflow-x-hidden flex font-sans selection:bg-white selection:text-black">
      
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
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-lg border-t border-white/10 px-2 py-3">
        <div className="flex items-center w-full gap-2 px-1">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setCurrentSection(s.id)}
              className={`flex-1 min-w-0 text-center text-[10px] font-mono uppercase tracking-wide py-1 border-b whitespace-nowrap transition-colors ${currentSection === s.id ? 'text-white border-white/60' : 'text-gray-500 border-transparent'}`}
            >
              {s.label.replace(/^\d+_/, '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area - Slide in from Right/Bottom */}
      <main className="absolute inset-0 z-10 overflow-y-auto pointer-events-auto">
        <div className="w-full min-h-screen flex flex-col items-end justify-center pointer-events-none">
          <div className={`w-full md:w-[60%] lg:w-[50%] min-h-screen md:min-h-[90vh] md:mr-4 lg:mr-12 xl:mr-24 pointer-events-auto max-w-full ${currentSection === SectionType.HOME ? '' : 'md:my-[5vh]'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="w-full"
              >
                <div className={`w-full p-4 sm:p-6 md:p-8 lg:p-6 xl:p-4 pt-28 md:pt-12 flex flex-col justify-center overflow-x-hidden ${currentSection === SectionType.HOME ? 'min-h-screen md:min-h-[90vh]' : 'min-h-full'}`}>
                {currentSection === SectionType.HOME && <HomeSection setCurrentSection={setCurrentSection} />}
                {currentSection === SectionType.DEV && <DevSection />}
                {currentSection === SectionType.ART && <ArtSection onProjectClick={setSelectedProject} />}
                {currentSection === SectionType.XP && <ExperienceSection />}
                {currentSection === SectionType.STREAM && <StreamSection />}
                {currentSection === SectionType.CONTACT && <ContactSection />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </main>

      <GachaSystem />

      {/* Lightbox Modal - Rendered at root level */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-6xl max-h-[90vh] flex flex-col items-center pointer-events-none"
            >
              {/* Image or Video */}
              <div className="relative w-auto h-auto max-h-[80vh] flex items-center justify-center pointer-events-auto">
                {selectedProject.image?.toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={selectedProject.image}
                    autoPlay
                    loop
                    playsInline
                    controls
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>

              {/* Info & Instagram Link */}
              <div className="mt-6 text-center pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  {selectedProject.title}
                </h3>
                <p className="font-mono text-xs text-gray-400 mb-4">
                  {selectedProject.tags.join(' • ')}
                </p>
                
                {selectedProject.instagramLink && (
                  <a
                    href={selectedProject.instagramLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-white/70 border-b border-white/30 hover:text-white hover:border-white transition-colors"
                  >
                    ♡ like it on my Instagram
                  </a>
                )}
              </div>

              {/* Close hint */}
              <p className="mt-4 text-white/40 text-xs font-mono pointer-events-none">
                Click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sections ---

const HomeSection = ({ setCurrentSection }: { setCurrentSection: (s: SectionType) => void }) => (
  <div className="flex flex-col gap-8 max-w-full">
    <div>
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.85] mb-6 max-w-full">
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
    
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
       <button onClick={() => setCurrentSection(SectionType.DEV)} className="group flex items-center justify-center gap-2 font-mono text-xs border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all whitespace-nowrap">
         VIEW WORK <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
       </button>
       <button onClick={() => setCurrentSection(SectionType.CONTACT)} className="group flex items-center justify-center gap-2 font-mono text-xs px-6 py-3 rounded-full hover:bg-white/5 transition-all text-gray-400 hover:text-white whitespace-nowrap">
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
        <div key={project.id} className="group">
          <div className="relative mb-6 overflow-hidden">
            {project.link ? (
              <a href={project.link} target="_blank" rel="noreferrer" className="block" aria-label={`Open ${project.title}`}>
                <div className="absolute inset-0 bg-white/5 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                <img src={project.image} alt={project.title} className="w-full aspect-[16/9] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
              </a>
            ) : (
              <>
                <div className="absolute inset-0 bg-white/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img src={project.image} alt={project.title} className="w-full aspect-[16/9] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
              </>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <h3 className="font-display font-bold text-2xl mb-2 group-hover:text-white/80">{project.title}</h3>
                <p className="font-mono text-xs text-gray-500 max-w-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wide">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-white/70 border-b border-white/30 hover:text-white hover:border-white transition-colors">
                      Project Link
                    </a>
                  )}
                  {project.extraLink && (
                    <a href={project.extraLink.url} target="_blank" rel="noreferrer" className="text-white/70 border-b border-white/30 hover:text-white hover:border-white transition-colors">
                      {project.extraLink.label}
                    </a>
                  )}
                </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
                {project.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] border border-white/10 px-2 py-1 text-gray-400 uppercase">
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ArtSection = ({ onProjectClick }: { onProjectClick: (project: typeof ART_PROJECTS[0]) => void }) => {
  return (
    <div className="w-full pb-20 pt-10 md:pt-0">
       <div className="mb-12">
         <span className="font-mono text-xs text-white/40 mb-2 block">03_CREATIVE</span>
         <h2 className="font-display font-bold text-4xl md:text-5xl">Digital Atelier</h2>
         <p className="font-mono text-xs text-gray-500 mt-4"><a className='border-b border-white/30' href="https://www.instagram.com/teloru_/" target="_blank">@teloru</a> • Blender • Clip Studio Paint • Photoshop • Davinci Resolve</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {ART_PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className="relative group cursor-pointer aspect-square bg-white/5 overflow-hidden w-full max-w-full"
            onClick={() => onProjectClick(project)}
          >
             {project.image?.toLowerCase().endsWith('.mp4') ? (
               <video
                 src={project.image}
                 muted
                 autoPlay
                 loop
                 playsInline
                 preload="metadata"
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
               />
             ) : (
               <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
             )}
             <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-display font-bold text-xl">{project.title}</h3>
                <p className="font-mono text-[10px] text-gray-300 mt-1">{project.tags.join(' + ')}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceSection = () => (
   <div className="max-w-full lg:max-w-3xl w-full pb-24 pt-10 md:pt-0">
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
              <span className="font-mono text-[10px] text-white/50 mb-1 block">Dec 2024 - today • Copenhagen, Denmark</span>
              <div className="xp-domain-row">
                <h3 className="font-display font-bold text-xl text-white">H3D</h3>
                <span className="xp-domain-tag">MedTech</span>
              </div>
              <p className="font-mono text-xs text-white/70 mb-3 bg-white/5 inline-block px-2 py-1 rounded">3D R&D SE • Dental R&D Team</p>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-2">
                Development of advanced 3D dental scanning solutions with a focus on geometric processing and mesh optimization applied to patient scans.
              </p>
              <ul className="text-xs text-gray-400 leading-relaxed font-light list-disc pl-4 space-y-1 marker:text-white/30">
                <li>Lead developer for Models and Retainers, designing production-grade 3D geometry pipelines from segmented dental scans to printable devices. Presents products at international dental trade shows</li>
                <li>Implement surface generation, boolean, and normal-offset surface computation algorithms using PyMesh, libigl, Trimesh, and Shapely.</li>
                <li>Led the Hugin project, reducing ML pipeline runtime by 5-10% by dynamically downloading model weights at runtime instead of embedding them in Docker images. This optimization accelerated CI/CD builds and cut execution time of large test sets by over an hour.</li>
                <li>Coordinating Dental team releases and managed client account provisioning, ensuring smooth integration into production workflows.</li>
                <li>Partnered closely with fullstack, AI, and product teams to align technical solutions with business objectives. </li>
                <li>Contributed to cybersecurity initiatives, enhancing pipeline and infrastructure security.</li>
              </ul>
            </div>

            <div className="relative pl-8 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
              <span className="font-mono text-[10px] text-white/50 mb-1 block">Oct 2024 - Mar 2025 • Castelnau-le-Lez, France</span>
              <div className="xp-domain-row">
                <h3 className="font-display font-bold text-xl text-gray-200">Ubisoft Montpellier</h3>
                <span className="xp-domain-tag">Video Game</span>
              </div>
              <p className="font-mono text-xs text-white/70 mb-3 bg-white/5 inline-block px-2 py-1 rounded">Programming Mentee • Global Mentoring Program</p>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-2">
                Participation in a mentorship program with Ubisoft, designed to support young talent in developing their programming skills. Developed a Tower Defense in C++ using <a className="xp-link" target="_blank" rel="noopener noreferrer" href="https://www.sfml-dev.org/fr/">SFML</a>, focusing on real-time rendering logic and spatial representation in a pseudo-3D environment.</p>
              <ul className="text-xs text-gray-400 leading-relaxed font-light list-disc pl-4 space-y-1 marker:text-white/30">
                <li>Implemented an isometric rendering system using SFML (no engine), leveraging draw order and spatial sorting to simulate depth.</li>
                <li>Designed a multi-orientation view system (4 camera rotations), dynamically recomputing scene layout and entity positioning based on player perspective.</li>
                <li>Applied angle-based transformations and coordinate remapping to support seamless board rotation and consistent gameplay logic across views.</li>
                <li>Managed dynamic entities (e.g. projectiles) with a lightweight lifecycle system, handling memory, visibility, and cleanup in a real-time context.</li>
                <li>Structured the project around a modular, performance-oriented architecture inspired by ECS patterns.</li>
                <li>Documented technical decisions and implementation in a <a className="xp-link" href="https://www.youtube.com/watch?v=-2z1FbOyCks" target="_blank" rel="noopener noreferrer">YouTube</a> breakdown.</li>
              </ul>
            </div>
            <div className="relative pl-8 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
              <span className="font-mono text-[10px] text-white/50 mb-1 block">Apr 2024 - Sep 2024 • Aix-en-Provence, France</span>
              <div className="xp-domain-row">
                <h3 className="font-display font-bold text-xl text-white">Dassault Systèmes</h3>
                <span className="xp-domain-tag">Industry 5.0</span>
              </div>
              <p className="font-mono text-xs text-white/70 mb-3 bg-white/5 inline-block px-2 py-1 rounded">3D SE Intern • Additive Manufacturing</p>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-2">
                Six-month graduation internship. Developed a customizable post-processing pipeline for generating machine-specific G-code within the 3DEXPERIENCE platform, bridging 3D model data and physical fabrication constraints.
              </p>
              <ul className="text-xs text-gray-400 leading-relaxed font-light list-disc pl-4 space-y-1 marker:text-white/30">
                <li>Designed and implemented a G-code generation system supporting multiple 3D printers (Ultimaker, Raise3D...), translating geometric toolpaths into machine instructions.</li>
                <li>Analyzed and adapted toolpath generation strategies (infill density, extrusion behavior, retraction) to mitigate manufacturing defects such as warping and material inconsistencies.</li>
                <li>Reverse-engineered and handled printer-specific file formats (APT, G-code variants) to ensure compatibility across heterogeneous hardware.</li>
                <li>Conducted visual debugging and analysis of 3D toolpaths, identifying limitations in internal software and contributing to pipeline improvements.</li>
                <li>Built a flexible UI for configuring machine-dependent parameters, enabling real-time customization of fabrication settings.</li>
                <li>Collaborated with cross-functional teams (including remote hardware teams in Vélizy's lab) to validate outputs on physical devices.</li>
              </ul>
            </div>

            <div className="relative pl-8 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
              <span className="font-mono text-[10px] text-white/50 mb-1 block">Apr 2023 - Jun 2023 • Marseille, France</span>
              <div className="xp-domain-row">
                <h3 className="font-display font-bold text-xl text-gray-200">LIS Lab</h3>
                <span className="xp-domain-tag">Research Lab</span>
              </div>
              <p className="font-mono text-xs text-white/70 mb-3 bg-white/5 inline-block px-2 py-1 rounded">CG Researcher Intern • G-Mod Team</p>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-2">
                Research internship project at LIS Lab using Reeb graphs and shape indexing (TTK library) to analyze 3D mesh topology for classification, segmentation, and simplification tasks.
              </p>
              <ul className="text-xs text-gray-400 leading-relaxed font-light list-disc pl-4 space-y-1 marker:text-white/30">
                <li>Optimized topological extraction scripts on 3D shapes using TTK/VTK library.</li>
                <li>Added support for STL and PLY formats and implemented segmentation filters.</li>
                <li>Refactored C++ code, reducing compatibility errors by 30% and improving efficiency by 20%.</li>
              </ul>
            </div>

            <div className="relative pl-8 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
              <span className="font-mono text-[10px] text-white/50 mb-1 block">Apr 2022 - Aug 2022 • La Ciotat, France</span>
              <div className="xp-domain-row">
                <h3 className="font-display font-bold text-xl text-gray-200">Iconik</h3>
                <span className="xp-domain-tag">Video Game</span>
              </div>
              <p className="font-mono text-xs text-white/70 mb-3 bg-white/5 inline-block px-2 py-1 rounded">CMS Developer Intern • Communication team</p>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-2">
                Led development of Iconik's website (WordPress) for VR video game services
              </p>
              <ul className="text-xs text-gray-400 leading-relaxed font-light list-disc pl-4 space-y-1 marker:text-white/30">
                <li>Reduced page load time by 25% through optimization.</li>
                <li>Designed websites mockups and developed front-end components.</li>
                <li>Created theme + back-end plugin system for easy customization.</li>
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

const FEATURED_YOUTUBE_VIDEOS = [
  {
    id: 'rayman-30th-reverse-engineering',
    title: 'Rayman 30th: The Internet Got It Wrong',
    description: 'I explain why this release is much more than simple emulation by breaking down the technical choices behind it.',
    thumbnail: 'https://img.youtube.com/vi/jU6bSHefllQ/hqdefault.jpg',
    link: 'https://www.youtube.com/watch?v=jU6bSHefllQ'
  },
  {
    id: 'jsr-prototype-analysis',
    title: 'Jet Set Radio Prototype & the US Grind Radio – Game Preservation ',
    description: 'A guided analysis of the JSR prototype, including what it reveals about development decisions and cut content.',
    thumbnail: 'https://img.youtube.com/vi/ngTHrhJjtLs/hqdefault.jpg',
    link: 'https://www.youtube.com/watch?v=ngTHrhJjtLs&t=13s'
  },
  {
    id: 'ubisoft-mentorship-talk',
    title: 'Ubisoft Mentored Me. I Made This UNLIKELY Game',
    description: 'I talk about my Ubisoft mentorship journey, the challenges, and the professional growth that came with it.',
    thumbnail: 'https://img.youtube.com/vi/-2z1FbOyCks/hqdefault.jpg',
    link: 'https://www.youtube.com/watch?v=-2z1FbOyCks&t=10s'
  }
];

const StreamSection = () => (
  <div className="w-full pb-20 pt-10 md:pt-0">
    <div className="mb-6">
      <span className="font-mono text-xs text-white/40 mb-2 block">04_TV_LOGS</span>
      <h3 className="font-display font-bold text-3xl md:text-4xl">Featured on YouTube</h3>
    </div>

    <div className="grid grid-cols-1 gap-6">
      {FEATURED_YOUTUBE_VIDEOS.map((video) => (
        <a
          key={video.id}
          href={video.link}
          target="_blank"
          rel="noreferrer"
          className="group block border border-white/10 bg-white/5 p-3 sm:p-4 rounded-lg hover:border-white/30 transition-colors"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-full sm:w-48 md:w-56 aspect-video overflow-hidden rounded-md border border-white/10 bg-black/40">
              <img
                src={video.thumbnail}
                alt={`${video.title} thumbnail`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-display text-xl text-white group-hover:text-white/90 transition-colors mb-2">{video.title}</h4>
              <p className="font-mono text-xs text-gray-400 leading-relaxed max-w-2xl">{video.description}</p>
            </div>
            <ArrowRight size={14} className="mt-1 text-white/60 group-hover:text-white transition-colors sm:mt-2" />
          </div>
        </a>
      ))}
    </div>

    <div className="mt-10 border border-white/10 bg-white/5 rounded-lg p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 aspect-square shrink-0 rounded-md bg-white/10 flex items-center justify-center">
            <Twitch size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-lg sm:text-2xl leading-tight whitespace-nowrap">Twitch.tv/teloru</h2>
            <p className="font-mono text-xs text-gray-400 mt-1">Occasional live streams and retro/game-tech talks. Come take a look!</p>
          </div>
        </div>
        <span className="font-mono text-[10px] bg-red-600 text-white px-2 py-1 rounded animate-pulse shrink-0">OFFLINE</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {['#sega', '#atlus', '#horror-game', '#retro', '#y2k'].map(tag => (
          <span key={tag} className="text-[10px] font-mono border border-white/20 px-2 py-1 rounded-full text-white/60">
            {tag}
          </span>
        ))}
      </div>

      <a href="https://twitch.tv/teloru" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 font-mono text-xs text-white border-b border-white pb-1 w-max hover:text-gray-300 hover:border-gray-300 transition-colors">
        twitch.tv/teloru <ArrowRight size={12} />
      </a>
    </div>
  </div>
);

const ContactSection = () => {
  const [parisTime, setParisTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const parisTimeString = now.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setParisTime(parisTimeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-[50vh] pb-12 pt-10 md:pt-0">
    <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-12 tracking-tighter leading-[0.9]">
      LET'S<br/>CREATE.
    </h2>      <div className="flex flex-col gap-12 max-w-xl">
      
      {/* Status Block */}
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase text-green-400">Status: Open for opportunities</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-white font-semibold tabular-nums">
            {parisTime}
          </span>
          <span className="font-mono text-[10px] text-gray-400 uppercase">Paris (CET/CEST)</span>
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
};

export default App;
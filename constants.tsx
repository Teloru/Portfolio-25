import React from 'react';
import { SectionType, Project, GachaItem } from './types';
import { Terminal, Gamepad2, Palette, Briefcase, Mail, Code, Sparkles, Ghost, Cpu } from 'lucide-react';

export const SECTIONS = [
  { id: SectionType.HOME, label: '01_HOME' },
  { id: SectionType.DEV, label: '02_ENGINE' },
  { id: SectionType.ART, label: '03_ART' },
  { id: SectionType.STREAM, label: '04_TV' },
  { id: SectionType.XP, label: '05_DATA' },
];

export const DEV_PROJECTS: Project[] = [
  {
    id: '2d-puzzle',
    title: '2D Puzzle',
    tags: ['Raylib', 'C++'],
    description: 'Student project built using Raylib. Play as a little hamster watering flowers. Don\'t get stuck!',
    year: '2023',
    image: 'https://picsum.photos/600/400?random=2',
    link: 'https://gitlab.com/Astrid-Beyer/videogame-cpp'
  },
  {
    id: 'develop-at-ubisoft',
    title: 'Develop at Ubisoft',
    tags: ['SFML', 'C++'],
    description: 'Tower Defense game developed in C++ using SFML. The player must complete rhythm sequences to build towers and defend against waves of bunnies. Play it on itch.io!',
    year: '2024 - 2025',
    image: 'https://picsum.photos/600/400?random=3',
    link: 'https://gitlab.com/Astrid-Beyer/develop-at-ubisoft'
  },
  {
    id: 'teloboup',
    title: 'Teloboup',
    tags: ['Discord.js', 'Node'],
    description: 'A Discord bot designed to enhance my community server with fun commands and moderation tools. Open to contributions!',
    year: '2023 - today',
    image: 'https://picsum.photos/600/400?random=4',
    link: 'https://gitlab.com/Astrid-Beyer/teloboup-discord-bot'
  },
    {
    id: 'void-engine',
    title: 'Void Engine',
    tags: ['C++', 'OpenGL', 'No Engine'],
    description: 'dream project, todo <3 I`d love to create my own engine.',
    year: '???',
    image: 'https://picsum.photos/600/400?random=1'
  },
];

export const ART_PROJECTS: Project[] = [
  {
    id: 'cyber-angel',
    title: 'Cyber Angel',
    tags: ['Blender', '3D', 'Eevee'],
    description: 'Character model for a V-Tuber concept. Modeled, rigged, and textured in Blender.',
    year: '2024',
    image: 'https://picsum.photos/600/400?random=4'
  },
  {
    id: 'neo-tokyo-alley',
    title: 'Neo-Tokyo Alley',
    tags: ['Blender', 'Cycles'],
    description: 'Atmospheric environment study focusing on volumetric lighting and cyberpunk aesthetics.',
    year: '2023',
    image: 'https://picsum.photos/600/400?random=5'
  },
  {
    id: 'y2k-icons',
    title: 'Y2K Icons',
    tags: ['2D', 'Digital Art'],
    description: 'Vector asset pack designed for stream overlays and web interfaces.',
    year: '2023',
    image: 'https://picsum.photos/600/400?random=6'
  }
];

export const GACHA_ITEMS: GachaItem[] = [
  { id: 'g1', text: 'Sticker: Dreamcast Controller', rarity: 'RARE', icon: <Gamepad2 /> },
  { id: 'g2', text: 'Fact: Favorite C++ Standard is C++20', rarity: 'COMMON', icon: <Code /> },
  { id: 'g3', text: 'Fact: Can speedrun Jet Set Radio', rarity: 'LEGENDARY', icon: <Sparkles /> },
  { id: 'g4', text: 'Sticker: Wireframe Cube', rarity: 'COMMON', icon: <Cpu /> },
  { id: 'g5', text: 'Sticker: Glitch Ghost', rarity: 'RARE', icon: <Ghost /> },
];

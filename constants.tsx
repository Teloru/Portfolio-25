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
    id: 'p1',
    title: 'Void Engine',
    tags: ['C++', 'OpenGL', 'No Engine'],
    description: 'A custom ECS-based game engine written from scratch in modern C++. Handles physics, rendering, and audio subsystems.',
    year: '2023',
    image: 'https://picsum.photos/600/400?random=1'
  },
  {
    id: 'p2',
    title: 'Neon Racer',
    tags: ['Raylib', 'C++'],
    description: 'High-speed arcade racer inspired by F-Zero. Built using Raylib for raw performance and immediate mode GUI.',
    year: '2024',
    image: 'https://picsum.photos/600/400?random=2'
  },
  {
    id: 'p3',
    title: 'Shadow Protocol',
    tags: ['SFML', 'C++'],
    description: '2D stealth platformer with dynamic lighting and shadow casting algorithms implemented manually.',
    year: '2022',
    image: 'https://picsum.photos/600/400?random=3'
  }
];

export const ART_PROJECTS: Project[] = [
  {
    id: 'a1',
    title: 'Cyber Angel',
    tags: ['Blender', '3D', 'Eevee'],
    description: 'Character model for a V-Tuber concept. Modeled, rigged, and textured in Blender.',
    year: '2024',
    image: 'https://picsum.photos/600/400?random=4'
  },
  {
    id: 'a2',
    title: 'Neo-Tokyo Alley',
    tags: ['Blender', 'Cycles'],
    description: 'Atmospheric environment study focusing on volumetric lighting and cyberpunk aesthetics.',
    year: '2023',
    image: 'https://picsum.photos/600/400?random=5'
  },
  {
    id: 'a3',
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

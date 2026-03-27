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
    id: 'unlzvc-decompressor',
    title: 'UNLZVC Decompressor',
    tags: ['Reverse Engineering', 'C', 'Python', 'Dreamcast'],
    description: 'Reverse-engineered decompressor for Floigan Bros that extracts clean dialogue from Visual Concepts\' proprietary LZVC/IFF data; the tool was used in a Sega Dreamcast preservation article to compare prototype vs final game dialogues.',
    year: '2025',
    image: '/img/unlzvc-preview.jpg',
    link: 'https://github.com/Teloru/unlzvc-decompressor',
    extraLink: {
      label: 'Sega Dreamcast Preservation Article',
      url: 'https://www.sega-dreamcast-info-games-preservation.com/floigan-bros-dreamcast-making-of-visual-concepts-prototype'
    }
  },
  {
    id: '2d-puzzle',
    title: '2D Puzzle: Pipoufleur',
    tags: ['Raylib', 'C++', 'Game Dev'],
    description: 'Student project built using Raylib. Play as a little hamster watering flowers. Don\'t get stuck!',
    year: '2023',
    image: '/img/pipoufleur-preview.jpg',
    link: 'https://teloru.itch.io/pipoufleur'
  },
  {
    id: 'open-gl',
    title: 'Bike Crankset Animation',
    tags: ['Qt', 'OpenGL', 'C++', 'VBO', 'Shaders'],
    description: 'University graphics project: animated a bicycle crankset in Qt/C++ with OpenGL (VBO + shaders, no VAO), featuring dual-textured sprockets, alternating chain links, Phong-smoothed cylinders, and diffuse/ambient lighting with keyboard and non-modal UI controls.',
    year: '2023',
    image: '/img/opengl-preview.jpg',
    link: 'https://gitlab.com/Astrid-Beyer/opengl'
  },
  {
    id: 'develop-at-ubisoft',
    title: 'Develop at Ubisoft',
    tags: ['SFML', 'C++', 'Game Dev', 'Isometric view'],
    description: 'Tower Defense game developed in C++ using SFML. The player must complete rhythm sequences to build towers and defend against waves of bunnies. Play it on itch.io!',
    year: '2024 - 2025',
    image: '/img/develop-at-ubisoft-preview.jpg',
    link: 'https://gitlab.com/Astrid-Beyer/develop-at-ubisoft',
    extraLink: {
      label: 'YouTube video',
      url: 'https://www.youtube.com/watch?v=-2z1FbOyCks'
    }
  },
  {
    id: 'teloboup',
    title: 'Teloboup',
    tags: ['Discord.js', 'Node'],
    description: 'A Discord bot designed to enhance my community server with fun commands and moderation tools. Open to contributions!',
    year: '2023 - today',
    image: '/img/teloboup-preview.jpg',
    link: 'https://gitlab.com/Astrid-Beyer/teloboup-discord-bot'
  },
    {
    id: 'void-engine',
    title: 'Void Engine',
    tags: ['C++', 'OpenGL', 'No Engine'],
    description: 'dream project, todo <3 I\'d love to create my own engine.',
    year: '???',
    image: 'https://picsum.photos/600/400?random=1'
  },
];

export const ART_PROJECTS: Project[] = [
  {
    id: 'selfie-3d-me',
    title: 'Selfie with my lowpoly self',
    tags: ['Blender', '3D', 'Character'],
    description: 'Photo and 3D character crossover experiment.',
    year: '2024',
    image: '/img/art-lab/selfie_with_3d_me.jpg'
  },
  {
    id: 'nds-clip',
    title: 'NDS Clip',
    tags: ['3D', 'Animation', 'Video'],
    description: 'Experimental short clip from my art lab folder.',
    year: '2024',
    image: '/img/art-lab/nds.mp4'
  },
  {
    id: 'lowpoly-me',
    title: 'Lowpoly Me',
    tags: ['Blender', 'Low Poly', 'Turntable'],
    description: 'Short turntable capture of a lowpoly self-character.',
    year: '2024',
    image: '/img/art-lab/lowpoly_me.mp4'
  },
  {
    id: 'drawing-01',
    title: 'Drawing 01',
    tags: ['2D', 'Digital Art'],
    description: 'Personal digital illustration study.',
    year: '2023',
    image: '/img/art-lab/drawing_01.jpeg'
  }
];

export const GACHA_ITEMS: GachaItem[] = [
  { id: 'g1', text: 'Sticker: Dreamcast Controller', rarity: 'RARE', icon: <Gamepad2 /> },
  { id: 'g2', text: 'Fact: Favorite C++ Standard is C++20', rarity: 'COMMON', icon: <Code /> },
  { id: 'g3', text: 'Fact: Can speedrun Jet Set Radio', rarity: 'LEGENDARY', icon: <Sparkles /> },
  { id: 'g4', text: 'Sticker: Wireframe Cube', rarity: 'COMMON', icon: <Cpu /> },
  { id: 'g5', text: 'Sticker: Glitch Ghost', rarity: 'RARE', icon: <Ghost /> },
];

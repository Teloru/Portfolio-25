import { ReactNode } from "react";

export enum SectionType {
  HOME = 'HOME',
  DEV = 'DEV',
  ART = 'ART',
  STREAM = 'STREAM',
  XP = 'XP',
  CONTACT = 'CONTACT'
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  description: string;
  image?: string;
  link?: string;
  year: string;
}

export interface GachaItem {
  id: string;
  text: string;
  rarity: 'COMMON' | 'RARE' | 'LEGENDARY';
  icon: ReactNode;
}

export type PersonalityType = 'STREAMER' | 'DEVELOPER' | 'ARTIST';

export interface Personality {
  id: PersonalityType;
  name: string;
  description: string;
  modelPath: string;
  color: string;
  tags: string[];
}
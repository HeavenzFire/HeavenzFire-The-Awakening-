import React from 'react';

export interface NavLink {
  name: string;
  href: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface Pillar {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export interface Technology {
    name:string;
    description:string;
    examples:string;
}

export interface TechnologyCategory {
    category: string;
    description: string;
    technologies: Technology[];
}

export interface ImpactMetric {
    title: string;
    value: number;
    icon: React.ReactNode;
}

export interface AudioParams {
    baseFrequency: number;
    subliminalFrequency: number;
    duration: number;
}

export interface MemeticPacket {
    shareText: string;
    glyphDescription: string;
    ritualSteps: string[];
    blurb: string;
    audioParams: AudioParams;
}

import React from 'react';

export interface NavLink {
  name: string;
  href: string;
}

export interface Pillar {
  icon: React.ReactNode;
  title: string;
  description: string;
  engagement: string[];
  impact: string;
}

export interface Technology {
  name: string;
  description: string;
  examples: string;
}

export interface TechnologyCategory {
  category: string;
  description: string;
  technologies: Technology[];
}

export interface ImpactMetric {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export interface CallToActionItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

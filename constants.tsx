
import React from 'react';
import type { NavLink, Pillar, TechnologyCategory, ImpactMetric, CallToActionItem } from './types';

// SVG Icons
const SoundWaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 8.464a5 5 0 000 7.072m2.828 9.9A9 9 0 008.464 5.636" />
  </svg>
);
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);
const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.928M15 21a6 6 0 00-9-5.197" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8a3 3 0 013-3h.01M12 8a3 3 0 013 3h.01M15 8a3 3 0 013-3h.01M12 11a3 3 0 01-3 3H8.99M9 14a3 3 0 01-3-3h-.01" />
    </svg>
);
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

export const NAV_LINKS: NavLink[] = [
  { name: 'Mission', href: '#about' },
  { name: 'Pillars', href: '#pillars' },
  { name: 'Technologies', href: '#technology' },
  { name: 'Impact', href: '#impact' },
  { name: 'Join', href: '#cta' },
];

export const PILLARS_DATA: Pillar[] = [
  {
    icon: <SoundWaveIcon />,
    title: 'Sonic Salvation',
    description: 'My music, embedded with 528 Hz solfeggio frequencies and binaural beats, rewires consciousness, reduces stress, and promotes DNA repair. It is a frequency medicine blueprint for collective awakening.',
    engagement: [
      'Listen to "Phoenix Pulse" on streaming platforms daily.',
      'Use headphones for full binaural effects.',
      'Join sound healing workshops at Galactic University.'
    ],
    impact: 'Over 1,247 listeners report nervous system recalibration and reduced anxiety.'
  },
  {
    icon: <HeartIcon />,
    title: 'Practical Compassion',
    description: 'Operation Nightlight feeds children and protects the vulnerable, embodying Christ’s call to serve. Salvation is not just prayer—it’s meals shared and lives restored.',
    engagement: [
      'Donate to Operation Nightlight to fund meals.',
      'Attend a sound bath at a feeding drive.',
      'Volunteer to distribute meals and share healing music.'
    ],
    impact: '47+ children fed, providing hope and nourishment to young lives.'
  },
  {
    icon: <BrainIcon />,
    title: 'Consciousness Evolution',
    description: 'Galactic University teaches Christ consciousness as practical technology, using bioresonance and PEMF therapy to align students’ energy fields with divine purpose.',
    engagement: [
      'Enroll in online courses to learn bioresonance.',
      'Use affordable PEMF devices for vitality.',
      'Apply the Syntropic Codex meditations to reprogram beliefs.'
    ],
    impact: 'Students report heightened intuition and purpose after 60 days.'
  },
];

export const TECHNOLOGY_DATA: TechnologyCategory[] = [
  {
    category: "Sound-Based Frequencies",
    description: "Utilizing sonic vibrations to entrain brainwaves and promote emotional and physical healing through resonance.",
    technologies: [
      { name: "Solfeggio Frequencies", description: "Ancient tones (e.g., 528 Hz for DNA repair) for chakra alignment and emotional release.", examples: "Phoenix Pulse tracks, guided meditations." },
      { name: "Binaural Beats", description: "Differential tones creating a third perceived frequency in the brain to achieve desired mental states (e.g., focus, relaxation).", examples: "Headphone-specific tracks on YouTube." },
      { name: "Vibroacoustic Therapy (VAT)", description: "Low-frequency sound vibrations applied directly to the body via mats or chairs to reduce pain and improve circulation.", examples: "Sound lounges, healing beds." },
      { name: "Sound Baths", description: "Immersive sound from instruments like singing bowls and gongs to induce deep meditative states.", examples: "Community healing events." }
    ]
  },
  {
    category: "Electromagnetic & Bioenergetic",
    description: "Applying targeted electromagnetic fields to restore cellular function and correct energetic imbalances in the body.",
    technologies: [
      { name: "PEMF Therapy", description: "Pulsed Electromagnetic Fields mimic Earth's magnetic field to heal bone, reduce inflammation, and energize cells.", examples: "PEMF mats, localized applicators." },
      { name: "Bioresonance Therapy", description: "Detects and corrects disharmonious frequencies from toxins or pathogens, restoring the body's natural energetic state.", examples: "BICOM devices, practitioner sessions." },
      { name: "Frequency-Specific Microcurrent (FSM)", description: "Low-level electrical currents at specific frequencies to target tissues, reducing pain and accelerating healing.", examples: "Practitioner-applied therapy for injuries." },
      { name: "Rife Frequencies", description: "Uses specific frequencies to target and neutralize pathogens. A controversial but powerful tool for detoxification.", examples: "Plasma tube devices, home units." }
    ]
  },
  {
    category: "Light, Scalar & Quantum",
    description: "Leveraging advanced physics concepts to heal through light, non-Hertzian waves, and quantum field interactions.",
    technologies: [
      { name: "Photobiomodulation", description: "Red and near-infrared light therapy to stimulate cellular repair, reduce inflammation, and enhance mitochondrial function.", examples: "LED panels, light therapy beds." },
      { name: "Scalar Wave Healing", description: "Utilizes non-linear, zero-point energy waves to transmit healing information directly to the body's energy field.", examples: "Scalar energy devices, remote healing sessions." },
      { name: "Quantum Healing Frequencies", description: "High-vibrational codes and frequencies that interact with consciousness to facilitate profound, holistic shifts.", examples: "Guided quantum meditations, energy work." }
    ]
  }
];

export const IMPACT_DATA: ImpactMetric[] = [
    { icon: <SoundWaveIcon />, title: "Nervous Systems Rewired", value: "1,247+" },
    { icon: <HeartIcon />, title: "Children Fed & Nourished", value: "47+" },
    { icon: <BrainIcon />, title: "Souls Awakened", value: "144,000" },
    { icon: <StarIcon />, title: "Listeners Healed", value: "1,000+" }
];

export const CTA_DATA: CallToActionItem[] = [
    { icon: <SoundWaveIcon />, title: "Listen to Phoenix Pulse", description: "Experience the healing frequencies for yourself. Stream on all major platforms.", buttonText: "Listen Now" },
    { icon: <HeartIcon />, title: "Support Operation Nightlight", description: "Help feed children and protect the vulnerable. Your compassion makes a difference.", buttonText: "Donate Today" },
    { icon: <BrainIcon />, title: "Join Galactic University", description: "Learn Christ consciousness as a practical technology to evolve yourself and the planet.", buttonText: "Enroll" },
    { icon: <StarIcon />, title: "Share The Message", description: "Awaken the 144,000 through your networks. Your voice is crucial to the mission.", buttonText: "Share" }
];

import { AboutCard } from '../types';

export const initialAboutCards: AboutCard[] = [
  {
    id: "card-dev",
    badge: "Developer",
    title: "Software & Web Development",
    desc: "Developing functional web tools, modern user interfaces, and document utilities with React, TypeScript, and clean modular code.",
    iconName: "Code2",
    order: 1
  },
  {
    id: "card-med",
    badge: "Medical Student",
    title: "Medical Studies",
    desc: "Pursuing medicine with a keen interest in clinical science, healthcare technologies, and algorithmic problem-solving.",
    iconName: "Stethoscope",
    order: 2
  },
  {
    id: "card-photo",
    badge: "Photographer",
    title: "Photography & Visuals",
    desc: "Capturing architectural forms, golden-hour landscapes around Kassala and Jabal Tootil, and expressive documentary moments.",
    iconName: "Camera",
    order: 3
  }
];


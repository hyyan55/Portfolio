import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: "easy-convert",
    title: "Easy-Convert",
    description: "PDF conversion and document utility project.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "TypeScript", "Vite", "PDF Utility"],
    liveUrl: "",
    githubUrl: "https://github.com/Hyyan404/Easy-Convert",
    featured: true,
    published: true,
    order: 1
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Official personal portfolio and digital identity repository.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    liveUrl: "",
    githubUrl: "https://github.com/hyyan55/Portfolio",
    featured: true,
    published: true,
    order: 2
  }
];

